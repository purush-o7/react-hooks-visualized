"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ExamplePotteryShelf } from "./_components/example-pottery-shelf";

const addCode = `// MUTATING (don't do this in React)
items.push(newItem);

// IMMUTABLE (correct for React state)
setItems([...items, newItem]);       // add to end
setItems([newItem, ...items]);       // add to start`;

const removeCode = `// MUTATING (don't do this in React)
items.splice(index, 1);

// IMMUTABLE (correct for React state)
setItems(items.filter((_, i) => i !== index));
// or by ID:
setItems(items.filter(item => item.id !== targetId));`;

const updateCode = `// MUTATING (don't do this in React)
items[index].name = "New Name";

// IMMUTABLE (correct for React state)
setItems(items.map((item, i) =>
  i === index ? { ...item, name: "New Name" } : item
));
// or by ID:
setItems(items.map(item =>
  item.id === targetId ? { ...item, name: "New Name" } : item
));`;

export default function ArrayOperationsPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Array Operations</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Replace push, splice, and direct assignment with immutable patterns.
          These are the exact patterns you will use with React state every day.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Add Items</h2>
          <p className="text-muted-foreground">
            Use the spread operator to create a new array with the additional
            item:
          </p>
          <CodeBlock code={addCode} filename="immutable-add.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Remove Items</h2>
          <p className="text-muted-foreground">
            Use <code className="text-foreground">filter</code> to create a new
            array without the target item:
          </p>
          <CodeBlock code={removeCode} filename="immutable-remove.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Update Items</h2>
          <p className="text-muted-foreground">
            Use <code className="text-foreground">map</code> to create a new
            array where the target item is replaced with a new object:
          </p>
          <CodeBlock code={updateCode} filename="immutable-update.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Pottery Shelf</h2>
          <p className="text-muted-foreground">
            Practice all three operations on a shelf of pottery. Every action
            creates a new array — watch the reference change:
          </p>
          <ExamplePotteryShelf />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
          <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Mutating (avoid)</div>
              <div className="font-medium">Immutable (use this)</div>
              <code className="text-red-400">push(item)</code>
              <code className="text-green-400">[...arr, item]</code>
              <code className="text-red-400">splice(i, 1)</code>
              <code className="text-green-400">
                filter((_, i) =&gt; i !== idx)
              </code>
              <code className="text-red-400">arr[i].x = y</code>
              <code className="text-green-400">map(item =&gt; ...)</code>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
