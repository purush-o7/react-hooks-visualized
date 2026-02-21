import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Ruler } from "lucide-react";

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
    icon: Ruler,
    description:
      "Measure and mutate the DOM synchronously before the browser paints.",
  },
];

export default function SideEffectsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Side Effects</h1>
          <Badge variant="outline">Core</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Hooks for synchronizing with external systems and running side effects.
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
