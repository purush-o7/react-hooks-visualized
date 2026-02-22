"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import { motion } from "motion/react";

const code = `const [trackName, setTrackName] = useState("Sunset Vibes");
const [volume, setVolume] = useState(75);

useEffect(() => {
  document.title = \`🎵 \${trackName}\`;
  effectCount.current += 1;

  return () => { document.title = "Learn Hooks"; };
}, [trackName]); // only runs when trackName changes
// Volume changes? Effect is SKIPPED.`;

export function PlaygroundNowPlaying() {
  const [trackName, setTrackName] = useState("Sunset Vibes");
  const [volume, setVolume] = useState(75);
  const effectRunCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    effectRunCount.current += 1;
    setDisplayCount(effectRunCount.current);
    document.title = `🎵 ${trackName}`;

    return () => {
      document.title = "Learn Hooks";
    };
  }, [trackName]);

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(Number(e.target.value));
    setSkipped(true);
    setTimeout(() => setSkipped(false), 1500);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          Now Playing Display
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Dependency Array
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Type a track name — watch your browser tab update. Change volume —
          the effect is skipped.
        </p>

        {/* LED Panel */}
        <div className="rounded-lg bg-zinc-900 p-4 text-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
            Now Playing
          </p>
          <p className="text-xl font-mono font-bold text-cyan-400 truncate">
            {trackName || "—"}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-0.5"
            >
              _
            </motion.span>
          </p>
        </div>

        {/* Track Name Input */}
        <Input
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
          placeholder="Type a track name..."
        />

        {/* Volume Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-24">
              Volume ({volume})
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
          {skipped && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-green-500"
            >
              Volume changed — effect skipped!
            </motion.p>
          )}
        </div>

        {/* Effect Counter */}
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <p className="text-sm text-muted-foreground">
            Effect ran{" "}
            <span className="font-mono font-bold text-foreground">
              {displayCount}
            </span>{" "}
            time{displayCount !== 1 ? "s" : ""}
          </p>
        </div>

        <CodeBlock code={code} filename="now-playing.tsx" />
      </CardContent>
    </Card>
  );
}
