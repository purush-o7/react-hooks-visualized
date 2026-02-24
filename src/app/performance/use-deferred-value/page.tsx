"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { OverloadedBoard } from "./_components/overloaded-board";
import { SmartBoard } from "./_components/smart-board";
import { StationBriefing } from "./_components/station-briefing";
import { PlaygroundAnnouncements } from "./_components/playground-announcements";
import { PlaygroundConnectionFinder } from "./_components/playground-connection-finder";
import { PlaygroundScheduleGuide } from "./_components/playground-schedule-guide";

export default function UseDeferredValuePage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useDeferredValue</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect preset="fade-in-blur" per="word" className="text-muted-foreground">
          What if your departures board could show the last known schedule while
          computing the new one?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🚂</span> Theme: Train Station Departure Board
          </p>
          <p className="text-sm text-muted-foreground">
            Your UI is a train station departure board. When schedules change,
            updating every single row at once overloads the board and freezes
            the ticket counter. useDeferredValue is the smart board: the ticket
            counter (input) stays responsive while the departure board updates
            in the background with a slight delay.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: Overloaded Board — the broken before */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Overloaded Board</h2>
          <p className="text-muted-foreground">
            Without useDeferredValue, every keystroke forces React to filter all
            15,000 departures before it can update the input — the information
            desk freezes on every letter.
          </p>
          <OverloadedBoard />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: Smart Board — the fixed after */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Smart Board</h2>
          <p className="text-muted-foreground">
            useDeferredValue acts like a smart departures board. The information
            desk updates instantly on every keystroke while the board itself
            lags behind — showing the last known schedule until the fresh one
            is ready.
          </p>
          <SmartBoard />
        </section>
      </ScrollReveal>

      {/* Section 3: Station Briefing — before vs after summary */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Station Briefing</h2>
          <StationBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useDeferredValue shines wherever a prop or state value triggers
              expensive rendering. Explore the station — search the timetable,
              broadcast announcements, and decide when deferral is worth the
              ticket.
            </p>
          </div>
          <PlaygroundAnnouncements />
          <PlaygroundConnectionFinder />
          <PlaygroundScheduleGuide />
        </section>
      </ScrollReveal>
    </div>
  );
}
