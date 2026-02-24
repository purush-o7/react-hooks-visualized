"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { DeadSwitchboard } from "./_components/dead-switchboard";
import { LiveSwitchboard } from "./_components/live-switchboard";
import { SwitchboardBriefing } from "./_components/switchboard-briefing";
import { PlaygroundLineToggle } from "./_components/playground-line-toggle";
import { PlaygroundFrequencyTuner } from "./_components/playground-frequency-tuner";
import { PlaygroundCallRouter } from "./_components/playground-call-router";
import { PlaygroundLazyInit } from "./_components/playground-lazy-init";

const USE_STATE_MISTAKES: Mistake[] = [
  {
    title: "Mutating state directly",
    subtitle: "Editing the state object in place without calling the setter",
    filename: "counter.tsx",
    wrongCode: `function Profile() {
  const [user, setUser] = useState({ name: "Alice", score: 0 });

  function handleClick() {
    user.score += 1;      // mutating the existing object
    setUser(user);        // same reference — React bails out
  }

  return <button onClick={handleClick}>{user.score}</button>;
}`,
    rightCode: `function Profile() {
  const [user, setUser] = useState({ name: "Alice", score: 0 });

  function handleClick() {
    setUser({ ...user, score: user.score + 1 }); // new object
  }

  return <button onClick={handleClick}>{user.score}</button>;
}`,
    explanation:
      "React uses Object.is() to compare previous and next state. If you mutate the existing object and pass it back, the reference is identical so React skips the re-render entirely. Always produce a new object via spread or array methods.",
  },
  {
    title: "Stale state in batched updates",
    subtitle: "Multiple setState calls reading the same stale snapshot",
    filename: "counter.tsx",
    wrongCode: `function Counter() {
  const [count, setCount] = useState(0);

  function handleTripleClick() {
    setCount(count + 1); // all three read the same count
    setCount(count + 1);
    setCount(count + 1); // result: 1, not 3
  }

  return <button onClick={handleTripleClick}>{count}</button>;
}`,
    rightCode: `function Counter() {
  const [count, setCount] = useState(0);

  function handleTripleClick() {
    setCount(c => c + 1); // each reads the latest queued value
    setCount(c => c + 1);
    setCount(c => c + 1); // result: 3
  }

  return <button onClick={handleTripleClick}>{count}</button>;
}`,
    explanation:
      "When you call the setter multiple times in the same event handler, each call captures the same state snapshot from that render. Use the functional updater form setState(prev => prev + 1) so each call receives the latest queued value.",
  },
  {
    title: "Expensive initializer runs every render",
    subtitle: "Passing an expression instead of a function to useState",
    filename: "list.tsx",
    wrongCode: `function SortedList({ items }) {
  // items.sort() runs on EVERY render
  // even though React ignores the result after mount
  const [sorted, setSorted] = useState(items.slice().sort());

  return <ul>{sorted.map(i => <li key={i}>{i}</li>)}</ul>;
}`,
    rightCode: `function SortedList({ items }) {
  // Arrow function — expensive work only runs once on mount
  const [sorted, setSorted] = useState(
    () => items.slice().sort()
  );

  return <ul>{sorted.map(i => <li key={i}>{i}</li>)}</ul>;
}`,
    explanation:
      "The initial value argument to useState is evaluated on every render, but React only uses it once — on mount. If you pass an expensive expression like items.sort(), it still runs every time. Wrap it in an arrow function to defer execution to mount only.",
  },
];

export default function UseStatePage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useState</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Think of useState as a telephone switchboard. Each line is a state
          variable — plug in a cable and the board lights up, React re-renders.
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🔌</span> Theme: Telephone Switchboard
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a telephone switchboard. State values are
            connections &mdash; plug one in and the board lights up
            (re-renders). Without useState, you can move cables around all day,
            but the board stays dead. setState is the act of plugging a cable
            into a jack React can see.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: Dead Switchboard — the broken "before" */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Dead Switchboard</h2>
          <p className="text-muted-foreground">
            Regular variables are like cables plugged into a switchboard that
            isn&apos;t powered. The value changes behind the scenes, but React
            never sees it — the display stays frozen.
          </p>
          <DeadSwitchboard />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: Live Switchboard — the "after" with useState */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Live Switchboard</h2>
          <p className="text-muted-foreground">
            useState wires the board to React. Every time you plug in a cable,
            React sees the connection change and re-renders the display
            immediately.
          </p>
          <LiveSwitchboard />
        </section>
      </ScrollReveal>

      {/* Section 3: Briefing — side-by-side comparison */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Operator Briefing</h2>
          <SwitchboardBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">The Switchboard Floor</h2>
            <p className="text-muted-foreground">
              State isn&apos;t always a single line — booleans, numbers, and
              objects are all fair game. Each playground below demonstrates a
              different type of connection on the board.
            </p>
          </div>

          <PlaygroundLineToggle />
          <PlaygroundFrequencyTuner />
          <PlaygroundCallRouter />
          <PlaygroundLazyInit />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_STATE_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
