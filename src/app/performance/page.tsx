import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Repeat } from "lucide-react";

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
];

export default function PerformancePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
          <Badge variant="outline">Optimization</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Hooks for optimizing rendering performance through memoization.
        </p>
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
