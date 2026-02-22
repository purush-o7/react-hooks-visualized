"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Play, Square, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

const STEPS = 8;

const code = `const [bpm, setBpm] = useState(120);
const [playing, setPlaying] = useState(false);
const [step, setStep] = useState(0);

useEffect(() => {
  if (!playing) return;

  const ms = (60 / bpm) * 1000;
  const id = setInterval(() => {
    setStep(s => (s + 1) % 8);
  }, ms);

  // Cleanup: old interval stops when BPM changes
  return () => clearInterval(id);
}, [playing, bpm]);`;

export function PlaygroundBeatLoop() {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [vinylScratch, setVinylScratch] = useState(false);
  const [scratchFlash, setScratchFlash] = useState(false);
  const beatCount = useRef(0);
  const [displayBeatCount, setDisplayBeatCount] = useState(0);

  useEffect(() => {
    if (!playing) return;

    const ms = (60 / bpm) * 1000;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STEPS);
      beatCount.current += 1;
      setDisplayBeatCount(beatCount.current);
    }, ms);

    return () => clearInterval(id);
  }, [playing, bpm]);

  function handleReset() {
    setPlaying(false);
    setStep(0);
    beatCount.current = 0;
    setDisplayBeatCount(0);
  }

  function handleVinylToggle() {
    setVinylScratch((v) => !v);
    setScratchFlash(true);
    setTimeout(() => setScratchFlash(false), 1500);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🥁</span>
          Beat Loop Machine
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Cleanup Pattern
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Play the loop, change BPM — the old interval is cleaned up and a new
          one starts at the new tempo.
        </p>

        {/* Step Sequencer */}
        <div className="flex justify-center gap-2 py-2">
          {Array.from({ length: STEPS }, (_, i) => (
            <motion.div
              key={i}
              className="size-8 rounded-full border-2"
              style={{
                borderColor: step === i && playing ? "#a855f7" : "#3f3f46",
                backgroundColor:
                  step === i && playing ? "#a855f7" : "transparent",
              }}
              animate={
                step === i && playing
                  ? { scale: [1, 1.3, 1], opacity: 1 }
                  : { scale: 1, opacity: 0.4 }
              }
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>

        {/* BPM Control */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">BPM</label>
            <span className="text-2xl font-mono font-bold tabular-nums">
              {bpm}
            </span>
          </div>
          <input
            type="range"
            min={60}
            max={180}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => setPlaying((p) => !p)}
            className={
              playing
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }
          >
            {playing ? (
              <>
                <Square className="size-4 mr-2" /> Stop
              </>
            ) : (
              <>
                <Play className="size-4 mr-2" /> Play
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="size-4 mr-2" /> Reset
          </Button>
        </div>

        {/* Vinyl Scratch Toggle (unrelated state) */}
        <div className="rounded-lg bg-muted/50 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Vinyl Scratch: {vinylScratch ? "ON" : "OFF"}
            </span>
            <Button variant="outline" size="sm" onClick={handleVinylToggle}>
              Toggle
            </Button>
          </div>
          {scratchFlash && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-green-500"
            >
              BPM didn&apos;t change — loop keeps playing!
            </motion.p>
          )}
        </div>

        {/* Beat Counter */}
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <p className="text-sm text-muted-foreground">
            Total beats:{" "}
            <span className="font-mono font-bold text-foreground">
              {displayBeatCount}
            </span>
          </p>
        </div>

        <CodeBlock code={code} filename="beat-loop.tsx" />
      </CardContent>
    </Card>
  );
}
