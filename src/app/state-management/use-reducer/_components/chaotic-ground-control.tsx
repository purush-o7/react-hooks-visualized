"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const commsOptions = ["Alpha", "Bravo", "Charlie"] as const;

const chaoticCode = `function ChaoticGroundControl() {
  const [fuel, setFuel] = useState(100);
  const [altitude, setAltitude] = useState(0);
  const [shields, setShields] = useState(50);
  const [commsChannel, setCommsChannel] = useState("Alpha");
  const [missionPhase, setMissionPhase] = useState("Pre-Launch");

  function handleEmergencyRecall() {
    setFuel(100);       // call operator 1
    setAltitude(0);     // call operator 2
    setShields(50);     // call operator 3
    setCommsChannel("Alpha"); // call operator 4
    setMissionPhase("Pre-Launch"); // call operator 5
  }
}`;

export function ChaoticGroundControl() {
  const [fuel, setFuel] = useState(100);
  const [altitude, setAltitude] = useState(0);
  const [shields, setShields] = useState(50);
  const [commsChannel, setCommsChannel] = useState<string>("Alpha");
  const [missionPhase, setMissionPhase] = useState("Pre-Launch");
  const [changeCount, setChangeCount] = useState(0);

  function trackChange() {
    setChangeCount((c) => c + 1);
  }

  function handleEmergencyRecall() {
    setFuel(100);
    setAltitude(0);
    setShields(50);
    setCommsChannel("Alpha");
    setMissionPhase("Pre-Launch");
    setChangeCount(0);
  }

  return (
    <GlowCard glowColor="rgba(239, 68, 68, 0.35)" className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🛰️</span>
        <h3 className="text-lg font-bold">Ship Systems Panel</h3>
        <Badge variant="destructive" className="ml-auto">
          CHAOTIC
        </Badge>
      </div>

      <div className="space-y-5 rounded-lg bg-zinc-900 p-4 border border-white/10">
        {/* Fuel Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-amber-500"
              title="Operator 1"
            />
            <label className="text-sm font-medium">Fuel Level</label>
            <span className="ml-auto text-sm font-mono text-amber-400">
              {fuel}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={fuel}
            onChange={(e) => {
              setFuel(Number(e.target.value));
              trackChange();
            }}
            className="w-full accent-amber-500"
          />
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-500 transition-all"
              style={{ width: `${fuel}%` }}
            />
          </div>
        </div>

        {/* Altitude */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-green-500"
              title="Operator 2"
            />
            <label className="text-sm font-medium">Altitude</label>
            <span className="ml-auto text-sm font-mono text-green-400">
              {altitude.toLocaleString()} km
            </span>
          </div>
          <input
            type="number"
            min={0}
            max={50000}
            step={100}
            value={altitude}
            onChange={(e) => {
              setAltitude(Number(e.target.value));
              trackChange();
            }}
            className="w-full rounded bg-zinc-800 border border-white/10 px-3 py-1.5 text-sm font-mono text-green-400 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Shield Power */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-blue-500"
              title="Operator 3"
            />
            <label className="text-sm font-medium">Shield Power</label>
            <span className="ml-auto text-sm font-mono text-blue-400">
              {shields}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={shields}
            onChange={(e) => {
              setShields(Number(e.target.value));
              trackChange();
            }}
            className="w-full accent-blue-500"
          />
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${shields}%` }}
            />
          </div>
        </div>

        {/* Comms Channel */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-purple-500"
              title="Operator 4"
            />
            <label className="text-sm font-medium">Comms Channel</label>
          </div>
          <div className="flex gap-2">
            {commsOptions.map((ch) => (
              <button
                key={ch}
                onClick={() => {
                  setCommsChannel(ch);
                  trackChange();
                }}
                className={`px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                  commsChannel === ch
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
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-orange-500"
              title="Operator 5"
            />
            <label className="text-sm font-medium">Mission Phase</label>
          </div>
          <button
            onClick={() => {
              setMissionPhase((p) =>
                p === "Pre-Launch" ? "In-Flight" : "Pre-Launch"
              );
              trackChange();
            }}
            className={`px-4 py-1.5 rounded text-sm font-mono transition-colors ${
              missionPhase === "In-Flight"
                ? "bg-orange-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {missionPhase}
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-red-400">
          Changed {changeCount} systems — each has its own operator!
        </p>
        <Button variant="outline" size="sm" onClick={handleEmergencyRecall}>
          Emergency Recall (5 separate calls!)
        </Button>
      </div>

      {/* Accordion */}
      <Accordion>
        <AccordionItem value="why">
          <AccordionTrigger className="text-sm font-medium">
            Why is this mission a disaster?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
            <ul className="space-y-1 list-disc list-inside">
              <li>Each system has its own operator (useState call)</li>
              <li>Emergency recall requires calling every station manually</li>
              <li>No single source of truth for ship state</li>
              <li>Adding a new system means another useState + setter</li>
            </ul>
            <CodeBlock code={chaoticCode} filename="chaotic-ground-control.tsx" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </GlowCard>
  );
}
