"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const brokenCode = `function BrokenTimer() {
  const [count, setCount] = useState(0);

  // This runs on EVERY render!
  setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  // Each render creates a NEW interval
  // without clearing the old one = memory leak!

  return <span>{count}</span>;
}`;

export function BrokenTimer() {
  const [renderCount, setRenderCount] = useState(0);
  const intervalsCreated = useRef(0);
  const [started, setStarted] = useState(false);

  function simulateBrokenRender() {
    setStarted(true);
    // Simulate what happens: each "render" adds another interval
    intervalsCreated.current += 1;
    setRenderCount((c) => c + 1);
  }

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            BROKEN
          </Badge>
          <span className="text-sm text-muted-foreground">
            Side effect in the render body
          </span>
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Imagine putting <code>setInterval</code> directly in your component
            body...
          </p>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={simulateBrokenRender}
            >
              Simulate a Render
            </Button>
          </div>

          {started && (
            <div className="rounded-lg bg-red-500/10 p-4 space-y-2">
              <p className="text-sm">
                Renders: <span className="font-mono font-bold">{renderCount}</span>
              </p>
              <p className="text-sm">
                Intervals created:{" "}
                <span className="font-mono font-bold text-red-500">
                  {intervalsCreated.current}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {intervalsCreated.current > 1
                  ? `${intervalsCreated.current} intervals running at the same time! Each render creates a new one without cleaning the old.`
                  : "Click again — watch the intervals pile up!"}
              </p>
            </div>
          )}
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is this broken?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Code in the component body runs on <strong>every render</strong>.
                If you create a timer there, each render adds another timer
                without removing the old one.
              </p>
              <p>
                After 10 renders you have 10 timers all trying to update state
                simultaneously. That&apos;s a memory leak and a bug factory.
              </p>
              <p className="font-medium text-foreground">
                We need a way to say: &quot;Run this AFTER render, and clean up
                when done.&quot;
              </p>
              <CodeBlock code={brokenCode} filename="broken-timer.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
