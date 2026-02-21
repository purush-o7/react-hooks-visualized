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

const noisyCode = `function RenderTracker() {
  const [clickCount, setClickCount] = useState(0);
  // Every click → setState → re-render the ENTIRE component!

  return (
    <div>
      <p>Clicks: {clickCount}</p>
      <button onClick={() => setClickCount(c => c + 1)}>
        Click Me
      </button>
      {/* Everything above re-renders on every click */}
    </div>
  );
}`;

export function NoisyRememberer() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  const [flash, setFlash] = useState(false);

  renderCount.current += 1;

  function handleClick() {
    setCount((c) => c + 1);
    // Trigger flash
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  }

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            NOISY
          </Badge>
          <span className="text-sm text-muted-foreground">
            useState triggers a re-render every time
          </span>
        </div>

        <div
          className="text-center space-y-3 rounded-lg p-6 transition-colors duration-300"
          style={{
            backgroundColor: flash ? "rgba(239, 68, 68, 0.15)" : "transparent",
          }}
        >
          <div className="text-6xl font-mono font-bold">{count}</div>
          <p className="text-sm text-muted-foreground">
            Component rendered{" "}
            <span className="font-mono font-bold text-red-500">
              {renderCount.current}
            </span>{" "}
            times
          </p>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleClick}>
            Click to Remember (+1)
          </Button>
        </div>

        {count >= 3 && (
          <p className="text-center text-sm text-red-500">
            Every click re-renders the entire component! What if we just
            wanted to remember a value silently?
          </p>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is this noisy?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                useState does two things: remembers a value AND tells React to
                re-render. Sometimes you only need the first part.
              </p>
              <p>
                For things like tracking render counts, storing interval IDs,
                or holding DOM references — you want to remember without
                re-rendering.
              </p>
              <CodeBlock code={noisyCode} filename="noisy.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
