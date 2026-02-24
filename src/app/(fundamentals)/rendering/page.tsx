import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";
import { Eye, RotateCcw, Play, GitBranch, Flame, Equal } from "lucide-react";

export const metadata: Metadata = {
  title: "React Rendering",
  description: "How rendering works, what triggers re-renders, and why every hook depends on the render cycle",
};

const topics = [
  {
    href: "/rendering/what-is-rendering",
    label: "What is Rendering?",
    icon: Eye,
    description:
      "The foundation — what rendering means, what causes it, and how React updates the screen. Start here.",
  },
  {
    href: "/rendering/variables-reset",
    label: "Variables Reset",
    icon: RotateCcw,
    description:
      "Why regular variables don't work for state — they reset to their initial value on every render.",
  },
  {
    href: "/rendering/code-reexecution",
    label: "Code Re-execution",
    icon: Play,
    description:
      "Every line in your component function runs on every render. There are no skip zones.",
  },
  {
    href: "/rendering/render-cascade",
    label: "Render Cascade",
    icon: GitBranch,
    description:
      "When a parent renders, all children render too — even if their props didn't change.",
  },
  {
    href: "/rendering/expensive-work",
    label: "Expensive Work",
    icon: Flame,
    description:
      "Expensive calculations re-run every render. This is why useMemo exists.",
  },
  {
    href: "/rendering/reference-trap",
    label: "Reference Trap",
    icon: Equal,
    description:
      "Inline objects and functions create new references every render, breaking memoization.",
  },
];

const RENDERING_MISTAKES: Mistake[] = [
  {
    title: "New object/array references on every render",
    subtitle: "Defining objects inline in the component body creates new references each render",
    filename: "parent.tsx",
    wrongCode: `function Parent() {
  // New object created every render — child always re-renders
  const style = { color: "red", fontSize: 16 };
  return <MemoizedChild style={style} />;
}`,
    rightCode: `function Parent() {
  // Stable reference — child skips re-render when nothing changed
  const style = useMemo(() => ({ color: "red", fontSize: 16 }), []);
  return <MemoizedChild style={style} />;
}`,
    explanation:
      "Objects and arrays are compared by reference, not by content. Even if the values are identical, {} !== {} in JavaScript. This means inline objects passed as props always look 'new' to React.memo children, defeating memoization. Use useMemo for objects and useCallback for functions that are passed as props.",
  },
  {
    title: "Assuming children only re-render when props change",
    subtitle: "Not realizing that parent state changes cascade to all children by default",
    filename: "app.tsx",
    wrongCode: `function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <p>Count: {count}</p>
      {/* ExpensiveList re-renders even though items didn't change */}
      <ExpensiveList items={items} />
    </div>
  );
}`,
    rightCode: `function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <p>Count: {count}</p>
      {/* React.memo skips re-render when items is unchanged */}
      <MemoizedExpensiveList items={items} />
    </div>
  );
}

const MemoizedExpensiveList = React.memo(ExpensiveList);`,
    explanation:
      "When a parent re-renders (due to its own state change), ALL children re-render by default — even if the props passed to them are identical. React doesn't check props automatically. Wrap expensive children in React.memo to skip re-renders when props haven't changed.",
  },
  {
    title: "Expensive computations in the render path",
    subtitle: "Running heavy calculations directly in the component body on every render",
    filename: "search.tsx",
    wrongCode: `function SearchResults({ items, query }) {
  // Filters 10,000 items on EVERY render, even if nothing changed
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return filtered.map(item => <div key={item.id}>{item.name}</div>);
}`,
    rightCode: `function SearchResults({ items, query }) {
  // Only re-filters when items or query actually change
  const filtered = useMemo(
    () => items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ),
    [items, query]
  );

  return filtered.map(item => <div key={item.id}>{item.name}</div>);
}`,
    explanation:
      "Every line in your component function runs on every render — there are no skip zones. Expensive operations like filtering, sorting, or computing large datasets will cause visible lag. Wrap them in useMemo with appropriate dependencies so they only re-run when inputs change.",
  },
];

export default function RenderingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-red-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            React Rendering
          </h1>
          <Badge>Foundational</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Every hook interacts with the render cycle. Understand rendering
          first, and hooks will make perfect sense.
        </p>
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
          <p className="text-sm text-red-600 dark:text-red-400">
            💡 Every React hook depends on the render cycle. Understanding rendering is the foundation everything else builds on.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link key={topic.href} href={topic.href}>
            <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <topic.icon className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">{topic.label}</CardTitle>
                </div>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <CommonMistakes mistakes={RENDERING_MISTAKES} />
      </div>
    </div>
  );
}
