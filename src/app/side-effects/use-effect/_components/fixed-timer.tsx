"use client";

import { useState, useEffect } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Play, Square, RotateCcw } from "lucide-react";

const fixedCode = `function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: runs when 'running' changes or component unmounts
    return () => clearInterval(id);
  }, [running]); // Only re-run when 'running' changes

  return <span>{seconds}s</span>;
}`;

export function FixedTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            WORKS!
          </Badge>
          <span className="text-sm text-muted-foreground">
            useEffect with cleanup
          </span>
        </div>

        {/* Timer display */}
        <div className="text-center space-y-2">
          <div className="text-6xl font-mono font-bold tabular-nums">
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </div>
          <p className="text-sm text-muted-foreground">
            {running
              ? "Timer running — only ONE interval active"
              : "Timer stopped — interval was cleaned up"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => setRunning((r) => !r)}
            className={running ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {running ? (
              <>
                <Square className="size-4 mr-2" /> Stop
              </>
            ) : (
              <>
                <Play className="size-4 mr-2" /> Start
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
          >
            <RotateCcw className="size-4 mr-2" /> Reset
          </Button>
        </div>

        {/* Lifecycle visual */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-xs">Mount</Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-green-500/10">Effect runs</Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-yellow-500/10">Deps change</Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-red-500/10">Cleanup</Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-green-500/10">Effect runs</Badge>
        </div>

        <CodeBlock code={fixedCode} filename="fixed-timer.tsx" />
      </div>
    </GlowCard>
  );
}
