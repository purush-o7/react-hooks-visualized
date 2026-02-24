"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { LoudShutter } from "./_components/loud-shutter";
import { SilentLens } from "./_components/silent-lens";
import { StudioBriefing } from "./_components/studio-briefing";
import { PlaygroundSubjectFocus } from "./_components/playground-subject-focus";
import { PlaygroundShotCounter } from "./_components/playground-shot-counter";
import { PlaygroundExposureTimer } from "./_components/playground-exposure-timer";

const USE_REF_MISTAKES: Mistake[] = [
  {
    title: "Using ref for values displayed in the UI",
    subtitle: "Storing render-visible data in a ref instead of state",
    filename: "form.tsx",
    wrongCode: `function Form() {
  const nameRef = useRef("");

  return (
    <>
      <input onChange={(e) => { nameRef.current = e.target.value; }} />
      <p>Name: {nameRef.current}</p> {/* Never updates on screen */}
    </>
  );
}`,
    rightCode: `function Form() {
  const [name, setName] = useState("");

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Name: {name}</p> {/* Updates on every keystroke */}
    </>
  );
}`,
    explanation:
      "Changing ref.current does NOT trigger a re-render. The UI will display a stale value because React has no idea the ref changed. Use useState for any value that should be reflected in the rendered output. Reserve refs for imperative handles, timer IDs, or previous-value tracking.",
  },
  {
    title: "Reading or writing ref.current during render",
    subtitle: "Mutating a ref in the component body instead of in an effect or handler",
    filename: "counter.tsx",
    wrongCode: `function Counter() {
  const countRef = useRef(0);

  // Runs on every render, doubles in Strict Mode
  countRef.current++;

  return <div>{countRef.current}</div>;
}`,
    rightCode: `function Counter() {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current++; // safe: runs after render
  });

  return <div>{countRef.current}</div>;
}`,
    explanation:
      "Mutating a ref during render violates React's expectation that render functions are pure. In Concurrent Mode, React can invoke your render function multiple times. In Strict Mode, it intentionally renders twice. Only read/write ref.current inside useEffect, useLayoutEffect, or event handlers.",
  },
  {
    title: "Accessing a DOM ref before mount",
    subtitle: "Trying to read ref.current during the render phase",
    filename: "box.tsx",
    wrongCode: `function Box() {
  const boxRef = useRef(null);

  // ref is null during render — DOM doesn't exist yet
  const height = boxRef.current?.offsetHeight; // always 0

  return <div ref={boxRef}>Content (height: {height})</div>;
}`,
    rightCode: `function Box() {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setHeight(boxRef.current.offsetHeight);
    }
  }, []);

  return <div ref={boxRef}>Content (height: {height})</div>;
}`,
    explanation:
      "During the render phase, the DOM node hasn't been created yet — ref.current is null until React attaches the node after mount. Read DOM refs inside useLayoutEffect (for synchronous measurements before paint) or useEffect (for non-urgent reads).",
  },
];

export default function UseRefPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useRef</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          The silent lens that remembers every setting without firing the
          shutter.
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>📷</span> Theme: Photography Studio
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a photography studio. useState is a loud shutter
            &mdash; every shot echoes through the gallery (triggers a
            re-render). useRef is the photographer&apos;s private notebook: it
            silently records shot counts, timer IDs, and exposure settings
            without disturbing the gallery. It can also point the lens at any
            DOM element.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Problem — Loud Shutter */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Loud Shutter</h2>
          <p className="text-muted-foreground">
            useState remembers values — but every change fires the shutter and
            disturbs the entire gallery. Sometimes that&apos;s way too loud.
          </p>
          <LoudShutter />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: The Solution — Silent Lens */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Silent Lens</h2>
          <p className="text-muted-foreground">
            useRef is the photographer&apos;s silent lens — it adjusts settings
            and remembers values without ever firing the shutter or disturbing
            the gallery.
          </p>
          <SilentLens />
        </section>
      </ScrollReveal>

      {/* Section 3: Studio Briefing */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Studio Briefing</h2>
          <StudioBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useRef has two superpowers: pointing the lens at DOM elements
              directly, and storing mutable values silently between shots. Try
              these examples.
            </p>
          </div>

          <PlaygroundSubjectFocus />
          <PlaygroundShotCounter />
          <PlaygroundExposureTimer />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_REF_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
