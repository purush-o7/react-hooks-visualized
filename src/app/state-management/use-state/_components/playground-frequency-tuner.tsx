"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const SWEET_SPOT = 101.1;

function getSignalStrength(frequency: number): number {
  const distance = Math.abs(frequency - SWEET_SPOT);
  if (distance <= 0.2) return 5;
  if (distance <= 2) return 4;
  if (distance <= 5) return 3;
  if (distance <= 10) return 2;
  return 1;
}

function getBarColor(strength: number, barIndex: number): string {
  if (barIndex >= strength) return "#3f3f46";
  if (strength >= 5) return "#22c55e";
  if (strength >= 4) return "#22c55e";
  if (strength >= 3) return "#d97706";
  if (strength >= 2) return "#d97706";
  return "#ef4444";
}

const code = `const [frequency, setFrequency] = useState(88.0);

// Tune the dial
setFrequency(101.1);

// Fine-tune with updater
setFrequency(prev => Math.min(prev + 0.1, 108.0));`;

const presets = [
  { label: "89.5", value: 89.5 },
  { label: "101.1", value: 101.1 },
  { label: "106.7", value: 106.7 },
];

export function PlaygroundFrequencyTuner() {
  const [frequency, setFrequency] = useState(88.0);

  const strength = getSignalStrength(frequency);
  const isLockedOn = strength === 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📻</span>
          Frequency Tuner
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Number State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Visual panel */}
        <div className="rounded-xl bg-zinc-900 p-6 space-y-5">
          {/* Frequency display */}
          <div className="text-center">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
              Frequency
            </p>
            <p
              className="text-4xl font-mono font-bold transition-colors duration-300"
              style={{ color: "#d97706" }}
            >
              {frequency.toFixed(1)}{" "}
              <span className="text-lg text-zinc-500">MHz</span>
            </p>
          </div>

          {/* Signal strength meter */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-end gap-1.5 h-16">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 rounded-sm transition-all duration-300"
                  style={{
                    height: `${(i + 1) * 12}px`,
                    backgroundColor: getBarColor(strength, i),
                    boxShadow:
                      i < strength && isLockedOn
                        ? "0 0 8px rgba(34, 197, 94, 0.5)"
                        : "none",
                  }}
                />
              ))}
            </div>
            <p
              className="text-xs font-mono font-bold tracking-wider transition-colors duration-300"
              style={{
                color: isLockedOn ? "#22c55e" : "#71717a",
              }}
            >
              {isLockedOn ? "LOCKED ON" : `SIGNAL: ${strength}/5`}
            </p>
          </div>

          {/* Tuner dial */}
          <div className="space-y-2">
            <input
              type="range"
              min={88.0}
              max={108.0}
              step={0.1}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-600">
              <span>88.0</span>
              <span>108.0</span>
            </div>
          </div>

          {/* Preset buttons */}
          <div className="flex justify-center gap-2">
            {presets.map((p) => (
              <Button
                key={p.label}
                variant={
                  Math.abs(frequency - p.value) < 0.05 ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFrequency(p.value)}
                className="font-mono text-xs"
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>

        <CodeBlock code={code} filename="frequency-tuner.tsx" />
      </CardContent>
    </Card>
  );
}
