"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { ManualFetch } from "./_components/manual-fetch";
import { QueryFetch } from "./_components/query-fetch";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundPosts } from "./_components/playground-posts";
import { PlaygroundUserSelector } from "./_components/playground-user-selector";
import { PlaygroundPolling } from "./_components/playground-polling";
import { PlaygroundPagination } from "./_components/playground-pagination";

const USE_QUERY_MISTAKES: Mistake[] = [
  {
    title: "Syncing query data to local state",
    subtitle: "Copying data from useQuery into useState via useEffect",
    filename: "profile.tsx",
    wrongCode: `function UserProfile({ userId }) {
  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
  const [user, setUser] = useState(null);

  // Shadow copy — goes stale on background refetch!
  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  return <div>{user?.name}</div>;
}`,
    rightCode: `function UserProfile({ userId }) {
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    select: (data) => ({
      ...data,
      fullName: \`\${data.first} \${data.last}\`,
    }),
  });

  return <div>{user?.fullName}</div>;
}`,
    explanation:
      "You now have two sources of truth. The local state freezes while the query cache gets updated by background refetches. Use the data from useQuery directly. If you need a derived value, use the select option or useMemo — never copy to useState.",
  },
  {
    title: "Inconsistent or scattered query keys",
    subtitle: "Different components using different key shapes for the same resource",
    filename: "queries.ts",
    wrongCode: `// In ComponentA:
useQuery({ queryKey: ["user", id], queryFn: () => fetchUser(id) });

// In ComponentB (typo!):
useQuery({ queryKey: ["users", id], queryFn: () => fetchUser(id) });

// Invalidation misses ComponentA:
queryClient.invalidateQueries({ queryKey: ["users"] });`,
    rightCode: `// userQueries.ts — single source of truth
export const userQueries = {
  all: () => ({ queryKey: ["users"] }),
  detail: (id) => ({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
  }),
};

// In any component:
useQuery(userQueries.detail(userId));

// Invalidate everything user-related:
queryClient.invalidateQueries(userQueries.all());`,
    explanation:
      "TanStack Query uses query keys as cache identifiers. Inconsistent keys create duplicate cache entries, cause misses on prefetched data, and make invalidation unreliable. Centralize your keys in a query key factory so every component references the same structure.",
  },
  {
    title: "Not handling loading and error states",
    subtitle: "Accessing data without guarding for pending or error states",
    filename: "todos.tsx",
    wrongCode: `function Todos() {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Crashes on first render: data is undefined
  return <ul>{data.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}`,
    rightCode: `function Todos() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isPending) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return <ul>{data.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}`,
    explanation:
      "useQuery returns a state machine. On the first render, data is undefined and isPending is true. Accessing data.map without guarding causes a runtime crash. Always check isPending first, then isError, then render with data.",
  },
];

export default function UseQueryPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useQuery</h1>
          <Badge variant="secondary">TanStack</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Fetching data manually is painful. There has to be a better way.
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Manual Way</h2>
          <p className="text-muted-foreground">
            Three useState hooks, a useEffect, error handling, and no caching.
            Every time you navigate back, it re-fetches from scratch.
          </p>
          <ManualFetch />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Solution */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Fix: useQuery</h2>
          <p className="text-muted-foreground">
            One hook that handles loading, errors, caching, and background
            refetching. The same data, but smarter.
          </p>
          <QueryFetch />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Before vs After</h2>
          <BeforeAfter />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 3: Playground */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useQuery does more than basic fetching — query keys, caching, and
              automatic polling. Try these examples.
            </p>
          </div>

          <PlaygroundPosts />
          <PlaygroundUserSelector />
          <PlaygroundPolling />
          <PlaygroundPagination />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_QUERY_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
