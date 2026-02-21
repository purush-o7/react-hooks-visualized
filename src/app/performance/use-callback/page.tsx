"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { UnstableParent } from "./_components/unstable-parent";
import { StableParent } from "./_components/stable-parent";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundRenderTracker } from "./_components/playground-render-tracker";
import { PlaygroundWhenToUse } from "./_components/playground-when-to-use";

export default function UseCallbackPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useCallback</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Why do your child components keep re-rendering for no reason?
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Wasteful Way</h2>
        <p className="text-muted-foreground">
          Every render creates a new function object. Even memo&apos;d children
          see &quot;new&quot; props and re-render.
        </p>
        <UnstableParent />
      </section>

      <Separator />

      {/* Section 2: The Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: useCallback</h2>
        <p className="text-muted-foreground">
          useCallback keeps the same function reference between renders.
          Now memo() can actually do its job.
        </p>
        <StableParent />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Before vs After</h2>
        <BeforeAfter />
      </section>

      <Separator />

      {/* Section 3: Playground */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            See useCallback in action and learn when it actually matters.
          </p>
        </div>

        <PlaygroundRenderTracker />
        <PlaygroundWhenToUse />
      </section>
    </div>
  );
}
