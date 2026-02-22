"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { ExampleExpensiveCalculation } from "./_components/example-expensive-calculation";

const problemCode = `function ProductList({ items }) {
  const [search, setSearch] = useState("");

  // This sorts on EVERY render — even when you just type
  const sorted = [...items].sort((a, b) => a.price - b.price);

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      <ul>{sorted.map(item => <li key={item.id}>{item.name}</li>)}</ul>
    </>
  );
}`;

const fixCode = `function ProductList({ items }) {
  const [search, setSearch] = useState("");

  // Only re-sorts when items actually changes
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.price - b.price),
    [items]
  );

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      <ul>{sorted.map(item => <li key={item.id}>{item.name}</li>)}</ul>
    </>
  );
}`;

export default function ExpensiveWorkPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Expensive Calculations</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Since all code runs every render, expensive work re-runs even when its
          inputs haven&apos;t changed.
        </TextEffect>
      </div>

      {/* ── The Problem ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Problem</h2>
        <p className="text-muted-foreground">
          If you have an expensive calculation in your component — sorting a
          large array, filtering thousands of records, computing complex
          data — it runs on <em>every single render</em>, even when the
          inputs to that calculation haven&apos;t changed.
        </p>
        <CodeBlock code={problemCode} filename="expensive-sort.tsx" />
        <p className="text-sm text-muted-foreground">
          Every keystroke in the search input triggers a re-render. The sort has
          nothing to do with the search text, but it runs anyway because
          React doesn&apos;t know the difference.
        </p>
      </section>

      <Separator />

      {/* ── Interactive Demo ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Feel the Slowdown</h2>
        <p className="text-muted-foreground">
          Type in the text field below. The sort timer shows how many
          milliseconds the sort takes — even though your typing has nothing to
          do with the sort. Try increasing the list size to feel the difference.
        </p>
        <ExampleExpensiveCalculation />
      </section>

      <Separator />

      {/* ── The Fix ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: useMemo</h2>
        <p className="text-muted-foreground">
          <code className="text-foreground">useMemo</code> tells React:
          &quot;only re-run this calculation when its dependencies change.&quot;
        </p>
        <CodeBlock code={fixCode} filename="memoized-sort.tsx" />
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <p className="font-medium">When to reach for useMemo:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>The calculation is genuinely slow (measurable in ms)</li>
            <li>The result doesn&apos;t change on every render</li>
            <li>Profiling confirms it&apos;s a bottleneck</li>
          </ul>
          <p className="text-muted-foreground pt-1">
            Don&apos;t memoize everything — only what&apos;s actually
            expensive. Premature optimization adds complexity without benefit.
          </p>
        </div>
      </section>
    </div>
  );
}
