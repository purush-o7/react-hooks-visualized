"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Play, Square, RotateCcw } from "lucide-react";

const GENRES = [
  { name: "House", color: "#a855f7", bpm: 128 },
  { name: "Lo-fi", color: "#06b6d4", bpm: 85 },
  { name: "Drum & Bass", color: "#f43f5e", bpm: 174 },
  { name: "Ambient", color: "#22c55e", bpm: 60 },
] as const;

type Genre = (typeof GENRES)[number];

// Seeded PRNG to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const fixedCode = `function DJ() {
  const [genre, setGenre] = useState("House");
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!playing) return;

    const ms = (60 / genre.bpm) * 1000;
    const id = setInterval(() => {
      setBeat(b => b + 1);
    }, ms);

    // Cleanup: stop the old beat before starting the new one
    return () => clearInterval(id);
  }, [playing, genre]);
  //         ↑ only re-run when these change

  return <Equalizer genre={genre} beat={beat} />;
}`;

function EqualizerBars({
  genre,
  playing,
}: {
  genre: Genre;
  playing: boolean;
}) {
  const bars = 8;
  return (
    <div className="flex items-end justify-center gap-1.5 h-[108px]">
      {Array.from({ length: bars }, (_, i) => {
        const baseHeight = 20 + seededRandom(i * 37) * 30;
        return (
          <motion.div
            key={i}
            className="w-5 rounded-t-sm"
            style={{ backgroundColor: genre.color }}
            animate={
              playing
                ? {
                    height: [
                      `${baseHeight}%`,
                      `${baseHeight + 40 + seededRandom(i * 17) * 30}%`,
                      `${baseHeight + 10}%`,
                      `${baseHeight + 50 + seededRandom(i * 53) * 20}%`,
                      `${baseHeight}%`,
                    ],
                  }
                : { height: `${baseHeight}%` }
            }
            transition={
              playing
                ? {
                    duration: 60 / genre.bpm,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.04,
                  }
                : { duration: 0.4 }
            }
          />
        );
      })}
    </div>
  );
}

export function FixedDJ() {
  const [genreIndex, setGenreIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const beatCountRef = useRef(0);

  const genre = GENRES[genreIndex];

  useEffect(() => {
    if (!playing) return;

    const ms = (60 / genre.bpm) * 1000;
    const id = setInterval(() => {
      beatCountRef.current += 1;
      setBeatCount(beatCountRef.current);
    }, ms);

    return () => clearInterval(id);
  }, [playing, genre]);

  function handleReset() {
    setPlaying(false);
    setBeatCount(0);
    beatCountRef.current = 0;
    setGenreIndex(0);
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            PRO DJ
          </Badge>
          <span className="text-sm text-muted-foreground">
            useEffect with cleanup
          </span>
        </div>

        {/* Equalizer */}
        <div className="rounded-lg bg-zinc-900 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <EqualizerBars genre={genre} playing={playing} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BPM + Status */}
        <div className="flex items-center justify-between">
          <div>
            <div
              className="text-4xl font-mono font-bold tabular-nums"
              style={{ color: genre.color }}
            >
              {genre.bpm}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                BPM
              </span>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-muted-foreground">
              Beats: <span className="font-mono font-bold">{beatCount}</span>
            </p>
            <p className="text-xs">
              <span className="text-green-500 font-medium">1 active</span>
              <span className="text-muted-foreground"> — cleanup works!</span>
            </p>
          </div>
        </div>

        {/* Genre Selector */}
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g, i) => (
            <button
              key={g.name}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  genreIndex === i ? g.color : "transparent",
                color: genreIndex === i ? "white" : g.color,
                border: `1.5px solid ${g.color}`,
              }}
              onClick={() => setGenreIndex(i)}
            >
              {g.name}
            </button>
          ))}
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

        {/* Lifecycle */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Badge variant="outline" className="text-xs">
            Track loads
          </Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-green-500/10">
            Beat plays
          </Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-yellow-500/10">
            Genre changes
          </Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-red-500/10">
            Old beat stops
          </Badge>
          <span>→</span>
          <Badge variant="outline" className="text-xs bg-green-500/10">
            New beat plays
          </Badge>
        </div>

        <CodeBlock code={fixedCode} filename="fixed-dj.tsx" />
      </div>
    </GlowCard>
  );
}
