"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExamplePromiseMethods() {
  const [allResult, setAllResult] = useState<string>("");
  const [raceResult, setRaceResult] = useState<string>("");
  const [running, setRunning] = useState<"all" | "race" | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setAllResult("");
    setRaceResult("");
    setRunning(null);
  };

  const runAll = () => {
    reset();
    setRunning("all");
    setAllResult("Fetching user, settings, notifications in parallel...");

    const delays = [
      { name: "user", time: 800 },
      { name: "settings", time: 400 },
      { name: "notifications", time: 1200 },
    ];

    const maxDelay = Math.max(...delays.map((d) => d.time));
    const t = setTimeout(() => {
      setAllResult(
        `All resolved in ${maxDelay}ms (slowest wins): [user, settings, notifications]`
      );
      setRunning(null);
    }, maxDelay);
    timeoutsRef.current.push(t);
  };

  const runRace = () => {
    reset();
    setRunning("race");
    setRaceResult("Racing: fetchData (800ms) vs timeout (500ms)...");

    const t = setTimeout(() => {
      setRaceResult("timeout won! (500ms) — fetch was too slow");
      setRunning(null);
    }, 500);
    timeoutsRef.current.push(t);
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(168, 85, 247, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700">
            INTERACTIVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            Promise.all vs Promise.race
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <Button
              onClick={runAll}
              disabled={running !== null}
              className="w-full"
            >
              Run Promise.all
            </Button>
            <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs min-h-[40px]">
              {allResult || (
                <span className="text-muted-foreground">
                  Runs all in parallel, waits for slowest
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <Button
              onClick={runRace}
              disabled={running !== null}
              variant="secondary"
              className="w-full"
            >
              Run Promise.race
            </Button>
            <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs min-h-[40px]">
              {raceResult || (
                <span className="text-muted-foreground">
                  Returns first to finish (win or lose)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
