import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default function AsyncPage() {
  return (
    <div className="max-w-4xl">
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
    </div>
  );
}
