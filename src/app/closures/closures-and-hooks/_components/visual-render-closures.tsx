"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function VisualRenderClosures() {
  const [renders, setRenders] = useState([{ id: 1, count: 0 }]);

  const addRender = () => {
    const lastCount = renders[renders.length - 1].count;
    setRenders((prev) => [
      ...prev,
      { id: prev.length + 1, count: lastCount + 1 },
    ]);
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            Each render = new time capsule
          </span>
        </div>

        <div className="space-y-2">
          {renders.map((render) => (
            <div
              key={render.id}
              className="rounded-lg border p-3 flex items-center gap-4"
            >
              <Badge variant="outline" className="font-mono shrink-0">
                Render #{render.id}
              </Badge>
              <code className="text-sm font-mono text-muted-foreground">
                count = {render.count}
              </code>
              <span className="text-xs text-muted-foreground ml-auto">
                closure captures count={render.count}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={addRender} size="sm">
            Simulate setState (new render)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRenders([{ id: 1, count: 0 }])}
          >
            Reset
          </Button>
        </div>

        {renders.length > 1 && (
          <div className="rounded-lg bg-blue-500/10 p-4 text-sm text-muted-foreground">
            Each render created a new closure. Render #{renders.length} sees{" "}
            <code className="text-foreground">
              count = {renders[renders.length - 1].count}
            </code>
            , but Render #1&apos;s closure still sees{" "}
            <code className="text-foreground">count = 0</code>.
          </div>
        )}
      </div>
    </GlowCard>
  );
}
