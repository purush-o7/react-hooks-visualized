import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, LayoutDashboard } from "lucide-react";

const hooks = [
  {
    href: "/side-effects/use-effect",
    label: "useEffect",
    icon: RefreshCw,
    description: "Run side effects — fetching data, subscriptions, timers.",
  },
  {
    href: "/side-effects/use-layout-effect",
    label: "useLayoutEffect",
    icon: LayoutDashboard,
    description:
      "Measure and mutate the DOM synchronously before the browser paints.",
  },
];

export const metadata: Metadata = {
  title: "Side Effect Hooks",
  description: "useEffect and useLayoutEffect — synchronize with external systems and the DOM",
};

export default function SideEffectsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-yellow-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Side Effects</h1>
          <Badge variant="outline">Core</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Hooks for synchronizing with external systems and running side effects.
        </p>
        <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            💡 Effects connect your React components to the outside world — APIs, timers, DOM manipulation, and more.
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
