"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ManualPost } from "./_components/manual-post";
import { MutationPost } from "./_components/mutation-post";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundCrud } from "./_components/playground-crud";
import { PlaygroundOptimistic } from "./_components/playground-optimistic";

export default function UseMutationPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useMutation</h1>
          <Badge variant="secondary">TanStack</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Reading data is one thing. What about creating, updating, and deleting?
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Manual Way</h2>
          <p className="text-muted-foreground">
            Manual POST with try-catch, loading flags, and no cache sync.
            Each mutation is a pile of boilerplate.
          </p>
          <ManualPost />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Solution */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Fix: useMutation</h2>
          <p className="text-muted-foreground">
            One hook that tracks the full mutation lifecycle — idle, pending,
            success, error — with callbacks at every step.
          </p>
          <MutationPost />
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
              useMutation pairs with useQuery for full data management — CRUD
              operations, cache updates, and optimistic UI.
            </p>
          </div>

          <PlaygroundCrud />
          <PlaygroundOptimistic />
        </section>
      </ScrollReveal>
    </div>
  );
}
