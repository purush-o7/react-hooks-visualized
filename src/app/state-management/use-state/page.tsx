"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { DeadSwitchboard } from "./_components/dead-switchboard";
import { LiveSwitchboard } from "./_components/live-switchboard";
import { SwitchboardBriefing } from "./_components/switchboard-briefing";
import { PlaygroundLineToggle } from "./_components/playground-line-toggle";
import { PlaygroundFrequencyTuner } from "./_components/playground-frequency-tuner";
import { PlaygroundCallRouter } from "./_components/playground-call-router";
import { PlaygroundLazyInit } from "./_components/playground-lazy-init";

export default function UseStatePage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
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
          Think of useState as a telephone switchboard. Each line is a state
          variable — plug in a cable and the board lights up, React re-renders.
        </TextEffect>
      </div>

      {/* Section 1: Dead Switchboard — the broken "before" */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Dead Switchboard</h2>
          <p className="text-muted-foreground">
            Regular variables are like cables plugged into a switchboard that
            isn&apos;t powered. The value changes behind the scenes, but React
            never sees it — the display stays frozen.
          </p>
          <DeadSwitchboard />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: Live Switchboard — the "after" with useState */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Live Switchboard</h2>
          <p className="text-muted-foreground">
            useState wires the board to React. Every time you plug in a cable,
            React sees the connection change and re-renders the display
            immediately.
          </p>
          <LiveSwitchboard />
        </section>
      </ScrollReveal>

      {/* Section 3: Briefing — side-by-side comparison */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Operator Briefing</h2>
          <SwitchboardBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">The Switchboard Floor</h2>
            <p className="text-muted-foreground">
              State isn&apos;t always a single line — booleans, numbers, and
              objects are all fair game. Each playground below demonstrates a
              different type of connection on the board.
            </p>
          </div>

          <PlaygroundLineToggle />
          <PlaygroundFrequencyTuner />
          <PlaygroundCallRouter />
          <PlaygroundLazyInit />
        </section>
      </ScrollReveal>
    </div>
  );
}
