"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { BrokenCounter } from "./_components/broken-counter";
import { FixedCounter } from "./_components/fixed-counter";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundColorMixer } from "./_components/playground-color-mixer";
import { PlaygroundLightSwitch } from "./_components/playground-light-switch";
import { PlaygroundCharacterCreator } from "./_components/playground-character-creator";

export default function UseStatePage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useState</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          The most important hook. But first — why do we even need it?
        </TextEffect>
      </div>

      {/* ── Section 1: The Problem ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          First, Let&apos;s Break It
        </h2>
        <p className="text-muted-foreground">
          What happens when you try to use a regular variable for state in React?
          Click the button and find out.
        </p>
        <BrokenCounter />
      </section>

      <Separator />

      {/* ── Section 2: The Solution ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          The Fix: useState
        </h2>
        <p className="text-muted-foreground">
          Same counter, but this time React is in the loop. Watch the number
          actually change.
        </p>
        <FixedCounter />
      </section>

      {/* Before vs After comparison */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Before vs After</h2>
        <BeforeAfter />
      </section>

      <Separator />

      {/* ── Section 3: Playground ── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Playground
          </h2>
          <p className="text-muted-foreground">
            useState works with more than just numbers. Try these interactive
            examples to see objects, booleans, and complex state in action.
          </p>
        </div>

        <PlaygroundColorMixer />
        <PlaygroundLightSwitch />
        <PlaygroundCharacterCreator />
      </section>
    </div>
  );
}
