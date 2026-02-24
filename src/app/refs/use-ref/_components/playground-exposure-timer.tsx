"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const code = `const exposureRef = useRef<number | null>(null);
// Store the timer ID in a ref — not state!

function startExposure() {
  exposureRef.current = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);
}

function endExposure() {
  clearInterval(exposureRef.current);
  exposureRef.current = null;
}`;

export function PlaygroundExposureTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const exposureRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startExposure() {
    if (exposureRef.current) return;
    setRunning(true);
    exposureRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function endExposure() {
    if (exposureRef.current) {
      clearInterval(exposureRef.current);
      exposureRef.current = null;
    }
    setRunning(false);
  }

  function reset() {
    endExposure();
    setSeconds(0);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          Exposure Timer
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Persistent Value
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          The interval ID is stored in a ref — changing it doesn&apos;t
          re-render the component.
        </p>

        {/* Timer LCD Panel */}
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
          <div className="flex items-center justify-center gap-4">
            <div
              className="size-3 rounded-full shrink-0"
              style={{
                backgroundColor: running ? "#22c55e" : "rgba(255,255,255,0.1)",
                boxShadow: running ? "0 0 8px rgba(34,197,94,0.5)" : "none",
              }}
            />
            <div
              className="text-5xl font-mono font-bold tabular-nums"
              style={{ color: "#d97706" }}
            >
              {String(Math.floor(seconds / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {!running ? (
            <Button
              onClick={startExposure}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Exposure
            </Button>
          ) : (
            <Button
              onClick={endExposure}
              className="bg-red-600 hover:bg-red-700"
            >
              End Exposure
            </Button>
          )}
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>

        <div className="rounded-lg bg-muted/50 p-3 text-center text-sm">
          <span className="text-muted-foreground">
            exposureRef.current ={" "}
          </span>
          <span className="font-mono font-bold">
            {running ? "(active timer)" : "null"}
          </span>
        </div>

        <CodeBlock code={code} filename="exposure-timer.tsx" />
      </CardContent>
    </Card>
  );
}
