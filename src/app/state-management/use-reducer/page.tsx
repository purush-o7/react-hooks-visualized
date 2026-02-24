"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ChaoticGroundControl } from "./_components/chaotic-ground-control";
import { FlightCommander } from "./_components/flight-commander";
import { MissionBriefing } from "./_components/mission-briefing";
import { PlaygroundMissionChecklist } from "./_components/playground-mission-checklist";
import { PlaygroundCargoBay } from "./_components/playground-cargo-bay";
import { PlaygroundLaunchSequence } from "./_components/playground-launch-sequence";

export default function UseReducerPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useReducer</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if ground control had a single Flight Commander processing every
          command through one unified protocol?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🚀</span> Theme: Space Launch Mission Control
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a mission control center. Multiple systems (fuel,
            oxygen, comms) need coordinated updates. Without useReducer, each
            operator uses their own radio &mdash; chaos. The Flight Commander
            (reducer) processes every command through one protocol: receive an
            action, return the new state. Predictable, testable, and one source
            of truth.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: Chaotic Ground Control */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Chaotic Ground Control</h2>
          <p className="text-muted-foreground">
            5 systems, 5 operators, 5 separate radios — and a reset that requires
            calling every single station.
          </p>
          <ChaoticGroundControl />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Flight Commander */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Flight Commander</h2>
          <p className="text-muted-foreground">
            Same ship, but all commands go through one Flight Computer. Dispatch a
            command, and the reducer computes the new ship state.
          </p>
          <FlightCommander />
        </section>
      </ScrollReveal>

      {/* Section 3: Mission Briefing */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Mission Briefing</h2>
          <MissionBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 4: Mission Operations */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mission Operations</h2>
            <p className="text-muted-foreground">
              useReducer shines with complex state — mission checklists, cargo
              manifests, and launch sequences. Run these operations.
            </p>
          </div>

          <PlaygroundMissionChecklist />
          <PlaygroundCargoBay />
          <PlaygroundLaunchSequence />
        </section>
      </ScrollReveal>
    </div>
  );
}
