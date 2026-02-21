"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const silentCode = `function SilentCounter() {
  const countRef = useRef(0);

  function handleClick() {
    countRef.current += 1;
    // No re-render! React doesn't know or care.
    console.log("Hidden value:", countRef.current);
  }

  // To see the value, you'd need to trigger
  // a re-render some other way (like a separate useState).
}`;

export function SilentRememberer() {
  const countRef = useRef(0);
  const [, forceRender] = useState(0);
  const [peeking, setPeeking] = useState(false);

  function handleClick() {
    countRef.current += 1;
    // No state update → no re-render
  }

  function handlePeek() {
    setPeeking(true);
    forceRender((c) => c + 1); // force re-render to show latest ref value
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            SILENT
          </Badge>
          <span className="text-sm text-muted-foreground">
            useRef remembers without re-rendering
          </span>
        </div>

        <div className="text-center space-y-3">
          <div className="text-6xl font-mono font-bold text-muted-foreground/30">
            ?
          </div>
          <p className="text-sm text-muted-foreground">
            Value is changing silently — display doesn&apos;t update!
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={handleClick}
            className="bg-green-600 hover:bg-green-700"
          >
            Click to Remember (+1)
          </Button>
          <Button variant="outline" onClick={handlePeek}>
            Peek at Value
          </Button>
        </div>

        {peeking && (
          <div className="rounded-lg bg-green-500/10 p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              countRef.current
            </p>
            <p className="text-3xl font-mono font-bold text-green-500">
              {countRef.current}
            </p>
            <p className="text-sm text-muted-foreground">
              The value was there all along — React just wasn&apos;t told
              to re-render!
            </p>
          </div>
        )}

        <CodeBlock code={silentCode} filename="silent-counter.tsx" />
      </div>
    </GlowCard>
  );
}
