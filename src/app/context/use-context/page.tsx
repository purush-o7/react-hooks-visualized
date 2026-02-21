"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { PropDrilling } from "./_components/prop-drilling";
import { ContextSolution } from "./_components/context-solution";
import { ThreeStepGuide } from "./_components/three-step-guide";
import { PlaygroundTheme } from "./_components/playground-theme";
import { PlaygroundUserProfile } from "./_components/playground-user-profile";
import { PlaygroundLanguage } from "./_components/playground-language";

export default function UseContextPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useContext</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if a deeply nested component needs data from the top?
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Problem: Prop Drilling</h2>
        <p className="text-muted-foreground">
          Passing props through layers of components that don&apos;t even use
          them. The deeper the tree, the worse it gets.
        </p>
        <PropDrilling />
      </section>

      <Separator />

      {/* Section 2: The Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: useContext</h2>
        <p className="text-muted-foreground">
          Provide data at the top, consume it anywhere below. Middle layers
          stay clean.
        </p>
        <ContextSolution />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">The Three-Step Pattern</h2>
        <ThreeStepGuide />
      </section>

      <Separator />

      {/* Section 3: Playground */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            Context shines for app-wide settings like themes, user data, and
            language. Try these live examples.
          </p>
        </div>

        <PlaygroundTheme />
        <PlaygroundUserProfile />
        <PlaygroundLanguage />
      </section>
    </div>
  );
}
