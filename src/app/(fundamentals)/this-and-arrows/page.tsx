import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Link2, Zap, Repeat2 } from "lucide-react";

const topics = [
  {
    href: "/this-and-arrows/what-is-this",
    label: "What is this?",
    icon: Eye,
    description:
      "this is a shape shifter — it becomes whatever called it. Global, function, or object context all change its identity.",
  },
  {
    href: "/this-and-arrows/binding-rules",
    label: "Binding Rules",
    icon: Link2,
    description:
      "Implicit, explicit (call/apply/bind), and new binding. Learn the priority order that decides what this becomes.",
  },
  {
    href: "/this-and-arrows/arrow-functions",
    label: "Arrow Functions",
    icon: Zap,
    description:
      "Arrow functions freeze the shape forever — they capture this from where they're defined, not where they're called.",
  },
  {
    href: "/this-and-arrows/this-in-react",
    label: "this in React",
    icon: Repeat2,
    description:
      "The class component binding pain, why hooks solved it, and how arrow functions made event handlers simple.",
  },
];

export const metadata: Metadata = {
  title: "this & Arrow Functions",
  description: "How this changes based on context, binding rules, and why arrow functions lock it in place",
};

export default function ThisAndArrowsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-purple-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            this & Arrow Functions
          </h1>
          <Badge>Foundational</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          <code className="text-foreground">this</code> is a shape shifter — it
          becomes whatever called it. Arrow functions freeze its form forever.
          Understanding this is key to reading React code confidently.
        </p>
        <div className="mt-4 rounded-lg border border-purple-500/20 bg-purple-500/5 px-4 py-3">
          <p className="text-sm text-purple-600 dark:text-purple-400">
            💡 Arrow functions and closures replaced the this binding nightmare. Understanding both is why modern React code just works.
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
