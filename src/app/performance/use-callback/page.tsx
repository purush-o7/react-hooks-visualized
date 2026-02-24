"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { RedialFrenzy } from "./_components/redial-frenzy";
import { SpeedDial } from "./_components/speed-dial";
import { PhoneBriefing } from "./_components/phone-briefing";
import { PlaygroundCallLog } from "./_components/playground-call-log";
import { PlaygroundFunctionalUpdate } from "./_components/playground-functional-update";
import { PlaygroundSpeedDialGuide } from "./_components/playground-speed-dial-guide";

export default function UseCallbackPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useCallback</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Why does your phone keep engraving a new dial button every screen
          refresh?
        </TextEffect>
      </div>

      {/* Section 1: The Problem — Redial Frenzy */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Redial Frenzy</h2>
          <p className="text-muted-foreground">
            Without useCallback, a new function is stamped out on every render.
            Your memo&apos;d contact list sees a &quot;new&quot; dial button
            serial and re-renders — even though nothing actually changed.
          </p>
          <RedialFrenzy />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: The Fix — Speed Dial */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Speed Dial</h2>
          <p className="text-muted-foreground">
            useCallback engraves the function once and keeps the same button
            serial between renders. Now memo() can do its job — the contact list
            stays put.
          </p>
          <SpeedDial />
        </section>
      </ScrollReveal>

      {/* Section 3: Briefing — side-by-side comparison */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">The Briefing</h2>
          <PhoneBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              Three playgrounds to explore how speed dial works, when to reach
              for it, and how to keep callbacks stable even when state changes.
            </p>
          </div>

          <PlaygroundCallLog />
          <PlaygroundFunctionalUpdate />
          <PlaygroundSpeedDialGuide />
        </section>
      </ScrollReveal>
    </div>
  );
}
