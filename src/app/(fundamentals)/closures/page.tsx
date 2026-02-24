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
import { Eye, Repeat, Ghost, Link2 } from "lucide-react";

const topics = [
  {
    href: "/closures/what-is-a-closure",
    label: "What is a Closure?",
    icon: Eye,
    description:
      "Inner functions remember their outer scope variables — like sealing a value inside a time capsule.",
  },
  {
    href: "/closures/closures-in-loops",
    label: "Closures in Loops",
    icon: Repeat,
    description:
      "The classic var vs let trap. Why all your callbacks share the same value — and how to fix it.",
  },
  {
    href: "/closures/stale-closures",
    label: "Stale Closures",
    icon: Ghost,
    description:
      "When a function captures an old value and never sees the update. The #1 React hooks gotcha.",
  },
  {
    href: "/closures/closures-and-hooks",
    label: "Closures & Hooks",
    icon: Link2,
    description:
      "Each render creates a new closure. This is why dependency arrays exist and why stale state happens.",
  },
];

export const metadata: Metadata = {
  title: "JavaScript Closures",
  description: "How inner functions capture variables, stale closure traps, and why hooks create new closures each render",
};

const CLOSURE_MISTAKES: Mistake[] = [
  {
    title: "Stale closures in useEffect / setInterval",
    subtitle: "The callback captures the initial state value and never sees updates",
    filename: "counter.tsx",
    wrongCode: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // always 0 — stale closure!
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps = captures initial count

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    rightCode: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1); // functional update — always current
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    explanation:
      "When useEffect runs with an empty dependency array, the callback captures the state values from the initial render. If state changes later, the closure still references the old value. Use the functional updater form of setState, or use a ref to always access the current value.",
  },
  {
    title: "Closures in loops with var",
    subtitle: "All callbacks in a var loop share the same variable — the final value",
    filename: "loop.js",
    wrongCode: `// Prints 3, 3, 3 instead of 0, 1, 2
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// var is function-scoped — one i shared across all iterations`,
    rightCode: `// Prints 0, 1, 2 — let creates a new binding per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    explanation:
      "Variables declared with var are function-scoped, not block-scoped. In a for loop, there is only one i variable shared across all iterations. By the time the callbacks execute, the loop has finished and i holds its final value. Use let instead — it creates a new binding per iteration.",
  },
  {
    title: "Stale closures in event handlers",
    subtitle: "Event handlers registered in useEffect capture state from when the effect ran",
    filename: "chat.tsx",
    wrongCode: `function Chat() {
  const [message, setMessage] = useState("hello");

  useEffect(() => {
    const handler = () => alert(message); // stale if message changes
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []); // missing message in deps!

  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}`,
    rightCode: `function Chat() {
  const [message, setMessage] = useState("hello");

  useEffect(() => {
    const handler = () => alert(message);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [message]); // re-registers handler when message changes

  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}`,
    explanation:
      "When an event handler is registered in useEffect and references state, it captures the value from when the effect ran. If the effect doesn't re-run (due to missing dependencies), the handler sees stale data forever. Include the state variable in the dependency array so the effect re-registers the handler.",
  },
];

export default function ClosuresPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-amber-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Closures</h1>
          <Badge>Foundational</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Closures are how JavaScript functions remember variables from where
          they were created. Understanding closures is essential for every React
          hook.
        </p>
        <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <p className="text-sm text-amber-600 dark:text-amber-400">
            💡 Every React hook relies on closures. Master this concept and useState, useEffect, and useCallback will all make sense.
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
        <CommonMistakes mistakes={CLOSURE_MISTAKES} />
      </div>
    </div>
  );
}
