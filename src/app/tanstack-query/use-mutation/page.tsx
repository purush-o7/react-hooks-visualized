"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { ManualPost } from "./_components/manual-post";
import { MutationPost } from "./_components/mutation-post";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundCrud } from "./_components/playground-crud";
import { PlaygroundOptimistic } from "./_components/playground-optimistic";

const USE_MUTATION_MISTAKES: Mistake[] = [
  {
    title: "Not invalidating queries after mutation",
    subtitle: "Mutation succeeds but the UI still shows stale cached data",
    filename: "todo-form.tsx",
    wrongCode: `const mutation = useMutation({
  mutationFn: (newTodo) => axios.post("/todos", newTodo),
  // Nothing happens after success — cache is stale!
});

function handleSubmit(data) {
  mutation.mutate(data);
  // List still shows old data until manual refresh
}`,
    rightCode: `const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (newTodo) => axios.post("/todos", newTodo),
  onSettled: async () => {
    // Invalidate and refetch the todos list
    await queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});`,
    explanation:
      "Mutations change server state, but the query cache doesn't know about it unless you tell it. Without invalidation, users see old data until a background refetch happens. Always invalidate related queries in onSuccess or onSettled after a mutation.",
  },
  {
    title: "Incomplete optimistic updates",
    subtitle: "Updating the cache optimistically but forgetting rollback on error",
    filename: "todo-form.tsx",
    wrongCode: `const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Missing: cancelQueries, snapshot, context return
    queryClient.setQueryData(["todos"], (old) => {
      old.push(newTodo); // mutates in place!
      return old;        // same reference — React won't re-render
    });
  },
  // Missing: onError rollback
  // Missing: onSettled invalidation
});`,
    rightCode: `const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });
    const previous = queryClient.getQueryData(["todos"]);
    queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);
    return { previous }; // context for rollback
  },
  onError: (_err, _todo, context) => {
    queryClient.setQueryData(["todos"], context.previous); // rollback
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] }); // sync
  },
});`,
    explanation:
      "A proper optimistic update has 4 steps: cancel outgoing refetches, snapshot previous data, update immutably, and return the snapshot as context. On error, roll back to the snapshot. On settled, always invalidate to ensure server/client sync. Skipping any step creates race conditions or broken UI.",
  },
  {
    title: "Not returning the promise from mutationFn",
    subtitle: "Forgetting to return the API call so onSuccess fires too early",
    filename: "api.tsx",
    wrongCode: `const mutation = useMutation({
  mutationFn: (id) => {
    axios.delete(\`/todos/\${id}\`); // missing return!
  },
  onSuccess: () => {
    // Fires IMMEDIATELY — server hasn't deleted yet
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});`,
    rightCode: `const mutation = useMutation({
  mutationFn: (id) => {
    return axios.delete(\`/todos/\${id}\`); // promise returned
  },
  onSuccess: () => {
    // Fires after server confirms deletion
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});`,
    explanation:
      "If mutationFn doesn't return the promise, TanStack Query treats it as synchronously resolved. onSuccess fires immediately, invalidation triggers, and the refetch returns old data because the server hasn't processed the request yet. Always return (or use arrow shorthand) the API call.",
  },
];

export default function UseMutationPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useMutation</h1>
          <Badge variant="secondary">TanStack</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Reading data is one thing. What about creating, updating, and deleting?
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Manual Way</h2>
          <p className="text-muted-foreground">
            Manual POST with try-catch, loading flags, and no cache sync.
            Each mutation is a pile of boilerplate.
          </p>
          <ManualPost />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Solution */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Fix: useMutation</h2>
          <p className="text-muted-foreground">
            One hook that tracks the full mutation lifecycle — idle, pending,
            success, error — with callbacks at every step.
          </p>
          <MutationPost />
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
              useMutation pairs with useQuery for full data management — CRUD
              operations, cache updates, and optimistic UI.
            </p>
          </div>

          <PlaygroundCrud />
          <PlaygroundOptimistic />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_MUTATION_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
