import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Equal, Flame, Layers, Database } from "lucide-react";

const topics = [
  {
    href: "/immutability/value-vs-reference",
    label: "Value vs Reference",
    icon: Equal,
    description:
      "Primitives are copied by value (like mixing a new glaze). Objects are shared by reference (like pointing to the same pot).",
  },
  {
    href: "/immutability/why-mutation-breaks-react",
    label: "Why Mutation Breaks React",
    icon: Flame,
    description:
      "React uses Object.is() to detect changes. Mutating an object keeps the same reference — React sees no change.",
  },
  {
    href: "/immutability/spreading-101",
    label: "Spreading 101",
    icon: Layers,
    description:
      "The spread operator creates shallow copies. Learn the pattern — and the nested-object pitfall.",
  },
  {
    href: "/immutability/array-operations",
    label: "Array Operations",
    icon: Database,
    description:
      "Immutable add, remove, and update patterns that replace push, splice, and direct index assignment.",
  },
];

export default function ImmutabilityPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-teal-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Immutability</h1>
          <Badge>Foundational</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          React relies on immutable updates to detect changes. Like pottery
          that&apos;s been fired — you can&apos;t reshape it, you make a new
          one.
        </p>
        <div className="mt-4 rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-3">
          <p className="text-sm text-teal-600 dark:text-teal-400">
            💡 React uses Object.is() to detect changes. Without immutable updates, your state changes become invisible to React.
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
