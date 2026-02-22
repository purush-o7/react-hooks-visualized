"use client";

import { useState, useEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "motion/react";

const TARGET = { x: 200, y: 120 };

const flickerCode = `function ImpatientContractor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const roomRef = useRef(null);

  // useEffect runs AFTER paint — sofa appears at (0,0) first!
  useEffect(() => {
    if (placed && roomRef.current) {
      // Artificial delay to mimic layout thrashing
      setTimeout(() => {
        setPos({ x: targetX, y: targetY });
      }, 50);
    }
  }, [placed]);

  // The sofa renders at (0,0), user sees it there,
  // THEN it jumps to the target — visible teleport!
}`;

const roomStyle = {
  backgroundColor: "#0f172a",
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px)",
};

export function ImpatientContractor() {
  const [placed, setPlaced] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showTrail, setShowTrail] = useState(false);
  const [placeCount, setPlaceCount] = useState(0);
  const roomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (placed && roomRef.current) {
      const timeout = setTimeout(() => {
        setPos(TARGET);
        setShowTrail(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [placed]);

  function handlePlace() {
    if (placed) {
      setPlaced(false);
      setPos({ x: 0, y: 0 });
      setShowTrail(false);
    } else {
      setPos({ x: 0, y: 0 });
      setShowTrail(false);
      setPlaced(true);
      setPlaceCount((c) => c + 1);
    }
  }

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            IMPATIENT
          </Badge>
          {placeCount > 0 && (
            <motion.div
              key={placeCount}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.3 }}
            >
              <Badge variant="outline" className="font-mono text-xs">
                Placed {placeCount}x — watch it teleport!
              </Badge>
            </motion.div>
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

          {/* Sofa */}
          <AnimatePresence>
            {placed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute rounded flex items-center justify-center text-[10px] font-mono text-white/80"
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: 80,
                  height: 36,
                  backgroundColor: "#c2956b",
                  border: "2px solid #8b6241",
                  transition: "left 0.05s, top 0.05s",
                }}
              >
                SOFA
              </motion.div>
            )}
          </AnimatePresence>

          {/* Teleport trail */}
          {showTrail && pos.x === TARGET.x && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${roomRef.current?.clientWidth || 400} 200`}
              fill="none"
            >
              <path
                d={`M 40 18 Q ${TARGET.x / 2 + 40} ${TARGET.y - 40} ${TARGET.x + 40} ${TARGET.y + 18}`}
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                fill="none"
              />
              <polygon
                points={`${TARGET.x + 40},${TARGET.y + 18} ${TARGET.x + 32},${TARGET.y + 10} ${TARGET.x + 36},${TARGET.y + 22}`}
                fill="#ef4444"
              />
              <text
                x={TARGET.x / 2 + 20}
                y={TARGET.y / 2 + 10}
                fill="#ef4444"
                fontSize="10"
                fontFamily="monospace"
              >
                teleport!
              </text>
            </svg>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handlePlace} variant="outline">
            {placed ? "Remove Furniture" : "Place Furniture"}
          </Button>
        </div>

        <p className="text-sm text-red-500 font-medium">
          Click &quot;Place Furniture&quot; — the sofa appears at the
          top-left corner, then teleports to its target!
        </p>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why does the furniture teleport?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                useEffect runs after the browser paints. So the sofa first
                renders at position (0, 0), the user sees it there briefly,
                then the effect measures the target and moves the sofa —
                causing a visible teleport jump.
              </p>
              <p className="font-medium text-foreground">
                An architect should measure the room before placing the
                furniture, not drop it and shove it around while the client
                watches!
              </p>
              <CodeBlock code={flickerCode} filename="impatient-contractor.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
