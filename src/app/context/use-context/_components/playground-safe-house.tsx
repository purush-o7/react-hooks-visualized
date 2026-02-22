"use client";

import { createContext, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Shield, AlertTriangle } from "lucide-react";

type Mode = "covert" | "compromised";

const ModeCtx = createContext<{
  mode: Mode;
  toggle: () => void;
}>({ mode: "covert", toggle: () => {} });

function DeeplyNestedSafeHouse() {
  const { mode } = useContext(ModeCtx);
  const isCovert = mode === "covert";

  return (
    <div
      className={`rounded-lg p-4 text-center transition-all duration-300 space-y-2 border ${
        isCovert
          ? "bg-zinc-900 border-green-500/40"
          : "bg-red-950/20 border-red-500"
      }`}
    >
      <p className="text-sm font-medium font-mono">Safe House — Bravo</p>
      <Badge
        className={
          isCovert
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700 animate-pulse"
        }
      >
        {isCovert ? "COVERT" : "COMPROMISED"}
      </Badge>
      <p className="text-xs text-muted-foreground">
        {isCovert
          ? "All clear — operating under the radar"
          : "Evacuate! Cover has been blown"}
      </p>
      <p className="text-[10px] text-muted-foreground italic">
        reads mode from context — no props
      </p>
    </div>
  );
}

function RelayStation() {
  return (
    <div className="rounded-lg border border-dashed p-3 space-y-2">
      <p className="text-xs text-muted-foreground">
        Relay Station — no mode prop
      </p>
      <DeeplyNestedSafeHouse />
    </div>
  );
}

const code = `const ModeCtx = createContext({ mode: "covert", toggle: () => {} });

function HQ() {
  const [mode, setMode] = useState("covert");
  return (
    <ModeCtx.Provider value={{ mode, toggle: () => setMode(m => m === "covert" ? "compromised" : "covert") }}>
      <RelayStation />  {/* no mode prop! */}
    </ModeCtx.Provider>
  );
}

function RelayStation() { return <SafeHouse />; }

function SafeHouse() {
  const { mode } = useContext(ModeCtx);
  return <div className={mode}>Status: {mode}</div>;
}`;

export function PlaygroundSafeHouse() {
  const [mode, setMode] = useState<Mode>("covert");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          Safe House Mode
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Provider Pattern
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ModeCtx.Provider
          value={{
            mode,
            toggle: () =>
              setMode((m) => (m === "covert" ? "compromised" : "covert")),
          }}
        >
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() =>
                setMode((m) => (m === "covert" ? "compromised" : "covert"))
              }
              className="gap-2"
            >
              {mode === "covert" ? (
                <>
                  <Shield className="size-4" /> Covert Mode — Switch to
                  Compromised
                </>
              ) : (
                <>
                  <AlertTriangle className="size-4" /> Compromised — Switch to
                  Covert
                </>
              )}
            </Button>
          </div>

          <RelayStation />
        </ModeCtx.Provider>

        <CodeBlock code={code} filename="safe-house-mode.tsx" />
      </CardContent>
    </Card>
  );
}
