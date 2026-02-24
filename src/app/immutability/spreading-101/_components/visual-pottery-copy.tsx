"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function VisualPotteryCopy() {
  const [original] = useState({ color: "red", size: "large", glaze: "matte" });
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const result = { ...original, ...overrides };

  const toggleOverride = (key: string, val1: string, val2: string) => {
    setOverrides((prev) => ({
      ...prev,
      [key]: prev[key] === val2 ? val1 : val2,
    }));
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            Spread + Override = New Pot
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Original
            </p>
            {Object.entries(original).map(([k, v]) => (
              <p key={k} className="font-mono text-sm">
                {k}: &quot;{v}&quot;
              </p>
            ))}
          </div>
          <div className="rounded-lg border p-3 space-y-1 border-blue-500/30">
            <p className="text-xs font-medium text-blue-400">Overrides</p>
            {Object.keys(overrides).length === 0 ? (
              <p className="text-sm text-muted-foreground">(none yet)</p>
            ) : (
              Object.entries(overrides).map(([k, v]) => (
                <p key={k} className="font-mono text-sm text-blue-400">
                  {k}: &quot;{v}&quot;
                </p>
              ))
            )}
          </div>
          <div className="rounded-lg border p-3 space-y-1 border-green-500/30">
            <p className="text-xs font-medium text-green-400">Result</p>
            {Object.entries(result).map(([k, v]) => (
              <p
                key={k}
                className={`font-mono text-sm ${
                  overrides[k] ? "text-green-400" : ""
                }`}
              >
                {k}: &quot;{v}&quot;
              </p>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleOverride("color", "red", "blue")}
          >
            Override color
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleOverride("size", "large", "small")}
          >
            Override size
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleOverride("glaze", "matte", "glossy")}
          >
            Override glaze
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setOverrides({})}>
            Reset
          </Button>
        </div>
      </div>
    </GlowCard>
  );
}
