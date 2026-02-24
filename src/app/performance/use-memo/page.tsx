"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { SlowBuilder } from "./_components/slow-builder";
import { FastBuilder } from "./_components/fast-builder";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundTower } from "./_components/playground-tower";
import { PlaygroundPattern } from "./_components/playground-pattern";
import { PlaygroundInventory } from "./_components/playground-inventory";

const USE_MEMO_MISTAKES: Mistake[] = [
  {
    title: "Memoizing cheap calculations",
    subtitle: "Wrapping trivial operations like string concatenation in useMemo",
    filename: "profile.tsx",
    wrongCode: `function Profile({ firstName, lastName }) {
  // useMemo overhead > the concatenation itself
  const fullName = useMemo(() => {
    return \`\${firstName} \${lastName}\`;
  }, [firstName, lastName]);

  return <h1>{fullName}</h1>;
}`,
    rightCode: `function Profile({ firstName, lastName }) {
  // Just compute it — no memoization needed
  const fullName = \`\${firstName} \${lastName}\`;

  return <h1>{fullName}</h1>;
}`,
    explanation:
      "useMemo has overhead — it stores the cached value, stores the dependency array, and runs a shallow comparison on every render. If the computation is cheaper than the memoization overhead, you've made your app slower. Only memoize genuinely expensive computations (large array filtering, complex sorting, etc).",
  },
  {
    title: "Missing dependencies (stale values)",
    subtitle: "Omitting variables from the dependency array to 'prevent re-runs'",
    filename: "pricing.tsx",
    wrongCode: `function PriceList({ items }) {
  const [discount, setDiscount] = useState(0.1);

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * (1 - discount), 0);
  }, [items]); // discount is missing — total uses stale discount

  return <div>Total: {total}</div>;
}`,
    rightCode: `function PriceList({ items }) {
  const [discount, setDiscount] = useState(0.1);

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * (1 - discount), 0);
  }, [items, discount]); // all dependencies listed

  return <div>Total: {total}</div>;
}`,
    explanation:
      "useMemo captures values via closure. If a dependency is missing, the cached result uses stale values from a previous render. Include every variable used inside the callback in the dependency array. Enable the react-hooks/exhaustive-deps ESLint rule to catch these automatically.",
  },
  {
    title: "Unstable references in the dependency array",
    subtitle: "Default parameter values or inline objects that create new references every render",
    filename: "product-list.tsx",
    wrongCode: `// Default [] creates a new array every render
function ProductList({ filters = [] }) {
  const results = useMemo(() => {
    return products.filter(p => applyFilters(p, filters));
  }, [filters]); // re-runs EVERY render — new [] each time

  return <div>{results.length} products</div>;
}`,
    rightCode: `const EMPTY_FILTERS = []; // stable reference

function ProductList({ filters = EMPTY_FILTERS }) {
  const results = useMemo(() => {
    return products.filter(p => applyFilters(p, filters));
  }, [filters]); // now stable when no filters passed

  return <div>{results.length} products</div>;
}`,
    explanation:
      "React uses Object.is (reference equality) to compare dependencies. A new object {} or array [] is never equal to the previous one — even with identical contents. This silently defeats memoization. Stabilize default values with a module-level constant, or depend on primitive values instead.",
  },
];

export default function UseMemoPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useMemo</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if React tore down your Lego creation on every single render?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🧱</span> Theme: Lego Builder
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a Lego workbench. Every render, the builder tears
            down the previous creation and rebuilds from scratch &mdash; even
            when the instructions haven&apos;t changed. useMemo is a display
            shelf: once you build a tower, you place it on the shelf and only
            rebuild when the instructions (dependencies) actually change.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Problem */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Forgetful Builder</h2>
          <p className="text-muted-foreground">
            Without useMemo, expensive work runs on every render — even when the
            result would be exactly the same.
          </p>
          <SlowBuilder />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Solution */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Smart Builder</h2>
          <p className="text-muted-foreground">
            useMemo caches the tower and only rebuilds when the instructions
            (height, color) change. Unrelated changes grab the cached version
            instantly.
          </p>
          <FastBuilder />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Before vs After</h2>
          <BeforeAfter />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 3: Playground */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useMemo works for any derived data — costs, patterns, statistics.
              Try these Lego-themed examples.
            </p>
          </div>

          <PlaygroundTower />
          <PlaygroundPattern />
          <PlaygroundInventory />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_MEMO_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
