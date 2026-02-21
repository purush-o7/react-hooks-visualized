"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { SlowFilter } from "./_components/slow-filter";
import { SmoothFilter } from "./_components/smooth-filter";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundTabs } from "./_components/playground-tabs";
import { PlaygroundSearch } from "./_components/playground-search";

export default function UseTransitionPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useTransition</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if heavy renders didn&apos;t freeze your entire UI?
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Frozen Input</h2>
        <p className="text-muted-foreground">
          Without useTransition, filtering a large list blocks the main thread —
          your input freezes while React crunches through every item.
        </p>
        <SlowFilter />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The VIP Lane</h2>
        <p className="text-muted-foreground">
          useTransition lets you mark heavy state updates as non-urgent. The
          input stays responsive while the filtered list renders in the
          background.
        </p>
        <SmoothFilter />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Before vs After</h2>
        <BeforeAfter />
      </section>

      <Separator />

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            useTransition shines wherever a state update triggers expensive
            rendering. Try these interactive examples.
          </p>
        </div>
        <PlaygroundTabs />
        <PlaygroundSearch />
      </section>
    </div>
  );
}
