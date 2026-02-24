import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    </div>
  );
}
