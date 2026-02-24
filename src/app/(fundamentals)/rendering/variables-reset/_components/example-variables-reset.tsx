"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const brokenCode = `function Counter() {
  let count = 0;  // resets to 0 every render!

  function handleClick() {
    count = count + 1;
    console.log(count); // logs 1, but...
  }

  return <span>{count}</span>; // always shows 0
}`;

export function ExampleVariablesReset() {
  const actualClicks = useRef(0);
  const [, forceRender] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // This resets every render — that's the point
  let displayCount = 0;

  function handleClick() {
    displayCount += 1; // lost on next render
    actualClicks.current += 1;
    forceRender((n) => n + 1); // trigger re-render
  }

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            WATCH
          </Badge>
          <span className="text-sm text-muted-foreground">
            Variables Reset Every Render
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg bg-muted/50 p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Display value
            </p>
            <p className="text-5xl font-mono font-bold">{displayCount}</p>
            <p className="text-xs text-muted-foreground">
              let count = 0 (resets!)
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Actual clicks
            </p>
            <p className="text-5xl font-mono font-bold text-green-500">
              {actualClicks.current}
            </p>
            <p className="text-xs text-muted-foreground">
              useRef (persists)
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <ShimmerButton
            shimmerColor="#ef4444"
            background="rgba(220, 38, 38, 0.8)"
            onClick={handleClick}
          >
            count = count + 1
          </ShimmerButton>
        </div>

        {actualClicks.current >= 3 && !showExplanation && (
          <button
            onClick={() => setShowExplanation(true)}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Why is the display always 0?
          </button>
        )}

        {showExplanation && (
          <div className="rounded-lg bg-red-500/10 p-4 text-sm space-y-2">
            <p className="font-medium text-red-500">
              React called your function again from the top.
            </p>
            <p className="text-muted-foreground">
              <code className="text-foreground">let count = 0</code> runs on
              every render. Your increment was lost the moment React re-ran the
              function.
            </p>
          </div>
        )}

        <Accordion>
          <AccordionItem value="code">
            <AccordionTrigger className="text-sm font-medium">
              See the broken pattern
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Every time React renders this component, it calls the function
                from the top. <code className="text-foreground">let count = 0</code>{" "}
                runs again, wiping out any changes you made.
              </p>
              <CodeBlock code={brokenCode} filename="broken-variable.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
