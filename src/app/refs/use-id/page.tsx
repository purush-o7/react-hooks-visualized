"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { HardcodedForm } from "./_components/hardcoded-form";
import { UniqueForm } from "./_components/unique-form";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundMultiInstance } from "./_components/playground-multi-instance";
import { PlaygroundAccessibleForm } from "./_components/playground-accessible-form";

export default function UseIdPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useId</h1>
          <Badge variant="secondary">Refs</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if two copies of the same form broke each other&apos;s labels?
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Collision</h2>
        <p className="text-muted-foreground">
          When you hardcode IDs, rendering the same component twice creates a
          collision — labels point to the wrong inputs.
        </p>
        <HardcodedForm />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Name Tag Factory</h2>
        <p className="text-muted-foreground">
          useId generates unique IDs for each component instance — no collisions,
          no matter how many copies you render.
        </p>
        <UniqueForm />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Before vs After</h2>
        <BeforeAfter />
      </section>

      <Separator />

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            useId shines for accessibility, SSR hydration, and any time you need
            stable unique identifiers. Try these examples.
          </p>
        </div>
        <PlaygroundMultiInstance />
        <PlaygroundAccessibleForm />
      </section>
    </div>
  );
}
