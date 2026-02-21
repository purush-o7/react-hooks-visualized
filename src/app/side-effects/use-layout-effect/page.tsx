"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { FlickeringTooltip } from "./_components/flickering-tooltip";
import { StableTooltip } from "./_components/stable-tooltip";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundAutoScroll } from "./_components/playground-auto-scroll";
import { PlaygroundDynamicWidth } from "./_components/playground-dynamic-width";

export default function UseLayoutEffectPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useLayoutEffect</h1>
          <Badge variant="secondary">Side Effects</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if you need to measure the DOM before the user sees it?
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Flickering Tooltip</h2>
        <p className="text-muted-foreground">
          With useEffect, the tooltip renders first at a default position, then
          jumps to the correct spot after measurement — causing a visible flicker.
        </p>
        <FlickeringTooltip />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Steady Tooltip</h2>
        <p className="text-muted-foreground">
          useLayoutEffect measures the DOM synchronously before the browser
          paints — so the tooltip appears in the right place immediately.
        </p>
        <StableTooltip />
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
            useLayoutEffect is essential when you need DOM measurements before
            paint. Try these interactive examples.
          </p>
        </div>
        <PlaygroundAutoScroll />
        <PlaygroundDynamicWidth />
      </section>
    </div>
  );
}
