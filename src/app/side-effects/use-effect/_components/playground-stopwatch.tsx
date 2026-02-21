"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Play, Square, RotateCcw } from "lucide-react";

const code = `const [ms, setMs] = useState(0);
const [running, setRunning] = useState(false);

useEffect(() => {
  if (!running) return;

  const id = setInterval(() => {
    setMs(prev => prev + 10);
  }, 10);

  return () => clearInterval(id);  // cleanup!
}, [running]);`;

export function PlaygroundStopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const lapsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setMs((prev) => prev + 10);
    }, 10);

    return () => clearInterval(id);
  }, [running]);

  function formatTime(milliseconds: number) {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const centis = Math.floor((milliseconds % 1000) / 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;
  }

  function handleLap() {
    setLaps((prev) => [...prev, ms]);
    setTimeout(() => lapsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          Stopwatch
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Cleanup Pattern
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-mono font-bold tabular-nums">
            {formatTime(ms)}
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={() => setRunning((r) => !r)}
            className={running ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {running ? (
              <><Square className="size-4 mr-2" /> Stop</>
            ) : (
              <><Play className="size-4 mr-2" /> Start</>
            )}
          </Button>
          {running && (
            <Button variant="outline" onClick={handleLap}>
              Lap
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => {
              setRunning(false);
              setMs(0);
              setLaps([]);
            }}
          >
            <RotateCcw className="size-4 mr-2" /> Reset
          </Button>
        </div>

        {laps.length > 0 && (
          <div className="rounded-lg bg-muted/50 p-3 max-h-32 overflow-y-auto space-y-1">
            {laps.map((lap, i) => (
              <div key={i} className="flex justify-between text-sm font-mono">
                <span className="text-muted-foreground">Lap {i + 1}</span>
                <span>{formatTime(lap)}</span>
              </div>
            ))}
            <div ref={lapsEndRef} />
          </div>
        )}

        <CodeBlock code={code} filename="stopwatch.tsx" />
      </CardContent>
    </Card>
  );
}
