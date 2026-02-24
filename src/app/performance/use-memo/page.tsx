"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { SlowBuilder } from "./_components/slow-builder";
import { FastBuilder } from "./_components/fast-builder";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundTower } from "./_components/playground-tower";
import { PlaygroundPattern } from "./_components/playground-pattern";
import { PlaygroundInventory } from "./_components/playground-inventory";

export default function UseMemoPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useMemo</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if React tore down your Lego creation on every single render?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🧱</span> Theme: Lego Builder
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a Lego workbench. Every render, the builder tears
            down the previous creation and rebuilds from scratch &mdash; even
            when the instructions haven&apos;t changed. useMemo is a display
            shelf: once you build a tower, you place it on the shelf and only
            rebuild when the instructions (dependencies) actually change.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Problem */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Forgetful Builder</h2>
          <p className="text-muted-foreground">
            Without useMemo, expensive work runs on every render — even when the
            result would be exactly the same.
          </p>
          <SlowBuilder />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Solution */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Smart Builder</h2>
          <p className="text-muted-foreground">
            useMemo caches the tower and only rebuilds when the instructions
            (height, color) change. Unrelated changes grab the cached version
            instantly.
          </p>
          <FastBuilder />
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
              useMemo works for any derived data — costs, patterns, statistics.
              Try these Lego-themed examples.
            </p>
          </div>

          <PlaygroundTower />
          <PlaygroundPattern />
          <PlaygroundInventory />
        </section>
      </ScrollReveal>
    </div>
  );
}
