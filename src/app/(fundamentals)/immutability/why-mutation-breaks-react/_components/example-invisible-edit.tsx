"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const colors = ["red", "blue", "green", "purple", "orange"];

export function ExampleInvisibleEdit() {
  const [pot, setPot] = useState({ color: "red", size: "large" });
  const renderCount = useRef(0);
  renderCount.current += 1;

  const mutate = () => {
    const nextColor = colors[(colors.indexOf(pot.color) + 1) % colors.length];
    pot.color = nextColor; // mutation!
    setPot(pot); // same ref — React ignores this
  };

  const immutableUpdate = () => {
    const nextColor = colors[(colors.indexOf(pot.color) + 1) % colors.length];
    setPot({ ...pot, color: nextColor }); // new object!
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlowCard className="p-6" glowColor="rgba(239, 68, 68, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 hover:bg-red-700">BROKEN</Badge>
            <span className="text-sm text-muted-foreground">
              Mutation — same reference
            </span>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 font-mono text-sm">
            <p>pot.color = &quot;{pot.color}&quot;</p>
            <p className="text-muted-foreground mt-1">
              renders: {renderCount.current}
            </p>
          </div>
          <Button variant="outline" onClick={mutate} className="w-full">
            Mutate pot.color
          </Button>
          <p className="text-xs text-muted-foreground">
            The color changes in memory, but the screen doesn&apos;t update
            because React sees the same object reference.
          </p>
        </div>
      </GlowCard>

      <GlowCard className="p-6" glowColor="rgba(34, 197, 94, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 hover:bg-green-700">WORKS</Badge>
            <span className="text-sm text-muted-foreground">
              Spread — new reference
            </span>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 font-mono text-sm">
            <p>pot.color = &quot;{pot.color}&quot;</p>
            <p className="text-muted-foreground mt-1">
              renders: {renderCount.current}
            </p>
          </div>
          <Button variant="outline" onClick={immutableUpdate} className="w-full">
            Spread + update
          </Button>
          <p className="text-xs text-muted-foreground">
            New object = new reference = React re-renders and shows the update.
          </p>
        </div>
      </GlowCard>
    </div>
  );
}
