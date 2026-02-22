"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function FlashBox({
  label,
  renderCount,
  children,
  color,
}: {
  label: string;
  renderCount: number;
  children?: React.ReactNode;
  color: string;
}) {
  const controls = useAnimationControls();
  const prevCount = useRef(renderCount);

  useEffect(() => {
    if (renderCount !== prevCount.current) {
      prevCount.current = renderCount;
      controls.set({ borderColor: color, boxShadow: `0 0 12px ${color}` });
      controls.start({
        borderColor: "rgba(255,255,255,0.1)",
        boxShadow: "0 0 0px transparent",
        transition: { duration: 1.5 },
      });
    }
  }, [renderCount, color, controls]);

  return (
    <motion.div
      animate={controls}
      className="rounded-lg border-2 p-4 space-y-2"
      style={{ borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Badge variant="outline" className="font-mono text-xs">
          renders: {renderCount}
        </Badge>
      </div>
      {children}
    </motion.div>
  );
}

function useRenderCount() {
  const count = useRef(0);
  const committed = useRef(0);

  // In StrictMode, the body runs twice but useEffect only commits once.
  // Reset to committed value at the start, then increment.
  count.current = committed.current + 1;

  useEffect(() => {
    committed.current = count.current;
  });

  return count.current;
}

function ChildComponent() {
  const renders = useRenderCount();

  return (
    <FlashBox
      label="<Child />"
      renderCount={renders}
      color="rgba(168, 85, 247, 0.6)"
    >
      <p className="text-xs text-muted-foreground">
        I re-render when my parent does
      </p>
    </FlashBox>
  );
}

export function VisualRenderTriggers() {
  const [count, setCount] = useState(0);
  const parentRenders = useRenderCount();

  const [activeTrigger, setActiveTrigger] = useState<number | null>(null);

  const triggers = [
    {
      num: 1,
      title: "Initial Mount",
      emoji: "1",
      desc: "The first render. React calls your function for the very first time when the component appears on screen.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/40",
    },
    {
      num: 2,
      title: "State Change",
      emoji: "2",
      desc: "Calling setState tells React: 'this data changed, please re-render.' Try clicking the counter button below!",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/40",
    },
    {
      num: 3,
      title: "Parent Re-renders",
      emoji: "3",
      desc: "When a parent re-renders, all children re-render too — even if their props didn't change. Watch the child counter below!",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/40",
    },
  ];

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(34, 197, 94, 0.3)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700">
            INTERACTIVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            3 Things That Cause a Render
          </span>
        </div>

        {/* Trigger cards */}
        <div className="grid gap-3">
          {triggers.map((trigger) => (
            <button
              key={trigger.num}
              onClick={() =>
                setActiveTrigger(
                  activeTrigger === trigger.num ? null : trigger.num
                )
              }
              className={`flex items-start gap-4 rounded-lg border p-4 text-left transition-all ${
                activeTrigger === trigger.num
                  ? `${trigger.border} ${trigger.bg}`
                  : "border-muted-foreground/10 hover:border-muted-foreground/30"
              }`}
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-full font-bold text-sm ${
                  activeTrigger === trigger.num
                    ? `${trigger.bg} ${trigger.color} ${trigger.border} border`
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {trigger.emoji}
              </div>
              <div className="space-y-1">
                <p
                  className={`font-medium ${
                    activeTrigger === trigger.num
                      ? trigger.color
                      : "text-foreground"
                  }`}
                >
                  {trigger.title}
                </p>
                {activeTrigger === trigger.num && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-muted-foreground"
                  >
                    {trigger.desc}
                  </motion.p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Live demo area */}
        <div className="rounded-lg border border-dashed border-muted-foreground/20 p-4 space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Live demo — click the button to trigger a state change render
          </p>
          <FlashBox
            label="<Parent />"
            renderCount={parentRenders}
            color="rgba(34, 197, 94, 0.6)"
          >
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCount((c) => c + 1)}
              >
                count: {count}
              </Button>
              <span className="text-xs text-muted-foreground">
                {count === 0
                  ? "Click me!"
                  : "Both boxes flash — parent AND child re-rendered!"}
              </span>
            </div>
            <ChildComponent />
          </FlashBox>
        </div>
      </div>
    </GlowCard>
  );
}
