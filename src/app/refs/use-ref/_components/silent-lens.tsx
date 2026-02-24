"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const silentCode = `function SilentLens() {
  const shotCountRef = useRef(0);

  function snap() {
    shotCountRef.current += 1;
    // No re-render! The gallery stays still.
    console.log("Silent shot:", shotCountRef.current);
  }
  // To see the value, you'd need a separate re-render trigger
}`;

export function SilentLens() {
  const shotCountRef = useRef(0);
  const [, forceRender] = useState(0);
  const [developed, setDeveloped] = useState(false);

  function handleSnap() {
    shotCountRef.current += 1;
  }

  function handleDevelop() {
    setDeveloped(true);
    forceRender((c) => c + 1);
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#8b5cf6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            SILENT LENS
          </Badge>
          <span className="text-sm text-muted-foreground">
            useRef adjusts without disturbing the gallery
          </span>
        </div>

        {/* Camera Viewfinder Panel */}
        <div className="rounded-xl border border-violet-500/20 bg-zinc-900 p-6">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Shots Taken
            </p>
            <div className="text-6xl font-mono font-bold text-muted-foreground/30 blur-sm select-none">
              ?
            </div>
            <p className="text-sm text-muted-foreground">
              Shots taken silently — gallery doesn&apos;t update!
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={handleSnap}
            className="bg-green-600 hover:bg-green-700"
          >
            Snap Silently
          </Button>
          <Button variant="outline" onClick={handleDevelop}>
            Develop Film
          </Button>
        </div>

        {developed && (
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              shotCountRef.current
            </p>
            <p className="text-3xl font-mono font-bold text-yellow-500">
              {shotCountRef.current}
            </p>
            <p className="text-sm text-muted-foreground">
              The shots were there all along — the gallery just wasn&apos;t
              told to update!
            </p>
          </div>
        )}

        <CodeBlock code={silentCode} filename="silent-lens.tsx" />
      </div>
    </GlowCard>
  );
}
