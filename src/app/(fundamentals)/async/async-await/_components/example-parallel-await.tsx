"use client";

import { useState, useRef, useCallback } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const tasks = [
  { label: "fetchUsers", duration: 800, color: "#3b82f6" },
  { label: "fetchPosts", duration: 600, color: "#8b5cf6" },
  { label: "fetchComments", duration: 400, color: "#06b6d4" },
];

const totalSequential = tasks.reduce((sum, t) => sum + t.duration, 0);
const totalParallel = Math.max(...tasks.map((t) => t.duration));

const parallelCode = `// Sequential — each waits for the previous
const users = await fetchUsers();       // 800ms
const posts = await fetchPosts();       // 600ms
const comments = await fetchComments(); // 400ms
// Total: ~1800ms (waterfall!)

// Parallel — all start at once
const [users, posts, comments] = await Promise.all([
  fetchUsers(),      // 800ms ─┐
  fetchPosts(),      // 600ms  ├─ ~800ms total
  fetchComments(),   // 400ms ─┘
]);`;

function ProgressBar({
  label,
  duration,
  maxDuration,
  color,
  progress,
  startOffset,
}: {
  label: string;
  duration: number;
  maxDuration: number;
  color: string;
  progress: number;
  startOffset: number;
}) {
  const barWidth = (duration / maxDuration) * 100;
  const offsetPct = (startOffset / maxDuration) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono">{label}</span>
        <span className="text-muted-foreground">{duration}ms</span>
      </div>
      <div className="h-7 rounded bg-muted/30 relative overflow-hidden">
        <div
          className="absolute top-0 h-full rounded flex items-center justify-center text-xs font-mono text-white transition-none"
          style={{
            left: `${offsetPct}%`,
            width: `${barWidth * Math.min(progress, 1)}%`,
            backgroundColor: color,
            opacity: progress > 0 ? 1 : 0.3,
          }}
        >
          {progress >= 1 && "✓"}
        </div>
      </div>
    </div>
  );
}

export function ExampleParallelAwait() {
  const [seqProgress, setSeqProgress] = useState<number[]>([0, 0, 0]);
  const [parProgress, setParProgress] = useState<number[]>([0, 0, 0]);
  const [seqElapsed, setSeqElapsed] = useState<number | null>(null);
  const [parElapsed, setParElapsed] = useState<number | null>(null);
  const [seqRunning, setSeqRunning] = useState(false);
  const [parRunning, setParRunning] = useState(false);
  const rafRef = useRef<number>(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const animateBar = (
    index: number,
    duration: number,
    setter: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    return new Promise<void>((resolve) => {
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const pct = Math.min(elapsed / duration, 1);
        setter((prev) => {
          const next = [...prev];
          next[index] = pct;
          return next;
        });
        if (pct < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    });
  };

  const runSequential = async () => {
    cleanup();
    setSeqProgress([0, 0, 0]);
    setSeqElapsed(null);
    setSeqRunning(true);
    const start = performance.now();

    for (let i = 0; i < tasks.length; i++) {
      await animateBar(i, tasks[i].duration, setSeqProgress);
    }

    setSeqElapsed(Math.round(performance.now() - start));
    setSeqRunning(false);
  };

  const runParallel = async () => {
    cleanup();
    setParProgress([0, 0, 0]);
    setParElapsed(null);
    setParRunning(true);
    const start = performance.now();

    await Promise.all(
      tasks.map((task, i) => animateBar(i, task.duration, setParProgress))
    );

    setParElapsed(Math.round(performance.now() - start));
    setParRunning(false);
  };

  let seqOffset = 0;
  let parOffset = 0;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(99, 102, 241, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-indigo-600 hover:bg-indigo-700">
            TIMING
          </Badge>
          <span className="text-sm text-muted-foreground">
            Waterfall vs Parallel execution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sequential */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Sequential (waterfall)</p>
              {seqElapsed !== null && (
                <span className="font-mono text-sm text-red-400">
                  {seqElapsed}ms
                </span>
              )}
            </div>
            {tasks.map((task, i) => {
              const offset = seqOffset;
              seqOffset += task.duration;
              return (
                <ProgressBar
                  key={task.label}
                  label={task.label}
                  duration={task.duration}
                  maxDuration={totalSequential}
                  color={task.color}
                  progress={seqProgress[i]}
                  startOffset={offset}
                />
              );
            })}
            <Button
              onClick={runSequential}
              disabled={seqRunning}
              variant="outline"
              className="w-full"
            >
              {seqRunning ? "Running..." : "Run Sequential"}
            </Button>
          </div>

          {/* Parallel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Parallel (Promise.all)</p>
              {parElapsed !== null && (
                <span className="font-mono text-sm text-green-400">
                  {parElapsed}ms
                </span>
              )}
            </div>
            {tasks.map((task, i) => {
              const offset = parOffset;
              return (
                <ProgressBar
                  key={task.label}
                  label={task.label}
                  duration={task.duration}
                  maxDuration={totalSequential}
                  color={task.color}
                  progress={parProgress[i]}
                  startOffset={offset}
                />
              );
            })}
            <Button
              onClick={runParallel}
              disabled={parRunning}
              variant="outline"
              className="w-full"
            >
              {parRunning ? "Running..." : "Run Parallel"}
            </Button>
          </div>
        </div>

        <CodeBlock code={parallelCode} filename="parallel-vs-sequential.js" />
      </div>
    </GlowCard>
  );
}
