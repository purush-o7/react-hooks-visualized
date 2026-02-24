"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  lines: number[]; // 1-indexed line numbers to highlight
  title: string;
  explanation: string;
};

interface CodeWalkthroughProps {
  code: string;
  steps: Step[];
  filename?: string;
  className?: string;
}

export function CodeWalkthrough({
  code,
  steps,
  filename,
  className,
}: CodeWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const lines = code.split("\n");
  const step = steps[currentStep];
  const highlightedLines = new Set(step?.lines ?? []);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const reset = () => setCurrentStep(0);

  return (
    <div className={cn("rounded-xl border overflow-hidden bg-[#1c1e26]", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs text-zinc-400 font-mono">{filename}</span>
          )}
          <Badge variant="outline" className="text-[10px] border-zinc-600 text-zinc-400">
            Step {currentStep + 1} / {steps.length}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-zinc-400 hover:text-zinc-200"
            onClick={prev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-zinc-400 hover:text-zinc-200"
            onClick={next}
            disabled={currentStep === steps.length - 1}
          >
            <ChevronRight className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-zinc-400 hover:text-zinc-200"
            onClick={reset}
          >
            <RotateCcw className="size-3" />
          </Button>
        </div>
      </div>

      {/* Code with line highlighting */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isHighlighted = highlightedLines.has(lineNum);
            return (
              <div
                key={i}
                className={cn(
                  "px-2 -mx-2 rounded transition-all duration-300",
                  isHighlighted
                    ? "bg-blue-500/15 text-zinc-100"
                    : "text-zinc-500"
                )}
              >
                <span className="inline-block w-8 text-right mr-4 text-zinc-600 select-none text-xs">
                  {lineNum}
                </span>
                {line || " "}
              </div>
            );
          })}
        </pre>
      </div>

      {/* Explanation panel */}
      <div className="border-t border-white/[0.06] bg-white/[0.03] p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm font-medium text-zinc-200 mb-1">
              {step?.title}
            </p>
            <p className="text-sm text-zinc-400">
              {step?.explanation}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Step dots */}
        <div className="flex items-center gap-1.5 mt-3">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={cn(
                "size-1.5 rounded-full transition-all duration-200",
                i === currentStep
                  ? "bg-blue-400 w-4"
                  : i < currentStep
                    ? "bg-zinc-500"
                    : "bg-zinc-700"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
