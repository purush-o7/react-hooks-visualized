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

const loudCode = `function LoudShutter() {
  const [shotCount, setShotCount] = useState(0);
  // Every click → setState → re-render the ENTIRE gallery!

  return <p>Shots: {shotCount}</p>;
  // Everything re-renders on every shot
}`;

export function LoudShutter() {
  const [shotCount, setShotCount] = useState(0);
  const renderCount = useRef(0);
  const [flash, setFlash] = useState(false);

  renderCount.current += 1;

  function handleShot() {
    setShotCount((c) => c + 1);
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
            LOUD SHUTTER
          </Badge>
          <span className="text-sm text-muted-foreground">
            useState re-renders the entire gallery
          </span>
        </div>

        {/* Camera Viewfinder Panel */}
        <div
          className="rounded-xl border border-white/10 bg-zinc-900 p-6 transition-colors duration-300"
          style={{
            backgroundColor: flash
              ? "rgba(239, 68, 68, 0.15)"
              : undefined,
          }}
        >
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Shot Count
            </p>
            <div className="text-6xl font-mono font-bold">{shotCount}</div>
            <p className="text-sm text-muted-foreground">
              Gallery disturbed{" "}
              <span className="font-mono font-bold text-red-500">
                {renderCount.current}
              </span>{" "}
              times
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleShot}>
            Take Shot
          </Button>
        </div>

        {shotCount >= 3 && (
          <p className="text-center text-sm text-red-500">
            Every shot echoes through the gallery! What if you just wanted to
            count quietly?
          </p>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is the shutter so loud?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                useState does two things: remembers a value AND tells React to
                re-render. Every time you take a shot, the entire gallery
                (component) refreshes — even if nobody is looking at the photo
                count.
              </p>
              <p>
                For things like tracking shot counts, storing timer IDs, or
                holding DOM references — you want to remember without echoing
                through the gallery.
              </p>
              <CodeBlock code={loudCode} filename="loud-shutter.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
