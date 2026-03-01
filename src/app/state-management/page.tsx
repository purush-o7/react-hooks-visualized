import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { Layers, Workflow } from "lucide-react";

const hooks = [
  {
    href: "/state-management/use-state",
    label: "useState",
    icon: Layers,
    description: "Manage local component state — counters, toggles, forms.",
  },
  {
    href: "/state-management/use-reducer",
    label: "useReducer",
    icon: Workflow,
    description: "Manage complex state logic with a reducer pattern.",
  },
];

export const metadata: Metadata = {
  title: "State Management Hooks",
  description: "useState and useReducer — manage local and complex component state",
};

export default function StateManagementPage() {
  return (
    <div className="max-w-4xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "State Management Hooks",
          description:
            "useState and useReducer — manage local and complex component state",
          url: "https://hooks-101.vercel.app/state-management",
          hasPart: hooks.map((t) => ({
            "@type": "TechArticle",
            name: t.label,
            url: `https://hooks-101.vercel.app${t.href}`,
          })),
        }}
      />
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-green-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            State Management
          </h1>
          <Badge variant="outline">Core</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Hooks for managing local and complex component state.
        </p>
        <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
          <p className="text-sm text-green-600 dark:text-green-400">
            💡 State is what makes React components interactive. These hooks are the most commonly used in any React app.
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
