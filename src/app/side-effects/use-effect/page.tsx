"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { BrokenTimer } from "./_components/broken-timer";
import { FixedTimer } from "./_components/fixed-timer";
import { DependencyGuide } from "./_components/dependency-guide";
import { PlaygroundTitleSync } from "./_components/playground-title-sync";
import { PlaygroundStopwatch } from "./_components/playground-stopwatch";
import { PlaygroundWindowSize } from "./_components/playground-window-size";

export default function UseEffectPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useEffect</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          React renders UI. But what about everything else — timers, fetches, subscriptions?
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Problem</h2>
        <p className="text-muted-foreground">
          What happens when you put a side effect directly in the component
          body? Every render creates a new one without cleaning the old.
        </p>
        <BrokenTimer />
      </section>

      <Separator />

      {/* Section 2: The Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: useEffect</h2>
        <p className="text-muted-foreground">
          useEffect runs your code AFTER render, and the cleanup function
          runs before the next effect or when the component unmounts.
        </p>
        <FixedTimer />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">The Dependency Array</h2>
        <DependencyGuide />
      </section>

      <Separator />

      {/* Section 3: Playground */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            useEffect connects React to the outside world — the DOM, timers,
            event listeners, and more. Try these examples.
          </p>
        </div>

        <PlaygroundTitleSync />
        <PlaygroundStopwatch />
        <PlaygroundWindowSize />
      </section>
    </div>
  );
}
