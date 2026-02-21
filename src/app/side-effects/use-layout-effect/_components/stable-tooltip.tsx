"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const stableCode = `function StableTooltip() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // useLayoutEffect runs BEFORE paint — no flicker!
  useLayoutEffect(() => {
    if (show && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        top: rect.top - 40,
        left: rect.left + rect.width / 2,
      });
    }
  }, [show]);

  // Tooltip appears in the right place on the first frame.
  // ⚠️ useLayoutEffect blocks paint — use sparingly!
}`;

export function StableTooltip() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [toggleCount, setToggleCount] = useState(0);

  useLayoutEffect(() => {
    if (show && buttonRef.current && containerRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setPos({
        top: buttonRect.top - containerRect.top - 44,
        left: buttonRect.left - containerRect.left + buttonRect.width / 2,
      });
    }
  }, [show]);

  function handleToggle() {
    setShow((s) => !s);
    if (!show) {
      setPos({ top: 0, left: 0 });
      setToggleCount((c) => c + 1);
    }
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            STABLE
          </Badge>
          {toggleCount > 0 && (
            <Badge variant="outline" className="border-green-500 text-green-600 font-mono text-xs">
              Toggled {toggleCount}x — no flicker!
            </Badge>
          )}
        </div>

        <div ref={containerRef} className="relative min-h-[120px] flex items-center justify-center rounded-lg bg-muted/50 p-8">
          {show && (
            <div
              className="absolute px-3 py-1.5 rounded-md bg-foreground text-background text-sm font-medium shadow-lg whitespace-nowrap z-10"
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

        <p className="text-sm text-green-600 font-medium">
          Toggle rapidly — the tooltip appears in the right place every time!
        </p>

        <p className="text-xs text-muted-foreground bg-yellow-500/10 rounded-lg p-3">
          useLayoutEffect blocks the browser paint — use it only when you need
          DOM measurements before the user sees the frame. For everything else,
          prefer useEffect.
        </p>

        <CodeBlock code={stableCode} filename="stable-tooltip.tsx" />
      </div>
    </GlowCard>
  );
}
