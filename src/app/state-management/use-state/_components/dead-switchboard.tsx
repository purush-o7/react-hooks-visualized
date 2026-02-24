"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const deadCode = `function DeadSwitchboard() {
  let activeLines = 0;       // just a variable

  function plugInCable() {
    activeLines += 1;        // value changes...
    console.log(activeLines); // ...but React doesn't know!
  }
  // Display always shows 0 — no re-render triggered
}`;

export function DeadSwitchboard() {
  const hiddenCount = useRef(0);
  const [clicks, setClicks] = useState(0);
  const [peeking, setPeeking] = useState(false);

  function handlePlug() {
    hiddenCount.current += 1;
    setClicks((c) => c + 1);
  }

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            DEAD BOARD
          </Badge>
          <span className="text-sm text-muted-foreground">
            Using a regular variable
          </span>
        </div>

        {/* Switchboard Panel */}
        <div className="rounded-xl bg-zinc-900 p-6 space-y-5">
          {/* Line indicators */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="size-5 rounded-full bg-zinc-700 border border-zinc-600" />
                <span className="text-[10px] font-mono text-zinc-500">
                  L{i + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Display */}
          <div className="text-center space-y-1">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Active Lines
            </p>
            <div className="text-5xl font-mono font-bold text-zinc-500">0</div>
          </div>

          {/* Plug button */}
          <div className="flex justify-center">
            <ShimmerButton
              shimmerColor="#ef4444"
              background="rgba(220, 38, 38, 0.8)"
              onClick={handlePlug}
            >
              Plug In Cable
            </ShimmerButton>
          </div>
        </div>

        {/* Status line */}
        {clicks > 0 && (
          <p className="text-center text-sm text-red-400">
            You plugged in{" "}
            <AnimatedNumber
              value={clicks}
              className="inline-block font-mono font-bold text-red-300"
              springOptions={{ stiffness: 300, damping: 20 }}
            />{" "}
            {clicks === 1 ? "cable" : "cables"}... but the board shows 0!
          </p>
        )}

        {/* Peek behind the panel */}
        {clicks >= 3 && !peeking && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setPeeking(true)}>
              Peek Behind the Panel
            </Button>
          </div>
        )}

        {peeking && (
          <div className="rounded-lg bg-muted/50 p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Hidden variable value
            </p>
            <p className="text-3xl font-mono font-bold text-amber-500">
              {hiddenCount.current}
            </p>
            <p className="text-sm text-muted-foreground">
              The value <em>is</em> changing — React just doesn&apos;t know
              about it!
            </p>
          </div>
        )}

        {/* Explanation */}
        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is the board dead?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                A regular variable is like plugging a cable into a switchboard
                that isn&apos;t connected to anything. The cable goes in, but the
                board never lights up — React never re-renders.
              </p>
              <p>
                Every time React renders your component, it runs the function
                from top to bottom.{" "}
                <code className="text-foreground">let activeLines = 0</code>{" "}
                gets reset to 0 every single time. Your change is lost.
              </p>
              <CodeBlock code={deadCode} filename="dead-switchboard.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
