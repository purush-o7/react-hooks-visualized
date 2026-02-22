"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { motion } from "motion/react";

const KEYS = [
  { key: " ", label: "Space", display: "Space", width: "w-20" },
  { key: "1", label: "Kick", display: "1", width: "w-10" },
  { key: "2", label: "Snare", display: "2", width: "w-10" },
  { key: "3", label: "Hi-hat", display: "3", width: "w-10" },
  { key: "ArrowUp", label: "Vol +", display: "↑", width: "w-10" },
  { key: "ArrowDown", label: "Vol −", display: "↓", width: "w-10" },
];

const code = `useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    setLastKey(e.key);
    setCount(c => c + 1);
  }

  window.addEventListener("keydown", handleKeyDown);

  // Cleanup: remove on unmount
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []); // Empty array = mount only, one listener`;

export function PlaygroundKeyboardShortcuts() {
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [keyCount, setKeyCount] = useState(0);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const pressed = e.key;
      setLastKey(pressed);
      setActiveKey(pressed);
      setKeyCount((c) => c + 1);
      setFlashKey((k) => k + 1);

      setTimeout(() => setActiveKey(null), 200);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎹</span>
          DJ Keyboard
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Event Listener
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Press any key — the listener was added once on mount and removed on
          unmount. Always exactly 1 listener.
        </p>

        {/* Keyboard Diagram */}
        <div className="flex flex-wrap justify-center gap-2 py-2">
          {KEYS.map((k) => (
            <div
              key={k.key}
              className={`${k.width} h-10 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${
                activeKey === k.key
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-zinc-700 bg-zinc-800/50"
              }`}
            >
              <span
                className={`text-xs font-mono font-bold ${
                  activeKey === k.key
                    ? "text-purple-400"
                    : "text-muted-foreground"
                }`}
              >
                {k.display}
              </span>
              <span className="text-[9px] text-muted-foreground">
                {k.label}
              </span>
            </div>
          ))}
        </div>

        {/* Last Key Pressed */}
        <div className="flex justify-center">
          {lastKey !== null ? (
            <motion.div
              key={flashKey}
              initial={{ scale: 1.4, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="rounded-lg bg-purple-500/10 border border-purple-500/30 px-4 py-2 text-center"
            >
              <p className="text-xs text-muted-foreground">Last key</p>
              <p className="text-lg font-mono font-bold text-purple-400">
                {lastKey === " " ? "Space" : lastKey}
              </p>
            </motion.div>
          ) : (
            <div className="rounded-lg bg-muted/50 px-4 py-2 text-center">
              <p className="text-sm text-muted-foreground">
                Press any key...
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Keys pressed</p>
            <p className="text-xl font-mono font-bold">{keyCount}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Active listeners
            </p>
            <p className="text-xl font-mono font-bold text-green-500">1</p>
          </div>
        </div>

        <CodeBlock code={code} filename="dj-keyboard.tsx" />
      </CardContent>
    </Card>
  );
}
