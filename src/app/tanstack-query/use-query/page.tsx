"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ManualFetch } from "./_components/manual-fetch";
import { QueryFetch } from "./_components/query-fetch";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundPosts } from "./_components/playground-posts";
import { PlaygroundUserSelector } from "./_components/playground-user-selector";
import { PlaygroundPolling } from "./_components/playground-polling";
import { PlaygroundPagination } from "./_components/playground-pagination";

export default function UseQueryPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useQuery</h1>
          <Badge variant="secondary">TanStack</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Fetching data manually is painful. There has to be a better way.
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Manual Way</h2>
          <p className="text-muted-foreground">
            Three useState hooks, a useEffect, error handling, and no caching.
            Every time you navigate back, it re-fetches from scratch.
          </p>
          <ManualFetch />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Solution */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Fix: useQuery</h2>
          <p className="text-muted-foreground">
            One hook that handles loading, errors, caching, and background
            refetching. The same data, but smarter.
          </p>
          <QueryFetch />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Before vs After</h2>
          <BeforeAfter />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 3: Playground */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useQuery does more than basic fetching — query keys, caching, and
              automatic polling. Try these examples.
            </p>
          </div>

          <PlaygroundPosts />
          <PlaygroundUserSelector />
          <PlaygroundPolling />
          <PlaygroundPagination />
        </section>
      </ScrollReveal>
    </div>
  );
}
