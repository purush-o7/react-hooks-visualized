"use client";

import { useState, useCallback } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse] as const;
}

const hookCode = `// Custom Hook — extract once, use everywhere!
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse] as const;
}

// Component 1:
const [darkMode, toggleDark] = useToggle(false);  // 1 line!

// Component 2:
const [modal, toggleModal] = useToggle(false);     // 1 line!`;

export function ExtractedHook() {
  const [darkMode, toggleDark] = useToggle(false);
  const [modal, toggleModal] = useToggle(false);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            REUSABLE
          </Badge>
          <span className="text-sm text-muted-foreground">
            One hook, used in both places
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 text-center space-y-2">
            <p className="text-sm font-medium">DarkMode Toggle</p>
            <div className="text-2xl">{darkMode ? "🌙" : "☀️"}</div>
            <Button variant="outline" size="sm" onClick={toggleDark}>
              {darkMode ? "Dark" : "Light"}
            </Button>
            <p className="text-[10px] text-green-500 font-mono">
              useToggle(false)
            </p>
          </div>

          <div className="rounded-lg border p-4 text-center space-y-2">
            <p className="text-sm font-medium">Modal Toggle</p>
            <div className="text-2xl">{modal ? "📭" : "📬"}</div>
            <Button variant="outline" size="sm" onClick={toggleModal}>
              {modal ? "Close" : "Open"}
            </Button>
            <p className="text-[10px] text-green-500 font-mono">
              useToggle(false)
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-green-600 dark:text-green-400">
          Both use the same hook — one line each. Add features to the hook,
          all consumers get them!
        </p>

        <CodeBlock code={hookCode} filename="use-toggle.tsx" />
      </div>
    </GlowCard>
  );
}
