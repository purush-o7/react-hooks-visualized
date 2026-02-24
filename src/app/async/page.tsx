import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, GitBranch, Play, Zap } from "lucide-react";

const topics = [
  {
    href: "/async/event-loop",
    label: "Event Loop",
    icon: RotateCcw,
    description:
      "The call stack, Web APIs, callback queue, and the single-threaded event loop that orchestrates them all.",
  },
  {
    href: "/async/callbacks-to-promises",
    label: "Callbacks to Promises",
    icon: GitBranch,
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

export default function AsyncPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
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
