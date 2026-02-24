"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function VisualClayVsGlaze() {
  // Value type demo
  const [glazeA, setGlazeA] = useState(50);
  const [glazeB, setGlazeB] = useState(50);

  // Reference type demo
  const [pot, setPot] = useState({ color: "red", size: "medium" });
  const potRef = pot; // same reference!

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlowCard className="p-6" glowColor="rgba(59, 130, 246, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-600 hover:bg-blue-700">VALUE</Badge>
            <span className="text-sm text-muted-foreground">
              Glaze (primitives)
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <code className="text-sm font-mono w-16">a = {glazeA}</code>
              <input
                type="range"
                min={0}
                max={100}
                value={glazeA}
                onChange={(e) => setGlazeA(Number(e.target.value))}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <code className="text-sm font-mono w-16">b = {glazeB}</code>
              <input
                type="range"
                min={0}
                max={100}
                value={glazeB}
                onChange={(e) => setGlazeB(Number(e.target.value))}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Changing one slider does not affect the other — independent copies.
            </p>
          </div>
        </div>
      </GlowCard>

      <GlowCard className="p-6" glowColor="rgba(249, 115, 22, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-600 hover:bg-orange-700">
              REFERENCE
            </Badge>
            <span className="text-sm text-muted-foreground">
              Pot (object)
            </span>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-3 font-mono text-sm space-y-1">
              <p>pot = {`{ color: "${pot.color}", size: "${pot.size}" }`}</p>
              <p>
                potRef = {`{ color: "${potRef.color}", size: "${potRef.size}" }`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setPot({ ...pot, color: pot.color === "red" ? "blue" : "red" })
                }
              >
                Change color
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setPot({
                    ...pot,
                    size: pot.size === "medium" ? "large" : "medium",
                  })
                }
              >
                Change size
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Both <code>pot</code> and <code>potRef</code> always show the
              same values — they reference the same object.
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
