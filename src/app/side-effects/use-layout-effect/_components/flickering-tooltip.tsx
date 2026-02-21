"use client";

import { useState, useEffect, useRef } from "react";
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

const flickerCode = `function FlickeringTooltip() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // useEffect runs AFTER paint — user sees the jump!
  useEffect(() => {
    if (show && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        top: rect.top - 40,
        left: rect.left + rect.width / 2,
      });
    }
  }, [show]);

  return (
    <>
      <button ref={buttonRef} onClick={() => setShow(!show)}>
        Hover me
      </button>
      {show && (
        <div style={{ top: pos.top, left: pos.left }}>
          Tooltip!
        </div>
      )}
    </>
  );
}`;

export function FlickeringTooltip() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [flickerCount, setFlickerCount] = useState(0);

  useEffect(() => {
    if (show && buttonRef.current && containerRef.current) {
      // Artificial delay to make the flicker more visible
      const timeout = setTimeout(() => {
        const buttonRect = buttonRef.current!.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        setPos({
          top: buttonRect.top - containerRect.top - 44,
          left: buttonRect.left - containerRect.left + buttonRect.width / 2,
        });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  function handleToggle() {
    setShow((s) => !s);
    if (!show) {
      setPos({ top: 0, left: 0 });
      setFlickerCount((c) => c + 1);
    }
  }

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            FLICKERS
          </Badge>
          {flickerCount > 0 && (
            <Badge variant="outline" className="font-mono text-xs">
              Toggled {flickerCount}x — watch the jump!
            </Badge>
          )}
        </div>

        <div ref={containerRef} className="relative min-h-[120px] flex items-center justify-center rounded-lg bg-muted/50 p-8">
          {show && (
            <div
              className="absolute px-3 py-1.5 rounded-md bg-foreground text-background text-sm font-medium shadow-lg transition-all duration-100 whitespace-nowrap z-10"
              style={{
                top: pos.top,
                left: pos.left,
                transform: "translateX(-50%)",
              }}
            >
              Tooltip content!
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-foreground"
              />
            </div>
          )}
          <Button ref={buttonRef} onClick={handleToggle} variant="outline">
            {show ? "Hide Tooltip" : "Show Tooltip"}
          </Button>
        </div>

        <p className="text-sm text-red-500 font-medium">
          Toggle rapidly — the tooltip starts at the top-left corner, then jumps
          into position!
        </p>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why does the tooltip flicker?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                useEffect runs after the browser paints. So the tooltip first
                renders at position (0, 0), the user sees it there briefly, then
                the effect measures the button and moves the tooltip — causing a
                visible jump.
              </p>
              <p className="font-medium text-foreground">
                We need measurement to happen before the browser paints, so the
                tooltip appears in the right place on the first frame.
              </p>
              <CodeBlock code={flickerCode} filename="flickering-tooltip.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
