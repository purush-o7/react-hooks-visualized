"use client";

import { useReducer, useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { CodeBlock } from "@/components/code-block";

const commsOptions = ["Alpha", "Bravo", "Charlie"] as const;

interface ShipState {
  fuel: number;
  altitude: number;
  shields: number;
  commsChannel: string;
  missionPhase: string;
}

type ShipAction =
  | { type: "SET_FUEL"; value: number }
  | { type: "SET_ALTITUDE"; value: number }
  | { type: "SET_SHIELDS"; value: number }
  | { type: "SET_COMMS"; channel: string }
  | { type: "TOGGLE_PHASE" }
  | { type: "RESET" };

const initialShipState: ShipState = {
  fuel: 100,
  altitude: 0,
  shields: 50,
  commsChannel: "Alpha",
  missionPhase: "Pre-Launch",
};

function shipReducer(state: ShipState, action: ShipAction): ShipState {
  switch (action.type) {
    case "SET_FUEL":
      return { ...state, fuel: action.value };
    case "SET_ALTITUDE":
      return { ...state, altitude: action.value };
    case "SET_SHIELDS":
      return { ...state, shields: action.value };
    case "SET_COMMS":
      return { ...state, commsChannel: action.channel };
    case "TOGGLE_PHASE":
      return {
        ...state,
        missionPhase:
          state.missionPhase === "Pre-Launch" ? "In-Flight" : "Pre-Launch",
      };
    case "RESET":
      return initialShipState;
    default:
      return state;
  }
}

function formatAction(action: ShipAction): string {
  switch (action.type) {
    case "SET_FUEL":
      return `> SET_FUEL { value: ${action.value} }`;
    case "SET_ALTITUDE":
      return `> SET_ALTITUDE { value: ${action.value} }`;
    case "SET_SHIELDS":
      return `> SET_SHIELDS { value: ${action.value} }`;
    case "SET_COMMS":
      return `> SET_COMMS { channel: "${action.channel}" }`;
    case "TOGGLE_PHASE":
      return `> TOGGLE_PHASE`;
    case "RESET":
      return `> RESET`;
  }
}

const commanderCode = `const initialShipState = {
  fuel: 100, altitude: 0, shields: 50,
  commsChannel: "Alpha", missionPhase: "Pre-Launch",
};

function shipReducer(state, action) {
  switch (action.type) {
    case "SET_FUEL":    return { ...state, fuel: action.value };
    case "SET_ALTITUDE": return { ...state, altitude: action.value };
    case "SET_SHIELDS": return { ...state, shields: action.value };
    case "SET_COMMS":   return { ...state, commsChannel: action.channel };
    case "TOGGLE_PHASE": return { ...state, missionPhase:
      state.missionPhase === "Pre-Launch" ? "In-Flight" : "Pre-Launch" };
    case "RESET": return initialShipState; // One command resets everything!
  }
}

const [state, dispatch] = useReducer(shipReducer, initialShipState);`;

export function FlightCommander() {
  const [state, dispatch] = useReducer(shipReducer, initialShipState);
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  function send(action: ShipAction) {
    dispatch(action);
    setCommandLog((prev) => [...prev.slice(-7), formatAction(action)]);
  }

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [commandLog]);

  return (
    <GlowCard
      glowColor="rgba(34, 197, 94, 0.35)"
      className="p-6 md:p-8 relative overflow-hidden"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#3b82f6" duration={4} />

      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🚀</span>
        <h3 className="text-lg font-bold">Ship Systems Panel</h3>
        <Badge className="ml-auto bg-green-600 hover:bg-green-700">
          COMMANDER
        </Badge>
      </div>

      <div className="space-y-5 rounded-lg bg-zinc-900 p-4 border border-white/10">
        {/* Fuel Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Fuel Level</label>
            <span className="ml-auto text-sm font-mono text-amber-400">
              {state.fuel}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={state.fuel}
            onChange={(e) =>
              send({ type: "SET_FUEL", value: Number(e.target.value) })
            }
            className="w-full accent-amber-500"
          />
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-500 transition-all"
              style={{ width: `${state.fuel}%` }}
            />
          </div>
        </div>

        {/* Altitude */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Altitude</label>
            <span className="ml-auto text-sm font-mono text-green-400">
              {state.altitude.toLocaleString()} km
            </span>
          </div>
          <input
            type="number"
            min={0}
            max={50000}
            step={100}
            value={state.altitude}
            onChange={(e) =>
              send({ type: "SET_ALTITUDE", value: Number(e.target.value) })
            }
            className="w-full rounded bg-zinc-800 border border-white/10 px-3 py-1.5 text-sm font-mono text-green-400 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Shield Power */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Shield Power</label>
            <span className="ml-auto text-sm font-mono text-blue-400">
              {state.shields}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={state.shields}
            onChange={(e) =>
              send({ type: "SET_SHIELDS", value: Number(e.target.value) })
            }
            className="w-full accent-blue-500"
          />
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${state.shields}%` }}
            />
          </div>
        </div>

        {/* Comms Channel */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Comms Channel</label>
          <div className="flex gap-2">
            {commsOptions.map((ch) => (
              <button
                key={ch}
                onClick={() => send({ type: "SET_COMMS", channel: ch })}
                className={`px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                  state.commsChannel === ch
                    ? "bg-purple-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Mission Phase */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Mission Phase</label>
          <button
            onClick={() => send({ type: "TOGGLE_PHASE" })}
            className={`px-4 py-1.5 rounded text-sm font-mono transition-colors ${
              state.missionPhase === "In-Flight"
                ? "bg-orange-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {state.missionPhase}
          </button>
        </div>
      </div>

      {/* Command Log */}
      {commandLog.length > 0 && (
        <div
          ref={logRef}
          className="mt-4 max-h-32 overflow-y-auto rounded-lg bg-zinc-900 border border-white/10 p-3 space-y-1"
        >
          {commandLog.map((entry, i) => (
            <p key={i} className="text-xs font-mono text-green-400">
              {entry}
            </p>
          ))}
        </div>
      )}

      {/* Status */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-green-400">
          All commands flow through dispatch() — the Flight Computer decides!
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => send({ type: "RESET" })}
        >
          Mission Reset (1 dispatch!)
        </Button>
      </div>

      <CodeBlock code={commanderCode} filename="flight-commander.tsx" />
    </GlowCard>
  );
}
