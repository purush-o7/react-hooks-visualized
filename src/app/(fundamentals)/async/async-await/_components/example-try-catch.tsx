"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExampleTryCatch() {
  const [log, setLog] = useState<{ text: string; type: "info" | "error" | "success" }[]>([]);
  const [running, setRunning] = useState(false);

  const runSuccess = async () => {
    setLog([]);
    setRunning(true);
    const addLog = (text: string, type: "info" | "error" | "success") =>
      setLog((prev) => [...prev, { text, type }]);

    addLog("try {", "info");
    await new Promise((r) => setTimeout(r, 500));
    addLog("  const order = await createOrder('pizza') done", "success");
    await new Promise((r) => setTimeout(r, 500));
    addLog("  const confirmation = await processPayment() done", "success");
    addLog("}", "info");
    addLog("finally { hideSpinner() }", "info");
    setRunning(false);
  };

  const runError = async () => {
    setLog([]);
    setRunning(true);
    const addLog = (text: string, type: "info" | "error" | "success") =>
      setLog((prev) => [...prev, { text, type }]);

    addLog("try {", "info");
    await new Promise((r) => setTimeout(r, 500));
    addLog("  const order = await createOrder('pizza') done", "success");
    await new Promise((r) => setTimeout(r, 500));
    addLog("  const confirmation = await processPayment() FAILED", "error");
    addLog("} catch (error) {", "info");
    addLog('  "Payment declined: insufficient funds"', "error");
    addLog("}", "info");
    addLog("finally { hideSpinner() }", "info");
    setRunning(false);
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(168, 85, 247, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700">
            INTERACTIVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            try/catch in action
          </span>
        </div>

        <div className="min-h-[120px] rounded-lg bg-muted/50 p-4 font-mono text-xs space-y-1">
          {log.length === 0 ? (
            <span className="text-muted-foreground">
              Run a scenario to see try/catch flow...
            </span>
          ) : (
            log.map((entry, i) => (
              <div
                key={i}
                className={
                  entry.type === "error"
                    ? "text-red-400"
                    : entry.type === "success"
                    ? "text-green-400"
                    : "text-muted-foreground"
                }
              >
                {entry.text}
              </div>
            ))
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={runSuccess} disabled={running}>
            Run (success)
          </Button>
          <Button onClick={runError} disabled={running} variant="destructive">
            Run (error)
          </Button>
        </div>
      </div>
    </GlowCard>
  );
}
