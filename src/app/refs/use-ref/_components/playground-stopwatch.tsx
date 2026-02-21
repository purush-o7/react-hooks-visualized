"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Play, Square } from "lucide-react";

const code = `const intervalRef = useRef<number | null>(null);
// Store the interval ID in a ref — not state!
// Changing the interval ID shouldn't re-render.

function start() {
  intervalRef.current = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);
}

function stop() {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
}`;

export function PlaygroundStopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    if (intervalRef.current) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  }

  function reset() {
    stop();
    setSeconds(0);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          Stopwatch
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Persistent Value
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          The interval ID is stored in a ref — changing it shouldn&apos;t
          re-render the component.
        </p>

        <div className="text-center">
          <div className="text-5xl font-mono font-bold tabular-nums">
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {!running ? (
            <Button onClick={start} className="bg-green-600 hover:bg-green-700">
              <Play className="size-4 mr-2" /> Start
            </Button>
          ) : (
            <Button onClick={stop} className="bg-red-600 hover:bg-red-700">
              <Square className="size-4 mr-2" /> Stop
            </Button>
          )}
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>

        <div className="rounded-lg bg-muted/50 p-3 text-center text-sm">
          <span className="text-muted-foreground">intervalRef.current = </span>
          <span className="font-mono font-bold">
            {running ? "(active interval)" : "null"}
          </span>
        </div>

        <CodeBlock code={code} filename="stopwatch-ref.tsx" />
      </CardContent>
    </Card>
  );
}
