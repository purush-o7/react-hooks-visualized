import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Pencil } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "TanStack Query Hooks",
  description: "useQuery and useMutation — fetch, cache, and mutate server state",
};

const hooks = [
  {
    href: "/tanstack-query/use-query",
    label: "useQuery",
    icon: Database,
    description: "Fetch, cache, and sync server state with TanStack Query.",
  },
  {
    href: "/tanstack-query/use-mutation",
    label: "useMutation",
    icon: Pencil,
    description: "Handle create/update/delete with TanStack Query.",
  },
];

export default function TanStackQueryPage() {
  return (
    <div className="max-w-4xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TanStack Query Hooks",
          description:
            "useQuery and useMutation — fetch, cache, and mutate server state",
          url: "https://hooks-101.vercel.app/tanstack-query",
          hasPart: hooks.map((h) => ({
            "@type": "TechArticle",
            name: h.label,
            url: `https://hooks-101.vercel.app${h.href}`,
          })),
        }}
      />
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-violet-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            TanStack Query
          </h1>
          <Badge variant="secondary">v5</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Powerful asynchronous state management for server data fetching,
          caching, and mutations.
        </p>
        <div className="mt-4 rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-3">
          <p className="text-sm text-violet-600 dark:text-violet-400">
            💡 TanStack Query handles caching, deduplication, and background refetching — the hard parts of data fetching.
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
