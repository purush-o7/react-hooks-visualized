"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 0,
    label: "Your Component",
    description: "React sees your component in the tree and prepares to render it.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    code: "function Greeting({ name }) {",
  },
  {
    id: 1,
    label: "Function Runs",
    description: "React calls your function. All code inside runs top to bottom.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    code: '  const message = `Hello, ${name}!`;',
  },
  {
    id: 2,
    label: "JSX Returned",
    description: "Your function returns JSX — a description of what the UI should look like.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    code: "  return <h1>{message}</h1>;",
  },
  {
    id: 3,
    label: "Diff & Update",
    description: "React compares the new JSX with the old one, and only updates what actually changed in the real DOM.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    code: "// React: old <h1>Hello, Alice!</h1> → new <h1>Hello, Bob!</h1> → update text node",
  },
];

export function VisualRenderCycle() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  function playAnimation() {
    setIsPlaying(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      setActiveStep(step);
    }, 1500);
  }

  function reset() {
    setActiveStep(-1);
    setIsPlaying(false);
  }

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.3)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            The Render Cycle — Step by Step
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 flex-1">
              <motion.button
                onClick={() => !isPlaying && setActiveStep(i)}
                className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  activeStep >= i
                    ? `${step.border} ${step.bg} ${step.color}`
                    : "border-muted-foreground/20 text-muted-foreground/40"
                }`}
                animate={
                  activeStep === i
                    ? { scale: [1, 1.15, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              >
                {i + 1}
              </motion.button>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded transition-colors duration-500 ${
                    activeStep > i ? "bg-muted-foreground/40" : "bg-muted-foreground/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Active step details */}
        <AnimatePresence mode="wait">
          {activeStep >= 0 && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg border p-5 space-y-3 ${steps[activeStep].border} ${steps[activeStep].bg}`}
            >
              <p className={`font-semibold ${steps[activeStep].color}`}>
                Step {activeStep + 1}: {steps[activeStep].label}
              </p>
              <p className="text-sm text-muted-foreground">
                {steps[activeStep].description}
              </p>
              <pre className="rounded-md bg-black/40 p-3 font-mono text-xs text-white/80 overflow-x-auto">
                <code>{steps[activeStep].code}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {activeStep < 0 && (
          <div className="rounded-lg border border-dashed border-muted-foreground/20 p-8 text-center text-sm text-muted-foreground">
            Press &quot;Play&quot; to see the render cycle animate step by step, or click any step number.
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={playAnimation}
            disabled={isPlaying}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPlaying ? "Playing..." : activeStep >= 0 ? "Replay" : "Play"}
          </Button>
          {activeStep >= 0 && !isPlaying && (
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
