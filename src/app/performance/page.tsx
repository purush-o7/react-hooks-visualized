import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Repeat, Hourglass, Timer } from "lucide-react";

const hooks = [
  {
    href: "/performance/use-memo",
    label: "useMemo",
    icon: Brain,
    description: "Memoize expensive computations to avoid recalculation.",
  },
  {
    href: "/performance/use-callback",
    label: "useCallback",
    icon: Repeat,
    description: "Memoize functions to prevent unnecessary re-renders.",
  },
  {
    href: "/performance/use-transition",
    label: "useTransition",
    icon: Hourglass,
    description:
      "Keep the UI responsive while heavy state updates render in the background.",
  },
  {
    href: "/performance/use-deferred-value",
    label: "useDeferredValue",
    icon: Timer,
    description:
      "Defer expensive re-renders so the input stays snappy while the display catches up.",
  },
];

export default function PerformancePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-orange-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
          <Badge variant="outline">Optimization</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Hooks for optimizing rendering performance through memoization.
        </p>
        <div className="mt-4 rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3">
          <p className="text-sm text-orange-600 dark:text-orange-400">
            💡 These hooks help you skip unnecessary work. Learn when optimization matters and when it's premature.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {hooks.map((hook) => (
          <Link key={hook.href} href={hook.href}>
            <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <hook.icon className="size-4 text-muted-foreground" />
                  <CardTitle className="font-mono text-base">
                    {hook.label}
                  </CardTitle>
                </div>
                <CardDescription>{hook.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
