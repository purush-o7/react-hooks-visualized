"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ImpatientContractor } from "./_components/impatient-contractor";
import { MasterArchitect } from "./_components/master-architect";
import { BlueprintLegend } from "./_components/blueprint-legend";
import { PlaygroundFloorplan } from "./_components/playground-floorplan";
import { PlaygroundWallSign } from "./_components/playground-wall-sign";

export default function UseLayoutEffectPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useLayoutEffect</h1>
          <Badge variant="secondary">Side Effects</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if an architect could measure the room before anyone walks in?
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Impatient Contractor</h2>
          <p className="text-muted-foreground">
            With useEffect, the furniture renders at a default position first, then
            jumps to the correct spot after measurement — the client watches it
            teleport across the room.
          </p>
          <ImpatientContractor />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Master Architect</h2>
          <p className="text-muted-foreground">
            useLayoutEffect measures the room synchronously before the browser
            paints — so the furniture appears in the right place immediately. The
            client never sees it move.
          </p>
          <MasterArchitect />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">The Blueprint Legend</h2>
          <BlueprintLegend />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Architect Tools</h2>
            <p className="text-muted-foreground">
              useLayoutEffect is essential when you need DOM measurements before
              paint. Try these interactive blueprints.
            </p>
          </div>
          <PlaygroundFloorplan />
          <PlaygroundWallSign />
        </section>
      </ScrollReveal>
    </div>
  );
}
