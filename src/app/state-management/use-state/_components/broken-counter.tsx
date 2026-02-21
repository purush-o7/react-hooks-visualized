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

const brokenCode = `function BrokenCounter() {
  let count = 0;        // just a regular variable

  function handleClick() {
    count = count + 1;  // this DOES change...
    console.log(count); // ...but React doesn't know!
  }

  return <span>{count}</span>; // always shows 0
}`;

export function BrokenCounter() {
  // useRef to simulate a "regular variable" — mutating .current does NOT trigger re-render
  const hiddenCount = useRef(0);
  // This useState tracks clicks — intentionally shows the dissonance
  const [clicks, setClicks] = useState(0);
  const [peeking, setPeeking] = useState(false);

  function handleClick() {
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
            BROKEN
          </Badge>
          <span className="text-sm text-muted-foreground">
            Using a regular variable
          </span>
        </div>

        {/* The big number that never changes */}
        <div className="text-center space-y-2">
          <div className="text-7xl font-mono font-bold">0</div>
          <p className="text-sm text-muted-foreground">
            Display value — stuck forever
          </p>
        </div>

        {/* Click button */}
        <div className="flex justify-center">
          <ShimmerButton
            shimmerColor="#ef4444"
            background="rgba(220, 38, 38, 0.8)"
            onClick={handleClick}
          >
            Add +1
          </ShimmerButton>
        </div>

        {/* Click counter — this one DOES update, creating dissonance */}
        {clicks > 0 && (
          <p className="text-center text-sm text-muted-foreground">
            You clicked{" "}
            <AnimatedNumber
              value={clicks}
              className="inline-block font-mono font-bold text-foreground"
              springOptions={{ stiffness: 300, damping: 20 }}
            />{" "}
            {clicks === 1 ? "time" : "times"} but the display still shows 0...
          </p>
        )}

        {/* Peek behind the curtain */}
        {clicks >= 3 && !peeking && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setPeeking(true)}>
              Peek Behind the Curtain
            </Button>
          </div>
        )}

        {peeking && (
          <div className="rounded-lg bg-muted/50 p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Hidden variable value
            </p>
            <p className="text-3xl font-mono font-bold text-orange-500">
              {hiddenCount.current}
            </p>
            <p className="text-sm text-muted-foreground">
              The value <em>is</em> changing — React just doesn&apos;t know
              about it!
            </p>
          </div>
        )}

        {/* Explanation accordion */}
        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why doesn&apos;t it work?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                A regular variable is like writing on a sticky note that nobody
                reads. You can change it all day, but React never looks at it
                again after the first render.
              </p>
              <p>
                When React renders your component, it runs the function from top
                to bottom. A <code className="text-foreground">let count = 0</code>{" "}
                gets reset to 0 every single time. Your change is lost.
              </p>
              <CodeBlock code={brokenCode} filename="broken-counter.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
