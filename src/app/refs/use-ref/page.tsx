"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { NoisyRememberer } from "./_components/noisy-rememberer";
import { SilentRememberer } from "./_components/silent-rememberer";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundFocus } from "./_components/playground-focus";
import { PlaygroundStopwatch } from "./_components/playground-stopwatch";
import { PlaygroundRenderCounter } from "./_components/playground-render-counter";

export default function UseRefPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useRef</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if you need to remember something without re-rendering?
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Noisy Way</h2>
        <p className="text-muted-foreground">
          useState remembers values, but it also re-renders the entire
          component every time. Sometimes that&apos;s too much.
        </p>
        <NoisyRememberer />
      </section>

      <Separator />

      {/* Section 2: The Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: useRef</h2>
        <p className="text-muted-foreground">
          useRef gives you a mutable box that persists across renders — but
          changing it never triggers a re-render.
        </p>
        <SilentRememberer />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Before vs After</h2>
        <BeforeAfter />
      </section>

      <Separator />

      {/* Section 3: Playground */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            useRef has two superpowers: accessing DOM elements directly and
            storing mutable values silently. Try these examples.
          </p>
        </div>

        <PlaygroundFocus />
        <PlaygroundStopwatch />
        <PlaygroundRenderCounter />
      </section>
    </div>
  );
}
