"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { OverwhelmedER } from "./_components/overwhelmed-er";
import { TriageSystem } from "./_components/triage-system";
import { ERBriefing } from "./_components/er-briefing";
import { PlaygroundPatientLookup } from "./_components/playground-patient-lookup";
import { PlaygroundTriageGuide } from "./_components/playground-triage-guide";
import { PlaygroundWardRounds } from "./_components/playground-ward-rounds";

export default function UseTransitionPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useTransition</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect preset="fade-in-blur" per="word" className="text-muted-foreground">
          What if heavy renders never jammed your ER&apos;s emergency hotline?
        </TextEffect>
      </div>

      {/* Section 1: Overwhelmed ER — the broken before */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Overwhelmed ER</h2>
          <p className="text-muted-foreground">
            Without useTransition, every keystroke blocks the main thread. React
            must finish filtering all 10,000 patient records before it can update
            the input — the emergency hotline goes dead.
          </p>
          <OverwhelmedER />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: Triage System — the fixed after */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Triage System</h2>
          <p className="text-muted-foreground">
            useTransition acts as the triage nurse. Urgent updates — like the
            hotline input — are handled immediately. Heavy record filtering is
            marked non-urgent and routed to the waiting room, leaving the hotline
            free.
          </p>
          <TriageSystem />
        </section>
      </ScrollReveal>

      {/* Section 3: ER Briefing — before vs after summary */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">ER Briefing</h2>
          <ERBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useTransition shines wherever a state update triggers expensive
              rendering. Explore the ER — search records, run ward rounds, and
              decide when triage is worth calling in.
            </p>
          </div>
          <PlaygroundPatientLookup />
          <PlaygroundWardRounds />
          <PlaygroundTriageGuide />
        </section>
      </ScrollReveal>
    </div>
  );
}
