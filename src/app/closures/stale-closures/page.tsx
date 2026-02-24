"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { ExampleStaleCounter } from "./_components/example-stale-counter";

const staleCode = `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // This closure captured count = 0 on first render
    setTimeout(() => {
      // Still sees count as 0, even if you clicked many times!
      console.log("Count is:", count);
    }, 3000);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}`;

const fixCode = `function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count; // always up to date

  const handleClick = () => {
    setTimeout(() => {
      // Reads the ref — always gets latest value ✅
      console.log("Count is:", countRef.current);
    }, 3000);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}`;

export default function StaleClosuresPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Stale Closures</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          A stale closure happens when a function remembers an old value that
          has since changed. This is the #1 source of bugs with React hooks.
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Stale Closure Problem</h2>
        <p className="text-muted-foreground">
          When you create a function (like a timeout callback), it captures the
          current value of variables at that moment. If the value changes later,
          the old function still sees the old value — it&apos;s reading from an
          old time capsule:
        </p>
        <CodeBlock code={staleCode} filename="stale-closure.jsx" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">See It In Action</h2>
        <p className="text-muted-foreground">
          Click the increment button several times, then watch the delayed log.
          The stale version reads the value captured at click time. The fixed
          version reads the latest value via a ref:
        </p>
        <ExampleStaleCounter />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Ref Fix</h2>
        <p className="text-muted-foreground">
          A <code className="text-foreground">useRef</code> gives you a
          mutable container that persists across renders. By writing the latest
          value to <code className="text-foreground">ref.current</code> on
          every render, your closure always has access to the latest value:
        </p>
        <CodeBlock code={fixCode} filename="ref-fix.jsx" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              A <strong>stale closure</strong> captures an old value and never
              sees the update
            </li>
            <li>
              This happens with <code className="text-foreground">setTimeout</code>,{" "}
              <code className="text-foreground">setInterval</code>, event
              listeners, and effect callbacks
            </li>
            <li>
              Fix with <code className="text-foreground">useRef</code> to
              always read the latest value
            </li>
            <li>
              Or use the <strong>functional updater</strong> form of setState:{" "}
              <code className="text-foreground">setCount(c =&gt; c + 1)</code>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
