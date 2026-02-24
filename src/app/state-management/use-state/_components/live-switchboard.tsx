"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const liveCode = `function LiveSwitchboard() {
  const [activeLines, setActiveLines] = useState(0);

  function plugInCable() {
    setActiveLines(prev => prev + 1);
    // React sees the change → re-renders → board updates!
  }
}`;

export function LiveSwitchboard() {
  const [activeLines, setActiveLines] = useState(0);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#d97706" duration={4} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            LIVE BOARD
          </Badge>
          <span className="text-sm text-muted-foreground">
            Using useState
          </span>
        </div>

        {/* Switchboard Panel */}
        <div className="rounded-xl bg-zinc-900 p-6 space-y-5">
          {/* Line indicators */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => {
              const isActive = i < activeLines;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className="size-5 rounded-full border transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? "#22c55e" : undefined,
                      borderColor: isActive ? "#22c55e" : "#52525b",
                      boxShadow: isActive
                        ? "0 0 8px rgba(34, 197, 94, 0.6)"
                        : "none",
                    }}
                  />
                  <span
                    className="text-[10px] font-mono transition-colors duration-300"
                    style={{ color: isActive ? "#22c55e" : "#71717a" }}
                  >
                    L{i + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Display */}
          <div className="text-center space-y-1">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Active Lines
            </p>
            <AnimatedNumber
              value={activeLines}
              className="text-5xl font-mono font-bold text-green-400"
              springOptions={{ stiffness: 200, damping: 15 }}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setActiveLines((prev) => prev + 1)}
              className="bg-green-600 hover:bg-green-700"
            >
              Plug In Cable
            </Button>
            {activeLines > 0 && (
              <Button
                variant="outline"
                onClick={() => setActiveLines((prev) => Math.max(prev - 1, 0))}
              >
                Unplug
              </Button>
            )}
            {activeLines > 0 && (
              <Button variant="outline" onClick={() => setActiveLines(0)}>
                Clear Board
              </Button>
            )}
          </div>
        </div>

        {/* Status line */}
        {activeLines > 0 && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            Every plug updates the board — React re-renders!
          </p>
        )}

        {/* Code */}
        <CodeBlock code={liveCode} filename="live-switchboard.tsx" />
      </div>
    </GlowCard>
  );
}
