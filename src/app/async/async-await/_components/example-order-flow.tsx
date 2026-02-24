"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const steps = [
  { code: "const res = await fetch(\"/api/user\")", label: "Fetching user...", duration: 800 },
  { code: "const user = await res.json()", label: "Parsing user data...", duration: 300 },
  { code: "const ordersRes = await fetch(`/api/orders/${user.id}`)", label: "Fetching orders...", duration: 600 },
  { code: "const orders = await ordersRes.json()", label: "Parsing orders...", duration: 200 },
  { code: "return orders", label: "Done!", duration: 0 },
];

export function ExampleOrderFlow() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setCurrentStep(-1);
    setCompletedSteps([]);
    setRunning(false);
  };

  const run = () => {
    reset();
    setRunning(true);

    let elapsed = 0;
    steps.forEach((step, i) => {
      const t1 = setTimeout(() => {
        setCurrentStep(i);
      }, elapsed);
      timeoutsRef.current.push(t1);

      elapsed += step.duration;
      const t2 = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i]);
      }, elapsed);
      timeoutsRef.current.push(t2);
    });

    const t = setTimeout(() => setRunning(false), elapsed + 100);
    timeoutsRef.current.push(t);
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            STEP-THROUGH
          </Badge>
          <span className="text-sm text-muted-foreground">
            Async/await execution flow
          </span>
        </div>

        <div className="space-y-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`rounded-lg border p-3 transition-all ${
                currentStep === i && !completedSteps.includes(i)
                  ? "border-yellow-500/50 bg-yellow-500/10"
                  : completedSteps.includes(i)
                  ? "border-green-500/30 bg-green-500/5"
                  : "opacity-40"
              }`}
            >
              <code className="text-xs font-mono">{step.code}</code>
              {currentStep === i && !completedSteps.includes(i) && (
                <p className="text-xs text-yellow-400 mt-1">{step.label}</p>
              )}
              {completedSteps.includes(i) && (
                <p className="text-xs text-green-400 mt-1">&#10003; Complete</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={run} disabled={running}>
            {running ? "Running..." : "Run async function"}
          </Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </GlowCard>
  );
}
