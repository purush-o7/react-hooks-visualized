"use client";

import { useState, useCallback, memo, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Phone, User } from "lucide-react";

const ContactList = memo(function ContactList({
  onDial,
}: {
  onDial: () => void;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="rounded-lg border border-green-500/20 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Contact List (memo)
        </p>
        <Badge className="bg-green-600 font-mono text-xs">
          re-renders: {renderCount.current}
        </Badge>
      </div>
      <div className="space-y-2">
        {["Alice", "Bob", "Charlie"].map((name) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-md bg-zinc-800 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <User className="size-3.5 text-muted-foreground" />
              <span className="text-sm">{name}</span>
            </div>
            <button
              onClick={onDial}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              <Phone className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

const speedDialCode = `function PhoneApp() {
  const [screenRefreshes, setScreenRefreshes] = useState(0);

  // Same function reference across renders!
  const handleDial = useCallback(() => {
    console.log("Dialing...");
  }, []); // Empty deps = never changes

  return (
    <>
      <button onClick={() => setScreenRefreshes(c => c + 1)}>
        Refresh Screen
      </button>
      {/* memo() works! handleDial is the SAME reference */}
      <ContactList onDial={handleDial} />
    </>
  );
}

const ContactList = memo(({ onDial }) => {
  // Only re-renders if onDial actually changes!
  return <button onClick={onDial}>Dial</button>;
});`;

export function SpeedDial() {
  const [count, setCount] = useState(0);
  const parentRenders = useRef(0);
  parentRenders.current += 1;

  const handleDial = useCallback(() => {
    console.log("Dialing...");
  }, []);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#3b82f6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            SPEED DIAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            useCallback = permanent button serial
          </span>
        </div>

        {/* Phone Screen */}
        <div className="rounded-xl border border-green-500/20 bg-zinc-900 p-5 space-y-4">
          {/* Parent Section */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Phone App
            </p>
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">Screen refreshes</p>
              <div className="text-4xl font-mono font-bold">{count}</div>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setCount((c) => c + 1)}
              >
                Refresh Screen
              </Button>
              <p className="text-xs text-muted-foreground">
                handleDial stays the same across renders
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5" />

          {/* Child Section */}
          <ContactList onDial={handleDial} />
        </div>

        {count >= 3 && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            The contact list stayed still! Same speed dial button → memo knows
            nothing changed.
          </p>
        )}

        <CodeBlock code={speedDialCode} filename="speed-dial.tsx" />
      </div>
    </GlowCard>
  );
}
