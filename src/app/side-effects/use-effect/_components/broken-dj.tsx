"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { RotateCcw } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Seeded PRNG to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function generateBarHeights(seed: number, count: number): number[] {
  return Array.from(
    { length: count },
    (_, i) => 30 + seededRandom(seed * 100 + i) * 70
  );
}

// Clashing colors — each new layer is a deliberately jarring hue
const CHAOS_COLORS = [
  "hsl(0, 85%, 55%)", // red
  "hsl(145, 80%, 50%)", // green
  "hsl(220, 85%, 60%)", // blue
  "hsl(55, 90%, 55%)", // yellow
  "hsl(290, 80%, 55%)", // purple
  "hsl(30, 90%, 55%)", // orange
  "hsl(180, 80%, 50%)", // cyan
  "hsl(340, 85%, 55%)", // pink
];

// Funny track names that pile up
const TRACK_NAMES = [
  "Chill Sunset Vibes",
  "Bass Cannon 3000",
  "Elevator Jazz Remix",
  "Angry Tuba Solo",
  "Kazoo Symphony #7",
  "Dial-Up Internet Anthem",
  "Screaming Goat Lofi",
  "Microwave Beep Trap",
  "Windows XP Shutdown Mix",
  "Alarm Clock Dubstep",
  "Fax Machine Freestyle",
  "Dog Barking in D Minor",
];

const brokenCode = `function BrokenDJ() {
  const [beat, setBeat] = useState(0);

  // This runs on EVERY render!
  setInterval(() => {
    setBeat(b => b + 1);
  }, 500);
  // Each render creates a NEW interval
  // without clearing the old one — beats pile up!

  return <Equalizer beat={beat} />;
}`;

export function BrokenDJ() {
  const [renderCount, setRenderCount] = useState(0);
  const layerSeeds = useRef<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // Auto-spawn: start with 1 layer immediately so there's motion on scroll
  useEffect(() => {
    setMounted(true);
    layerSeeds.current = [42]; // deterministic seed for SSR safety
    setRenderCount(1);
  }, []);

  function handlePlayAnother() {
    layerSeeds.current = [
      ...layerSeeds.current,
      Date.now() + layerSeeds.current.length,
    ];
    setRenderCount((c) => c + 1);
  }

  function handleReset() {
    layerSeeds.current = [42];
    setRenderCount(1);
  }

  const activeLayers = renderCount;
  const visibleLayers = layerSeeds.current.slice(0, 8);
  const noisePercent = Math.min(activeLayers / 6, 1) * 100;

  // Shake intensity ramps up with layers
  const shakeIntensity = Math.min(activeLayers, 8);
  const shakeX = shakeIntensity * 1.2;
  const shakeY = shakeIntensity * 0.6;

  return (
    <motion.div
      animate={
        mounted && activeLayers >= 2
          ? {
              x: [0, -shakeX, shakeX, -shakeX * 0.5, shakeX * 0.5, 0],
              y: [0, shakeY, -shakeY, shakeY * 0.5, 0],
            }
          : { x: 0, y: 0 }
      }
      transition={
        activeLayers >= 2
          ? {
              duration: Math.max(0.6 - activeLayers * 0.04, 0.2),
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { duration: 0.3 }
      }
    >
      <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="text-sm px-3 py-1">
              CHAOTIC
            </Badge>
            <span className="text-sm text-muted-foreground">
              Side effects in the render body
            </span>
          </div>

          {/* Equalizer Area — each track is a visible row that stacks */}
          <div className="rounded-lg bg-zinc-900 p-3 relative overflow-hidden">
            {/* TV-static overlay — flickers and intensifies */}
            {mounted && activeLayers >= 2 && (
              <motion.div
                className="absolute inset-0 z-[5] pointer-events-none rounded-lg"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  mixBlendMode: "overlay",
                }}
                animate={{
                  opacity: [
                    Math.min(activeLayers * 0.07, 0.4),
                    Math.min(activeLayers * 0.12, 0.55),
                    Math.min(activeLayers * 0.05, 0.3),
                    Math.min(activeLayers * 0.1, 0.5),
                  ],
                }}
                transition={{
                  duration: Math.max(0.4 - activeLayers * 0.03, 0.1),
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            {/* Scanline flicker at high chaos */}
            {mounted && activeLayers >= 5 && (
              <motion.div
                className="absolute inset-0 z-[6] pointer-events-none rounded-lg"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.2, 0.6],
                  backgroundPositionY: ["0px", "4px"],
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            {!mounted && (
              <div className="flex items-center justify-center h-[52px] text-sm text-zinc-500">
                Loading...
              </div>
            )}

            {/* Stacked equalizer rows — each track gets its own row */}
            <div className="flex flex-col-reverse gap-1 relative z-[1]">
              {visibleLayers.map((seed, layerIndex) => {
                const heights = generateBarHeights(seed, 12);
                const color = CHAOS_COLORS[layerIndex % CHAOS_COLORS.length];
                const name = TRACK_NAMES[layerIndex % TRACK_NAMES.length];

                return (
                  <motion.div
                    key={seed}
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                  >
                    {/* Track label */}
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <motion.div
                        className="size-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 0.6 + layerIndex * 0.1,
                          repeat: Infinity,
                        }}
                      />
                      <span
                        className="text-[10px] font-mono truncate"
                        style={{ color }}
                      >
                        #{layerIndex + 1} {name}
                      </span>
                    </div>
                    {/* Bars */}
                    <div className="flex items-end gap-[2px] h-[28px]">
                      {heights.map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-[2px] min-w-0"
                          style={{ backgroundColor: color }}
                          animate={{
                            height: [
                              `${h * 0.2}%`,
                              `${h}%`,
                              `${h * 0.4}%`,
                              `${h * 0.85}%`,
                            ],
                          }}
                          transition={{
                            duration:
                              0.25 + seededRandom(seed + i) * 0.25,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.03 + layerIndex * 0.02,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Counter badge for layers beyond visible cap */}
            {activeLayers > 8 && (
              <p className="text-[10px] text-zinc-500 text-center mt-2">
                + {activeLayers - 8} more tracks playing underneath...
              </p>
            )}
          </div>

          {/* Track Stack — polished "now playing" queue */}
          {mounted && activeLayers >= 1 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Playing Queue
                </p>
                {activeLayers >= 3 && (
                  <motion.div
                    key={activeLayers}
                    initial={{ scale: 1.3, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-2.5 py-0.5"
                  >
                    <motion.div
                      className="size-1.5 rounded-full bg-red-500"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                      }}
                    />
                    <span className="text-[11px] font-mono font-bold text-red-400">
                      {activeLayers} active
                    </span>
                  </motion.div>
                )}
              </div>
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 max-h-[180px] overflow-y-auto divide-y divide-zinc-800/60">
                {Array.from({ length: activeLayers })
                  .map((_, i) => i)
                  .reverse()
                  .map((i) => {
                    const color = CHAOS_COLORS[i % CHAOS_COLORS.length];
                    const name = TRACK_NAMES[i % TRACK_NAMES.length];
                    const isLatest = i === activeLayers - 1;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                        className="px-3 py-2.5 space-y-1.5"
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Animated playing indicator */}
                          <div className="flex items-end gap-[2px] h-3 shrink-0">
                            {[0, 1, 2].map((bar) => (
                              <motion.div
                                key={bar}
                                className="w-[3px] rounded-full"
                                style={{ backgroundColor: color }}
                                animate={{
                                  height: ["3px", "12px", "5px", "10px", "3px"],
                                }}
                                transition={{
                                  duration: 0.6 + bar * 0.15,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: bar * 0.12 + i * 0.05,
                                }}
                              />
                            ))}
                          </div>
                          {/* Track info */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs truncate ${
                                isLatest
                                  ? "font-semibold text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {name}
                            </p>
                          </div>
                          {/* Track number + status */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className="text-[10px] font-mono font-bold rounded px-1.5 py-0.5"
                              style={{
                                color,
                                backgroundColor: `${color}15`,
                              }}
                            >
                              #{i + 1}
                            </span>
                          </div>
                        </div>
                        {/* Mini progress bar — always moving, never stopping */}
                        <div className="h-[3px] rounded-full bg-zinc-800 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            animate={{
                              width: ["0%", "100%"],
                            }}
                            transition={{
                              duration: 2.5 + i * 0.4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
              {activeLayers >= 3 && (
                <p className="text-[11px] text-zinc-500 italic text-center">
                  All {activeLayers} tracks playing at once — none were stopped.
                </p>
              )}
            </div>
          )}

          {/* Noise Level Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Noise Level</span>
              <span className="font-mono">
                {activeLayers} beat{activeLayers !== 1 ? "s" : ""} active
              </span>
            </div>
            <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${noisePercent}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </div>
          </div>

          {activeLayers >= 3 && (
            <motion.p
              key={activeLayers}
              initial={{ opacity: 0, y: -5, scale: 1.05 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-sm font-medium text-red-500 text-center"
            >
              {activeLayers} beats playing simultaneously! Nobody stopped the
              old ones.
            </motion.p>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={handlePlayAnother}>
              Play Another
            </Button>
            {activeLayers >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="size-4 mr-2" /> Reset
                </Button>
              </motion.div>
            )}
          </div>

          <Accordion>
            <AccordionItem value="why">
              <AccordionTrigger className="text-sm font-medium">
                Why do the beats pile up?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <p>
                  Code in the component body runs on{" "}
                  <strong>every render</strong>. If you start a beat there, each
                  render adds another beat without stopping the old one.
                </p>
                <p>
                  After 10 renders you have 10 beats all playing at once.
                  That&apos;s a memory leak and audio chaos.
                </p>
                <p className="font-medium text-foreground">
                  We need a way to say: &quot;Play this beat AFTER render, and
                  stop the old one when the track changes.&quot;
                </p>
                <CodeBlock code={brokenCode} filename="broken-dj.tsx" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </GlowCard>
    </motion.div>
  );
}
