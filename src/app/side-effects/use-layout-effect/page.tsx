"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { ImpatientContractor } from "./_components/impatient-contractor";
import { MasterArchitect } from "./_components/master-architect";
import { BlueprintLegend } from "./_components/blueprint-legend";
import { PlaygroundFloorplan } from "./_components/playground-floorplan";
import { PlaygroundWallSign } from "./_components/playground-wall-sign";

const USE_LAYOUT_EFFECT_MISTAKES: Mistake[] = [
  {
    title: "Using useLayoutEffect when useEffect suffices",
    subtitle: "Blocking the browser paint for non-DOM work like data fetching",
    filename: "tooltip.tsx",
    wrongCode: `function Dashboard() {
  const [data, setData] = useState(null);

  // Blocks paint for a network request — user sees a frozen screen
  useLayoutEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  return <div>{data?.title}</div>;
}`,
    rightCode: `function Dashboard() {
  const [data, setData] = useState(null);

  // useEffect runs after paint — screen stays responsive
  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  return <div>{data?.title}</div>;
}`,
    explanation:
      "useLayoutEffect runs synchronously after DOM mutations but before the browser paints. This blocks the screen from updating. If your effect doesn't need to measure or mutate the DOM before paint, use useEffect instead — it runs after paint and keeps the UI responsive.",
  },
  {
    title: "NOT using useLayoutEffect for DOM measurements",
    subtitle: "Using useEffect for layout reads causes visible flickering",
    filename: "tooltip.tsx",
    wrongCode: `function Tooltip({ targetRef }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // useEffect runs AFTER paint — tooltip briefly appears at (0,0)
  useEffect(() => {
    const rect = targetRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 8, left: rect.left });
  }, []);

  return <div style={{ position: "absolute", ...pos }}>Tip</div>;
}`,
    rightCode: `function Tooltip({ targetRef }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // useLayoutEffect runs BEFORE paint — no flicker
  useLayoutEffect(() => {
    const rect = targetRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 8, left: rect.left });
  }, []);

  return <div style={{ position: "absolute", ...pos }}>Tip</div>;
}`,
    explanation:
      "useEffect runs after the browser paints. If you measure an element and update state to reposition it, the user briefly sees it in the wrong position. useLayoutEffect fires before paint, so the measurement and repositioning happen invisibly.",
  },
  {
    title: "useLayoutEffect in SSR without guard",
    subtitle: "Using useLayoutEffect in server-rendered components causes warnings",
    filename: "measure.tsx",
    wrongCode: `import { useLayoutEffect, useState } from "react";

// Triggers a warning on the server: useLayoutEffect does nothing in SSR
function MeasuredBox({ children }) {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // There is no DOM on the server — this is skipped entirely
  }, []);

  return <div>{children} (height: {height})</div>;
}`,
    rightCode: `import { useEffect, useLayoutEffect, useState } from "react";

// Isomorphic hook — safe in SSR, uses useLayoutEffect on client
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function MeasuredBox({ children }) {
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    // Runs as useLayoutEffect on client, useEffect on server
  }, []);

  return <div>{children} (height: {height})</div>;
}`,
    explanation:
      "There is no DOM on the server, so useLayoutEffect cannot run during SSR. React emits a warning and skips the effect entirely. Use an isomorphic wrapper that falls back to useEffect on the server, or ensure the component only renders on the client.",
  },
];

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
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>📐</span> Theme: Blueprint Architect
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a building under construction. useLayoutEffect is
            the architect who measures the room and adjusts the blueprint before
            anyone walks in. Unlike the regular contractor (useEffect), the
            architect works synchronously between the build and the reveal
            &mdash; no flicker, no repositioning after the doors open.
          </p>
        </div>
      </ScrollReveal>

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

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_LAYOUT_EFFECT_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
