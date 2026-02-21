"use client";

import { useState, useCallback, memo, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const StableChild = memo(function StableChild({
  onClick,
}: {
  onClick: () => void;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="rounded-lg border p-4 text-center">
      <p className="text-sm font-medium">memo(ExpensiveChild)</p>
      <Badge className="mt-2 font-mono text-xs bg-green-600">
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

const stableCode = `function Parent() {
  const [count, setCount] = useState(0);

  // useCallback: same reference between renders!
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // Empty deps → never changes

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Parent: {count}</button>
      <ExpensiveChild onClick={handleClick} />
      {/* memo() sees the SAME function → skips re-render! */}
    </>
  );
}`;

export function StableParent() {
  const [count, setCount] = useState(0);
  const parentRenders = useRef(0);
  parentRenders.current += 1;

  // useCallback keeps the same reference
  const handleChildClick = useCallback(() => {}, []);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            STABLE
          </Badge>
          <span className="text-sm text-muted-foreground">
            Same function reference with useCallback
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

        <StableChild onClick={handleChildClick} />

        {count >= 3 && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            The child rendered only once! memo() works because the function
            reference is stable.
          </p>
        )}

        <CodeBlock code={stableCode} filename="stable-parent.tsx" />
      </div>
    </GlowCard>
  );
}
