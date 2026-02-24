"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function useRenderCount() {
  const count = useRef(0);
  const committed = useRef(0);
  count.current = committed.current + 1;
  useEffect(() => {
    committed.current = count.current;
  });
  return count.current;
}

export function VisualRenderVsDom() {
  const [name, setName] = useState("Alice");
  const renderCount = useRenderCount();

  const names = ["Alice", "Bob", "Charlie"];
  const currentIndex = names.indexOf(name);
  const nextName = names[(currentIndex + 1) % names.length];

  // Track what changed
  const prevName = useRef(name);
  const domUpdated = prevName.current !== name;

  useEffect(() => {
    prevName.current = name;
  }, [name]);

  // Animation controls for flash effects (no key-based remounting)
  const renderFlash = useAnimationControls();
  const domFlash = useAnimationControls();
  const prevRenderCount = useRef(renderCount);

  useEffect(() => {
    if (renderCount !== prevRenderCount.current) {
      prevRenderCount.current = renderCount;
      renderFlash.set({ backgroundColor: "rgba(59, 130, 246, 0.2)" });
      renderFlash.start({
        backgroundColor: "rgba(59, 130, 246, 0)",
        transition: { duration: 1 },
      });
    }
  }, [renderCount, renderFlash]);

  useEffect(() => {
    if (domUpdated) {
      domFlash.set({ backgroundColor: "rgba(34, 197, 94, 0.2)" });
      domFlash.start({
        backgroundColor: "rgba(34, 197, 94, 0)",
        transition: { duration: 1 },
      });
    }
  }, [name, domUpdated, domFlash]);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(168, 85, 247, 0.3)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700">
            KEY CONCEPT
          </Badge>
          <span className="text-sm text-muted-foreground">
            Render !== DOM Update
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          &quot;Rendering&quot; just means React called your function. It does{" "}
          <strong>not</strong> mean the screen changed. React only touches the
          real DOM when the output is actually different.
        </p>

        {/* Visual flow */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {/* Step 1: Function call */}
          <motion.div
            animate={renderFlash}
            className="rounded-lg border p-3 space-y-1"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              1. Render
            </p>
            <p className="text-2xl font-mono font-bold text-blue-400">
              f()
            </p>
            <p className="text-xs text-muted-foreground">
              Function called
            </p>
            <Badge variant="outline" className="font-mono text-[10px]">
              #{renderCount}
            </Badge>
          </motion.div>

          {/* Step 2: Diff */}
          <div className="rounded-lg border p-3 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              2. Diff
            </p>
            <p className="text-2xl font-bold text-yellow-400">
              =?
            </p>
            <p className="text-xs text-muted-foreground">
              Compare old vs new
            </p>
            <Badge
              variant="outline"
              className={`font-mono text-[10px] ${
                domUpdated ? "text-red-400" : "text-green-400"
              }`}
            >
              {domUpdated ? "different!" : "same"}
            </Badge>
          </div>

          {/* Step 3: DOM */}
          <motion.div
            animate={domFlash}
            className="rounded-lg border p-3 space-y-1"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              3. DOM
            </p>
            <p className="text-2xl font-bold text-green-400">
              {domUpdated ? "UPDATE" : "SKIP"}
            </p>
            <p className="text-xs text-muted-foreground">
              {domUpdated ? "DOM was changed" : "Nothing to do"}
            </p>
            <Badge
              variant="outline"
              className={`font-mono text-[10px] ${
                domUpdated ? "text-green-400" : "text-muted-foreground"
              }`}
            >
              {domUpdated ? "patched" : "untouched"}
            </Badge>
          </motion.div>
        </div>

        {/* Result */}
        <div className="rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Current output:</p>
          <p className="text-3xl font-bold">Hello, {name}!</p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setName(nextName)}
          >
            Change name to &quot;{nextName}&quot;
          </Button>
          <Button
            variant="outline"
            onClick={() => setName(name)}
          >
            Set same name
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Try &quot;Set same name&quot; — React still renders (calls your
          function), but the DOM stays untouched because the output
          didn&apos;t change.
        </p>
      </div>
    </GlowCard>
  );
}
