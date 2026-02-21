"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { InstantPreview } from "./_components/instant-preview";
import { DeferredPreview } from "./_components/deferred-preview";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundColorGrid } from "./_components/playground-color-grid";
import { PlaygroundMarkdown } from "./_components/playground-markdown";

export default function UseDeferredValuePage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useDeferredValue</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if the expensive part could politely wait its turn?
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Impatient Preview</h2>
        <p className="text-muted-foreground">
          Without useDeferredValue, every keystroke regenerates an expensive
          visualization immediately — making the input lag.
        </p>
        <InstantPreview />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Patient Echo</h2>
        <p className="text-muted-foreground">
          useDeferredValue gives React permission to show a slightly stale
          version of the expensive output while the input stays crispy.
        </p>
        <DeferredPreview />
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
            useDeferredValue works great with any expensive derived display.
            Try these interactive examples.
          </p>
        </div>
        <PlaygroundColorGrid />
        <PlaygroundMarkdown />
      </section>
    </div>
  );
}
