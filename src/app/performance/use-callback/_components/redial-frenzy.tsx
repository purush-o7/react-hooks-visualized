"use client";

import { useState, memo, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Phone, User } from "lucide-react";

const ContactList = memo(function ContactList({
  onDial,
}: {
  onDial: () => void;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [flash, setFlash] = useState(false);

  if (!flash && renderCount.current > 1) {
    setTimeout(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }, 0);
  }

  return (
    <div
      className="rounded-lg border border-white/10 p-4 space-y-3 transition-colors duration-300"
      style={{
        backgroundColor: flash ? "rgba(239, 68, 68, 0.15)" : "transparent",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Contact List (memo)
        </p>
        <Badge variant="destructive" className="font-mono text-xs">
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

const frenzyCode = `function PhoneApp() {
  const [screenRefreshes, setScreenRefreshes] = useState(0);

  // New function created every render!
  const handleDial = () => {
    console.log("Dialing...");
  };

  return (
    <>
      <button onClick={() => setScreenRefreshes(c => c + 1)}>
        Refresh Screen
      </button>
      {/* memo() can't help — handleDial is a NEW function */}
      <ContactList onDial={handleDial} />
    </>
  );
}

const ContactList = memo(({ onDial }) => {
  // Re-renders every time because onDial reference changed!
  return <button onClick={onDial}>Dial</button>;
});`;

export function RedialFrenzy() {
  const [count, setCount] = useState(0);
  const parentRenders = useRef(0);
  parentRenders.current += 1;

  const handleDial = () => {
    console.log("Dialing...");
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            REDIAL FRENZY
          </Badge>
          <span className="text-sm text-muted-foreground">
            Inline function = new button serial every render
          </span>
        </div>

        {/* Phone Screen */}
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-5 space-y-4">
          {/* Parent Section */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Phone App
            </p>
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">Screen refreshes</p>
              <div className="text-4xl font-mono font-bold">{count}</div>
              <Button
                variant="outline"
                onClick={() => setCount((c) => c + 1)}
              >
                Refresh Screen
              </Button>
              <p className="text-xs text-muted-foreground">
                Each refresh creates a new handleDial function
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5" />

          {/* Child Section */}
          <ContactList onDial={handleDial} />
        </div>

        {count >= 3 && (
          <p className="text-center text-sm text-red-500">
            The contact list re-renders every time! The phone engraves a new
            dial button each refresh, so memo thinks the contacts changed.
          </p>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why doesn&apos;t memo() stop the re-renders?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                <code>memo()</code> compares props by reference. Every render
                creates a NEW function object, so{" "}
                <code>handleDial !== handleDial</code> from the previous render.
                The contact list sees a &quot;new&quot; button and re-checks
                everything.
              </p>
              <p className="font-medium text-foreground">
                We need to keep the same function reference between renders —
                like a permanent speed dial button.
              </p>
              <CodeBlock code={frenzyCode} filename="redial-frenzy.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
