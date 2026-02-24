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
  ToggleLeft,
  Zap,
  Network,
  Crosshair,
  Gauge,
  Wrench,
  Database,
  PackageOpen,
  Snowflake,
  Clock,
  AtSign,
  ArrowRight,
  BookOpen,
  Sparkles,
  Gamepad2,
} from "lucide-react";
import { AnimatedHero } from "./_components/animated-hero";

const highlights = [
  {
    icon: BookOpen,
    title: "Fundamentals First",
    description:
      "Rendering, closures, immutability, and async — the JavaScript foundations every hook builds on. Start here before diving into hooks.",
    accent: "text-amber-500 bg-amber-500/10",
  },
  {
    icon: Gamepad2,
    title: "Themed Lessons",
    description:
      "Each hook is wrapped in a unique story. useState is a switchboard, useReducer is a space launch, useContext is a spy network — learning through play.",
    accent: "text-purple-500 bg-purple-500/10",
  },
  {
    icon: Sparkles,
    title: "Interactive Playgrounds",
    description:
      "Every page has live demos you can tinker with. See how hooks behave in real-time, break things, and build intuition hands-on.",
    accent: "text-blue-500 bg-blue-500/10",
  },
];

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
    icon: PackageOpen,
    description:
      "How inner functions capture variables, stale closure traps, and why hooks create new closures each render.",
    topicCount: 4,
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    href: "/immutability",
    label: "Immutability",
    icon: Snowflake,
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
    icon: AtSign,
    description:
      "How this changes identity based on context, binding rules, and why arrow functions freeze it forever.",
    topicCount: 4,
    accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
];

const reactCategories = [
  {
    href: "/state-management",
    label: "State Management",
    icon: ToggleLeft,
    description:
      "useState and useReducer — manage local and complex component state.",
    hookCount: 2,
    theme: "Switchboard & Space Launch",
  },
  {
    href: "/side-effects",
    label: "Side Effects",
    icon: Zap,
    description:
      "useEffect and useLayoutEffect — synchronize with external systems and measure the DOM before paint.",
    hookCount: 2,
    theme: "DJ Booth & Blueprint",
  },
  {
    href: "/context",
    label: "Context",
    icon: Network,
    description:
      "useContext — share state across the component tree without prop drilling.",
    hookCount: 1,
    theme: "Spy Network",
  },
  {
    href: "/refs",
    label: "Refs",
    icon: Crosshair,
    description:
      "useRef, useId, and useImperativeHandle — access DOM elements, generate unique IDs, and control exposed refs.",
    hookCount: 3,
    theme: "Studio, Valet & Vault",
  },
  {
    href: "/performance",
    label: "Performance",
    icon: Gauge,
    description:
      "useMemo, useCallback, useTransition, and useDeferredValue — optimize rendering through memoization and concurrent features.",
    hookCount: 4,
    theme: "Phone, ER & Train Station",
  },
  {
    href: "/custom-hooks",
    label: "Custom Hooks",
    icon: Wrench,
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

export default function Home() {
  return (
    <div className="max-w-4xl">
      <AnimatedHero />

      {/* How it works */}
      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="space-y-2">
              <div
                className={`inline-flex rounded-lg p-2 ${item.accent}`}
              >
                <item.icon className="size-4" />
              </div>
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Fundamentals */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold">Fundamentals</h2>
          <Badge
            variant="default"
            className="bg-gradient-to-r from-amber-500 to-orange-500 border-0"
          >
            Start Here
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          These are the JavaScript concepts every React hook builds on. If
          closures, immutability, or the render cycle feel fuzzy, start here —
          the hooks will make much more sense after.
        </p>
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
                    <Badge
                      variant="secondary"
                      className="ml-auto text-[10px]"
                    >
                      {category.topicCount} topics
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {category.description}
                  </CardDescription>
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

      {/* React Hooks */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold">React Hooks</h2>
          <Badge variant="outline">Core</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Each hook has its own theme — a real-world metaphor that makes the
          concept click. No dry API docs, just stories you can play through.
        </p>
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
                    <Badge
                      variant="secondary"
                      className="ml-auto text-[10px]"
                    >
                      {category.hookCount}{" "}
                      {category.hookCount === 1 ? "hook" : "hooks"}
                    </Badge>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                  {"theme" in category && category.theme && (
                    <p className="text-[10px] text-muted-foreground/50 italic pt-1">
                      Themed: {category.theme}
                    </p>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* TanStack Query */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold">TanStack Query</h2>
          <Badge variant="secondary">v5</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Server state is a different beast. These hooks handle fetching,
          caching, and mutations so you don&apos;t have to.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href={tanstackCategory.href}>
            <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-border/50 hover:border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <tanstackCategory.icon className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">
                    {tanstackCategory.label}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="ml-auto text-[10px]"
                  >
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
