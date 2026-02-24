import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  Box,
  Zap,
  Link2,
  Pointer,
  Gauge,
  Puzzle,
  Database,
  Lock,
  Shapes,
  Clock,
  Repeat2,
  ArrowRight,
} from "lucide-react";
import { AnimatedHero } from "./_components/animated-hero";

const reactCategories = [
  {
    href: "/state-management",
    label: "State Management",
    icon: Box,
    description:
      "useState and useReducer — manage local and complex component state.",
    hookCount: 2,
  },
  {
    href: "/side-effects",
    label: "Side Effects",
    icon: Zap,
    description:
      "useEffect and useLayoutEffect — synchronize with external systems and measure the DOM before paint.",
    hookCount: 2,
  },
  {
    href: "/context",
    label: "Context",
    icon: Link2,
    description:
      "useContext — share state across the component tree without prop drilling.",
    hookCount: 1,
  },
  {
    href: "/refs",
    label: "Refs",
    icon: Pointer,
    description:
      "useRef, useId, and useImperativeHandle — access DOM elements, generate unique IDs, and control exposed refs.",
    hookCount: 3,
  },
  {
    href: "/performance",
    label: "Performance",
    icon: Gauge,
    description:
      "useMemo, useCallback, useTransition, and useDeferredValue — optimize rendering through memoization and concurrent features.",
    hookCount: 4,
  },
  {
    href: "/custom-hooks",
    label: "Custom Hooks",
    icon: Puzzle,
    description:
      "Extract and reuse stateful logic across components with custom hooks.",
    hookCount: 3,
  },
];

const tanstackCategory = {
  href: "/tanstack-query",
  label: "TanStack Query",
  icon: Database,
  description:
    "useQuery and useMutation — fetch, cache, and mutate server state.",
  hookCount: 2,
};

const fundamentals = [
  {
    href: "/rendering",
    label: "React Rendering",
    icon: Activity,
    description:
      "How rendering works, what triggers re-renders, and why every hook depends on the render cycle.",
    topicCount: 6,
    accent: "text-red-500 bg-red-500/10 border-red-500/20",
  },
  {
    href: "/closures",
    label: "Closures",
    icon: Lock,
    description:
      "How inner functions capture variables, stale closure traps, and why hooks create new closures each render.",
    topicCount: 4,
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    href: "/immutability",
    label: "Immutability",
    icon: Shapes,
    description:
      "Value vs reference, why mutation breaks React, spread operator patterns, and immutable array operations.",
    topicCount: 4,
    accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    href: "/async",
    label: "Async JavaScript",
    icon: Clock,
    description:
      "Event loop, callbacks to promises, async/await, and handling async operations inside React components.",
    topicCount: 4,
    accent: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    href: "/this-and-arrows",
    label: "this & Arrows",
    icon: Repeat2,
    description:
      "How this changes identity based on context, binding rules, and why arrow functions freeze it forever.",
    topicCount: 4,
    accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl">
      <AnimatedHero />

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold">Fundamentals</h2>
          <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-500 border-0">
            Start Here
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fundamentals.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer border-border/50 hover:border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-md p-1 ${category.accent}`}>
                      <category.icon className="size-4" />
                    </div>
                    <CardTitle className="text-base">
                      {category.label}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      {category.topicCount} topics
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{category.description}</CardDescription>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground/70 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="size-3" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold">React Hooks</h2>
          <Badge variant="outline">Core</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reactCategories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-border/50 hover:border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className="size-4 text-muted-foreground" />
                    <CardTitle className="text-base">
                      {category.label}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      {category.hookCount}{" "}
                      {category.hookCount === 1 ? "hook" : "hooks"}
                    </Badge>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold">TanStack Query</h2>
          <Badge variant="secondary">v5</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href={tanstackCategory.href}>
            <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-border/50 hover:border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <tanstackCategory.icon className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">
                    {tanstackCategory.label}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    {tanstackCategory.hookCount} hooks
                  </Badge>
                </div>
                <CardDescription>
                  {tanstackCategory.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
