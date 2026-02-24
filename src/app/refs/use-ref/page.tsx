"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { LoudShutter } from "./_components/loud-shutter";
import { SilentLens } from "./_components/silent-lens";
import { StudioBriefing } from "./_components/studio-briefing";
import { PlaygroundSubjectFocus } from "./_components/playground-subject-focus";
import { PlaygroundShotCounter } from "./_components/playground-shot-counter";
import { PlaygroundExposureTimer } from "./_components/playground-exposure-timer";

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
          The silent lens that remembers every setting without firing the
          shutter.
        </TextEffect>
      </div>

      {/* Section 1: The Problem — Loud Shutter */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Loud Shutter</h2>
          <p className="text-muted-foreground">
            useState remembers values — but every change fires the shutter and
            disturbs the entire gallery. Sometimes that&apos;s way too loud.
          </p>
          <LoudShutter />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: The Solution — Silent Lens */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Silent Lens</h2>
          <p className="text-muted-foreground">
            useRef is the photographer&apos;s silent lens — it adjusts settings
            and remembers values without ever firing the shutter or disturbing
            the gallery.
          </p>
          <SilentLens />
        </section>
      </ScrollReveal>

      {/* Section 3: Studio Briefing */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Studio Briefing</h2>
          <StudioBriefing />
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
              useRef has two superpowers: pointing the lens at DOM elements
              directly, and storing mutable values silently between shots. Try
              these examples.
            </p>
          </div>

          <PlaygroundSubjectFocus />
          <PlaygroundShotCounter />
          <PlaygroundExposureTimer />
        </section>
      </ScrollReveal>
    </div>
  );
}
