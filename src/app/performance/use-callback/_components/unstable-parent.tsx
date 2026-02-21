"use client";

import { useState, memo, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const ExpensiveChild = memo(function ExpensiveChild({
  onClick,
}: {
  onClick: () => void;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [flash, setFlash] = useState(false);

  // Flash on render
  if (!flash && renderCount.current > 1) {
    setTimeout(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }, 0);
  }

  return (
    <div
      className="rounded-lg border p-4 text-center transition-colors duration-300"
      style={{ backgroundColor: flash ? "rgba(239, 68, 68, 0.15)" : "transparent" }}
    >
      <p className="text-sm font-medium">memo(ExpensiveChild)</p>
      <Badge variant="destructive" className="mt-2 font-mono text-xs">
        renders: {renderCount.current}
      </Badge>
      <Button
        variant="outline"
        size="sm"
        className="mt-2 block mx-auto"
        onClick={onClick}
      >
        Child Action
      </Button>
    </div>
  );
});

const unstableCode = `const ExpensiveChild = memo(({ onClick }) => {
  // memo() should prevent re-renders if props haven't changed...
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // NEW function created every render → new reference!
  const handleClick = () => console.log("clicked");
  // memo() sees a "new" prop and re-renders the child anyway

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Parent: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </>
  );
}`;

export function UnstableParent() {
  const [count, setCount] = useState(0);
  const parentRenders = useRef(0);
  parentRenders.current += 1;

  // New function every render — breaks memo!
  const handleChildClick = () => {};

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            WASTEFUL
          </Badge>
          <span className="text-sm text-muted-foreground">
            New function reference every render
          </span>
        </div>

        <div className="text-center space-y-2">
          <Button onClick={() => setCount((c) => c + 1)}>
            Parent Counter: {count}
          </Button>
          <p className="text-xs text-muted-foreground">
            Parent renders: {parentRenders.current}
          </p>
        </div>

        <ExpensiveChild onClick={handleChildClick} />

        {count >= 3 && (
          <p className="text-center text-sm text-red-500">
            The child re-renders every time — even though we used memo()!
            The function reference changes on every parent render.
          </p>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why doesn&apos;t memo() help here?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                <code>memo()</code> compares props by reference. Every render
                creates a NEW function object, so <code>handleClick !== handleClick</code>{" "}
                from the previous render.
              </p>
              <p className="font-medium text-foreground">
                We need to keep the same function reference between renders.
              </p>
              <CodeBlock code={unstableCode} filename="unstable-parent.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
