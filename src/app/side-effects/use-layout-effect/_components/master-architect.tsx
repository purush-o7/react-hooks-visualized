"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { motion, AnimatePresence } from "motion/react";

const TARGET = { x: 200, y: 120 };

const architectCode = `function MasterArchitect() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const roomRef = useRef(null);

  // useLayoutEffect runs BEFORE paint — measure first!
  useLayoutEffect(() => {
    if (placed && roomRef.current) {
      // Synchronous measurement — no delay, no flicker
      setPos({ x: targetX, y: targetY });
    }
  }, [placed]);

  // The sofa appears at the correct position on the
  // very first frame — the client never sees it move.
  // ⚠️ useLayoutEffect blocks paint — use sparingly!
}`;

const roomStyle = {
  backgroundColor: "#0f172a",
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px)",
};

export function MasterArchitect() {
  const [placed, setPlaced] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const roomRef = useRef<HTMLDivElement>(null);

  // Synchronous positioning — no flicker
  useLayoutEffect(() => {
    if (placed) {
      setPos(TARGET);
    }
  }, [placed]);

  // Decorative measurement animation (after paint)
  useEffect(() => {
    if (placed) {
      setShowMeasurements(true);
      const timeout = setTimeout(() => setShowMeasurements(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [placed]);

  function handlePlace() {
    if (placed) {
      setPlaced(false);
      setPos({ x: 0, y: 0 });
      setShowMeasurements(false);
    } else {
      setPlaced(true);
      setToggleCount((c) => c + 1);
    }
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#3b82f6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            ARCHITECT
          </Badge>
          {toggleCount > 0 && (
            <Badge
              variant="outline"
              className="border-green-500 text-green-600 font-mono text-xs"
            >
              Placed {toggleCount}x — perfect every time!
            </Badge>
          )}
        </div>

        {/* Blueprint room */}
        <div
          ref={roomRef}
          className="relative rounded-lg overflow-hidden"
          style={{ ...roomStyle, height: 200 }}
        >
          {/* Room label */}
          <span className="absolute top-2 left-3 text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">
            Living Room — Floor Plan
          </span>

          {/* Target zone */}
          <div
            className="absolute rounded border-2 border-dashed border-green-500/40"
            style={{
              left: TARGET.x,
              top: TARGET.y,
              width: 80,
              height: 36,
            }}
          >
            <span className="absolute -top-4 left-0 text-[9px] font-mono text-green-500/60">
              target
            </span>
          </div>

          {/* Measurement annotation lines */}
          <AnimatePresence>
            {showMeasurements && (
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 400 200`}
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Horizontal measurement line */}
                <motion.line
                  x1="0"
                  y1={TARGET.y + 18}
                  x2={TARGET.x}
                  y2={TARGET.y + 18}
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x={TARGET.x / 2 - 10}
                  y={TARGET.y + 14}
                  fill="#3b82f6"
                  fontSize="10"
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  120px
                </motion.text>

                {/* Vertical measurement line */}
                <motion.line
                  x1={TARGET.x + 40}
                  y1="0"
                  x2={TARGET.x + 40}
                  y2={TARGET.y}
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x={TARGET.x + 46}
                  y={TARGET.y / 2 + 4}
                  fill="#3b82f6"
                  fontSize="10"
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  85px
                </motion.text>

                {/* MEASURED stamp */}
                <motion.text
                  x={TARGET.x + 85}
                  y={TARGET.y + 30}
                  fill="#22c55e"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  MEASURED ✓
                </motion.text>
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Sofa — appears at target immediately */}
          <AnimatePresence>
            {placed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute rounded flex items-center justify-center text-[10px] font-mono text-white/80"
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: 80,
                  height: 36,
                  backgroundColor: "#c2956b",
                  border: "2px solid #8b6241",
                }}
              >
                SOFA
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handlePlace} variant="outline">
            {placed ? "Remove Furniture" : "Place Furniture"}
          </Button>
        </div>

        <p className="text-sm text-green-600 font-medium">
          Click &quot;Place Furniture&quot; — the sofa appears at the
          correct position instantly. No teleporting!
        </p>

        <p className="text-xs text-muted-foreground bg-yellow-500/10 rounded-lg p-3">
          useLayoutEffect blocks the browser paint — use it only when you need
          DOM measurements before the user sees the frame. For everything else,
          prefer useEffect.
        </p>

        <CodeBlock code={architectCode} filename="master-architect.tsx" />
      </div>
    </GlowCard>
  );
}
