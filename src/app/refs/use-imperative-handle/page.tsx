"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { ExposedInput } from "./_components/exposed-input";
import { ControlledInput } from "./_components/controlled-input";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundVideoPlayer } from "./_components/playground-video-player";
import { PlaygroundFormWizard } from "./_components/playground-form-wizard";

export default function UseImperativeHandlePage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useImperativeHandle</h1>
          <Badge variant="secondary">Refs</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if you could control exactly what a parent can do with your ref?
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Open Door</h2>
        <p className="text-muted-foreground">
          With a plain forwardRef, the parent gets access to the entire DOM
          node — including dangerous methods it shouldn&apos;t use.
        </p>
        <ExposedInput />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Remote Control</h2>
        <p className="text-muted-foreground">
          useImperativeHandle lets you define a curated API — the parent gets
          only the methods you explicitly expose.
        </p>
        <ControlledInput />
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
            useImperativeHandle is perfect for creating clean component APIs.
            Try these interactive examples.
          </p>
        </div>
        <PlaygroundVideoPlayer />
        <PlaygroundFormWizard />
      </section>
    </div>
  );
}
