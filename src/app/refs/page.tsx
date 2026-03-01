import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crosshair, Fingerprint, SlidersHorizontal } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Ref Hooks",
  description: "useRef, useId, and useImperativeHandle — DOM access, unique IDs, and controlled refs",
};

const hooks = [
  {
    href: "/refs/use-ref",
    label: "useRef",
    icon: Crosshair,
    description: "Access DOM elements and persist values across renders.",
  },
  {
    href: "/refs/use-id",
    label: "useId",
    icon: Fingerprint,
    description:
      "Generate unique IDs for accessibility attributes that stay stable across SSR and hydration.",
  },
  {
    href: "/refs/use-imperative-handle",
    label: "useImperativeHandle",
    icon: SlidersHorizontal,
    description:
      "Customize the ref handle exposed to parent components with a curated API.",
  },
];

export default function RefsPage() {
  return (
    <div className="max-w-4xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Ref Hooks",
          description:
            "useRef, useId, and useImperativeHandle — DOM access, unique IDs, and controlled refs",
          url: "https://hooks-101.vercel.app/refs",
          hasPart: hooks.map((h) => ({
            "@type": "TechArticle",
            name: h.label,
            url: `https://hooks-101.vercel.app${h.href}`,
          })),
        }}
      />
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-pink-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Refs</h1>
          <Badge variant="outline">Core</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Hooks for accessing DOM elements and persisting mutable values across
          renders.
        </p>
        <div className="mt-4 rounded-lg border border-pink-500/20 bg-pink-500/5 px-4 py-3">
          <p className="text-sm text-pink-600 dark:text-pink-400">
            💡 Refs give you an escape hatch from React's declarative model when you need direct DOM access.
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
