import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    </div>
  );
}
