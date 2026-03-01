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
import { JsonLd } from "@/components/json-ld";
import { Orbit, ArrowRightLeft, Play, Zap } from "lucide-react";

const topics = [
  {
    href: "/async/event-loop",
    label: "Event Loop",
    icon: Orbit,
    description:
      "The call stack, Web APIs, callback queue, and the single-threaded event loop that orchestrates them all.",
  },
  {
    href: "/async/callbacks-to-promises",
    label: "Callbacks to Promises",
    icon: ArrowRightLeft,
    description:
      "From callback hell to .then() chains. Plus Promise.all, Promise.race, and error handling.",
  },
  {
    href: "/async/async-await",
    label: "Async / Await",
    icon: Play,
    description:
      "Syntactic sugar over promises. Write async code that reads like synchronous code, with try/catch.",
  },
  {
    href: "/async/async-in-react",
    label: "Async in React",
    icon: Zap,
    description:
      "Why useEffect can't be async, AbortController for cleanup, and how to prevent race conditions.",
  },
];

export const metadata: Metadata = {
  title: "Async JavaScript",
  description: "Event loop, callbacks to promises, async/await, and handling async in React",
};

const ASYNC_MISTAKES: Mistake[] = [
  {
    title: "Using async directly on useEffect callback",
    subtitle: "Marking the useEffect callback as async breaks cleanup",
    filename: "data-loader.tsx",
    wrongCode: `// async callback returns a Promise, not a cleanup function
useEffect(async () => {
  const res = await fetch("/api/data");
  const data = await res.json();
  setData(data);
}, []);`,
    rightCode: `// Inner async function — effect itself stays synchronous
useEffect(() => {
  async function loadData() {
    const res = await fetch("/api/data");
    const data = await res.json();
    setData(data);
  }
  loadData();
}, []);`,
    explanation:
      "useEffect expects its callback to return either undefined or a cleanup function. An async function always returns a Promise, so React can never call your cleanup function. Define an inner async function and call it immediately instead.",
  },
  {
    title: "Race conditions from stale async responses",
    subtitle: "Fast typing fires multiple requests — the slowest one overwrites the latest",
    filename: "search.tsx",
    wrongCode: `// No protection against out-of-order responses
useEffect(() => {
  async function search() {
    const results = await fetchResults(query);
    setResults(results); // might be from an older query!
  }
  search();
}, [query]);`,
    rightCode: `// AbortController cancels stale requests
useEffect(() => {
  const controller = new AbortController();

  async function search() {
    try {
      const res = await fetch(\`/api/search?q=\${query}\`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      if (err.name !== "AbortError") setError(err);
    }
  }
  search();

  return () => controller.abort();
}, [query]);`,
    explanation:
      "When a user types rapidly, multiple requests fire. Responses can arrive out of order — if the oldest request finishes last, it overwrites the newest data. Use AbortController in the cleanup function to cancel stale requests when the query changes or the component unmounts.",
  },
  {
    title: "Not handling promise rejections",
    subtitle: "Forgetting try/catch around await calls or .catch() on promise chains",
    filename: "data-loader.tsx",
    wrongCode: `// If fetchData rejects, error is swallowed entirely
useEffect(() => {
  async function load() {
    const data = await fetchData(); // unhandled rejection!
    setData(data);
  }
  load();
}, []);`,
    rightCode: `useEffect(() => {
  async function load() {
    try {
      const data = await fetchData();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  load();
}, []);`,
    explanation:
      "Forgetting try/catch around await calls means errors silently disappear, or cause UnhandledPromiseRejectionWarning. In React, an unhandled rejection leaves the component in a broken state with no error UI. Always wrap await in try/catch and set error state for the UI.",
  },
];

export default function AsyncPage() {
  return (
    <div className="max-w-4xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Async JavaScript",
          description:
            "Event loop, callbacks to promises, async/await, and handling async in React",
          url: "https://hooks-101.vercel.app/async",
          hasPart: topics.map((t) => ({
            "@type": "TechArticle",
            name: t.label,
            url: `https://hooks-101.vercel.app${t.href}`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ASYNC_MISTAKES.map((m) => ({
            "@type": "Question",
            name: m.title,
            acceptedAnswer: { "@type": "Answer", text: m.explanation },
          })),
        }}
      />
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-indigo-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Async JavaScript
          </h1>
          <Badge>Foundational</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          JavaScript is single-threaded but non-blocking. Think of it like a
          restaurant — one waiter, but the kitchen works in parallel.
        </p>
        <div className="mt-4 rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-4 py-3">
          <p className="text-sm text-indigo-600 dark:text-indigo-400">
            💡 Understanding async patterns is essential for data fetching, useEffect cleanup, and preventing race conditions in React.
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
        <CommonMistakes mistakes={ASYNC_MISTAKES} />
      </div>
    </div>
  );
}
