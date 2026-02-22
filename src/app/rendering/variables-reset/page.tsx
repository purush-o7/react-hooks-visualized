"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { ExampleVariablesReset } from "./_components/example-variables-reset";

const regularVariable = `function Counter() {
  let count = 0;          // runs every render → always 0

  function handleClick() {
    count = count + 1;    // changes the local variable...
    console.log(count);   // logs 1, 2, 3 ...
  }

  return <span>{count}</span>; // but React already read 0
}`;

const withUseState = `function Counter() {
  // React stores this OUTSIDE the function
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);  // tells React → schedule re-render
  }

  return <span>{count}</span>; // shows the latest value
}`;

export default function VariablesResetPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Variables Reset Every Render</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Regular variables are created and destroyed on every render. This is
          the #1 gotcha for React beginners.
        </TextEffect>
      </div>

      {/* ── The Problem ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Problem</h2>
        <p className="text-muted-foreground">
          When React re-renders your component, it calls your function again
          from the top. Any variable declared with{" "}
          <code className="text-foreground">let</code> or{" "}
          <code className="text-foreground">const</code> is re-created with its
          initial value. Your previous changes? Gone.
        </p>
        <CodeBlock code={regularVariable} filename="broken-counter.tsx" />
      </section>

      <Separator />

      {/* ── Interactive Demo ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">See It Break</h2>
        <p className="text-muted-foreground">
          Click the button. The display value is stuck at 0 because{" "}
          <code className="text-foreground">let count = 0</code> runs on every
          render. The actual clicks are tracked with a ref so you can see the
          difference.
        </p>
        <ExampleVariablesReset />
      </section>

      <Separator />

      {/* ── Why It Matters ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why This Matters</h2>
        <p className="text-muted-foreground">
          This is exactly why <code className="text-foreground">useState</code>{" "}
          exists. It stores the value <em>outside</em> the function so it
          survives re-renders.
        </p>
        <CodeBlock code={withUseState} filename="fixed-counter.tsx" />
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <p className="font-medium">Key takeaway:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Regular variables reset every render — don&apos;t use them for state</li>
            <li>
              <code className="text-foreground">useState</code> persists values
              across renders
            </li>
            <li>
              <code className="text-foreground">useRef</code> also persists
              values, but without triggering re-renders
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
