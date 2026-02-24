"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExampleReferenceSurprise() {
  const [log, setLog] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const runDemo = () => {
    const newLog: string[] = [];

    // Step 1: Create object
    const original = { name: "Red Vase", glaze: "matte" };
    newLog.push(`original = { name: "Red Vase", glaze: "matte" }`);

    // Step 2: Assign reference
    const copy = original;
    newLog.push(`copy = original  // same reference`);

    // Step 3: Mutate via copy
    copy.glaze = "glossy";
    newLog.push(`copy.glaze = "glossy"  // mutate through copy`);

    // Step 4: Check original
    newLog.push(`original.glaze → "${original.glaze}"  // ALSO changed!`);
    newLog.push(`copy === original → ${copy === original}  // same object`);

    setLog(newLog);
    setStep(newLog.length);
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(249, 115, 22, 0.35)">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-orange-600 hover:bg-orange-700">SURPRISE</Badge>
          <span className="text-sm text-muted-foreground">
            Mutation through a reference
          </span>
        </div>

        <div className="min-h-[120px] rounded-lg bg-muted/50 p-4 font-mono text-sm space-y-1">
          {log.length === 0 ? (
            <span className="text-muted-foreground">
              Click &quot;Run&quot; to see the reference surprise...
            </span>
          ) : (
            log.slice(0, step).map((line, i) => (
              <div
                key={i}
                className={
                  i === 3
                    ? "text-orange-400 font-medium"
                    : "text-muted-foreground"
                }
              >
                {line}
              </div>
            ))
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={runDemo}>Run</Button>
          <Button
            variant="outline"
            onClick={() => {
              setLog([]);
              setStep(0);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </GlowCard>
  );
}
