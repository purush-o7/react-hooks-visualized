import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";

const hooks = [
  {
    href: "/context/use-context",
    label: "useContext",
    icon: Share2,
    description: "Share state across components without prop drilling.",
  },
];

export default function ContextPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-blue-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Context</h1>
          <Badge variant="outline">Core</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Hooks for sharing state across the component tree without prop
          drilling.
        </p>
        <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            💡 Context eliminates prop drilling. Essential for themes, auth, and any data that many components need.
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
