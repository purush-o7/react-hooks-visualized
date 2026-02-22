"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { BrokenDJ } from "./_components/broken-dj";
import { FixedDJ } from "./_components/fixed-dj";
import { DependencyGuideDJ } from "./_components/dependency-guide-dj";
import { PlaygroundNowPlaying } from "./_components/playground-now-playing";
import { PlaygroundBeatLoop } from "./_components/playground-beat-loop";
import { PlaygroundKeyboardShortcuts } from "./_components/playground-keyboard-shortcuts";

export default function UseEffectPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useEffect</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          React renders UI. But who handles the music? Timers, subscriptions,
          events — the DJ booth of your component.
        </TextEffect>
      </div>

      {/* Section 1: The Chaotic DJ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Chaotic DJ</h2>
        <p className="text-muted-foreground">
          What happens when you drop a beat directly in the component body?
          Every render starts a new track without stopping the old one — pure
          noise.
        </p>
        <BrokenDJ />
      </section>

      <Separator />

      {/* Section 2: The Pro DJ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Pro DJ: useEffect</h2>
        <p className="text-muted-foreground">
          useEffect runs your code AFTER render, and the cleanup function stops
          the old beat before the next one plays. One clean track at a time.
        </p>
        <FixedDJ />
      </section>

      {/* Section 3: The Mixing Board */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">The Mixing Board</h2>
        <DependencyGuideDJ />
      </section>

      <Separator />

      {/* Section 4: Playground */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            useEffect connects React to the outside world — the browser tab,
            intervals, event listeners, and more. Spin these decks.
          </p>
        </div>

        <PlaygroundNowPlaying />
        <PlaygroundBeatLoop />
        <PlaygroundKeyboardShortcuts />
      </section>
    </div>
  );
}
