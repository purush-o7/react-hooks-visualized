"use client";

import { useReducer, useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Rocket, ChevronRight } from "lucide-react";

type MissionPhase = "IDLE" | "PRE_CHECK" | "COUNTDOWN" | "LAUNCH" | "ORBIT";

type LaunchAction = { type: "ADVANCE" } | { type: "ABORT" };

function launchReducer(state: MissionPhase, action: LaunchAction): MissionPhase {
  switch (action.type) {
    case "ADVANCE":
      if (state === "IDLE") return "PRE_CHECK";
      if (state === "PRE_CHECK") return "COUNTDOWN";
      if (state === "COUNTDOWN") return "LAUNCH";
      if (state === "LAUNCH") return "ORBIT";
      return state; // ORBIT is terminal
    case "ABORT":
      return "IDLE"; // Any phase can abort
    default:
      return state;
  }
}

const phaseConfig: Record<
  MissionPhase,
  { color: string; label: string }
> = {
  IDLE: { color: "#71717a", label: "Standing By" },
  PRE_CHECK: { color: "#eab308", label: "Systems Check" },
  COUNTDOWN: { color: "#f97316", label: "T-minus..." },
  LAUNCH: { color: "#ef4444", label: "Engines Firing" },
  ORBIT: { color: "#22c55e", label: "In Orbit" },
};

const phases: MissionPhase[] = [
  "IDLE",
  "PRE_CHECK",
  "COUNTDOWN",
  "LAUNCH",
  "ORBIT",
];

const launchCode = `type MissionPhase = "IDLE" | "PRE_CHECK" | "COUNTDOWN" | "LAUNCH" | "ORBIT";

function launchReducer(state: MissionPhase, action) {
  switch (action.type) {
    case "ADVANCE":
      if (state === "IDLE") return "PRE_CHECK";
      if (state === "PRE_CHECK") return "COUNTDOWN";
      if (state === "COUNTDOWN") return "LAUNCH";
      if (state === "LAUNCH") return "ORBIT";
      return state;  // ORBIT is terminal
    case "ABORT":
      return "IDLE";  // Any phase can abort
  }
}`;

export function PlaygroundLaunchSequence() {
  const [phase, dispatch] = useReducer(launchReducer, "IDLE" as MissionPhase);
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-countdown when entering COUNTDOWN phase
  useEffect(() => {
    if (phase === "COUNTDOWN") {
      setCountdown(3);
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            // Time to advance to LAUNCH
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            dispatch({ type: "ADVANCE" });
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [phase]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Rocket className="h-6 w-6" />
          Launch Sequence
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            State Machine
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Phase Indicators */}
        <div className="space-y-2 rounded-lg bg-zinc-900 p-4 border border-white/10">
          {phases.map((p) => {
            const isActive = phase === p;
            const config = phaseConfig[p];
            return (
              <div
                key={p}
                className="flex items-center gap-3 px-3 py-2 rounded transition-all"
                style={
                  isActive
                    ? {
                        backgroundColor: config.color + "15",
                        boxShadow: `0 0 12px 2px ${config.color}40`,
                      }
                    : {}
                }
              >
                <div
                  className="h-3 w-3 rounded-full shrink-0 transition-colors"
                  style={{
                    backgroundColor: isActive ? config.color : "#27272a",
                    boxShadow: isActive
                      ? `0 0 8px ${config.color}`
                      : "none",
                  }}
                />
                <span
                  className={`text-sm font-mono font-medium ${
                    isActive ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {p}
                </span>
                <span
                  className={`text-xs ml-auto ${
                    isActive ? "text-zinc-300" : "text-zinc-700"
                  }`}
                >
                  {config.label}
                  {p === "COUNTDOWN" && isActive && countdown !== null && (
                    <span className="ml-1 font-mono text-orange-400">
                      T-{countdown}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => dispatch({ type: "ADVANCE" })}
            disabled={phase === "ORBIT" || phase === "COUNTDOWN"}
          >
            Advance
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => dispatch({ type: "ABORT" })}
            disabled={phase === "IDLE"}
          >
            ABORT
          </Button>
        </div>

        {/* Phase Flow Diagram */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {phases.map((p, i) => (
            <span key={p} className="flex items-center gap-1">
              <Badge
                variant="outline"
                className="font-mono text-xs"
                style={
                  phase === p
                    ? {
                        backgroundColor: phaseConfig[p].color + "20",
                        color: phaseConfig[p].color,
                        borderColor: phaseConfig[p].color + "40",
                      }
                    : {}
                }
              >
                {p}
              </Badge>
              {i < phases.length - 1 && (
                <ChevronRight className="h-3 w-3 text-zinc-600" />
              )}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          The reducer enforces valid transitions only. No skipping from IDLE to
          ORBIT!
        </p>

        <CodeBlock code={launchCode} filename="launch-sequence-reducer.tsx" />
      </CardContent>
    </Card>
  );
}
