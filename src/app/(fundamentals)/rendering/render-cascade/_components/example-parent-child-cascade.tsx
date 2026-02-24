"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function Child({ name }: { name: string }) {
  const childRenders = useRef(0);
  childRenders.current += 1;

  return (
    <div className="rounded-lg border-2 border-dashed border-purple-500/30 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-purple-400">
          &lt;Child /&gt;
        </span>
        <Badge variant="outline" className="font-mono text-xs">
          renders: {childRenders.current}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        prop: name = &quot;{name}&quot;{" "}
        <span className="text-xs">(never changes)</span>
      </p>
    </div>
  );
}

export function ExampleParentChildCascade() {
  const [count, setCount] = useState(0);
  const parentRenders = useRef(0);
  parentRenders.current += 1;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(147, 51, 234, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700">
            CASCADE
          </Badge>
          <span className="text-sm text-muted-foreground">
            Parent Renders = Child Renders
          </span>
        </div>

        {/* Parent box */}
        <div className="rounded-lg border-2 border-purple-500/50 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-300">
              &lt;Parent /&gt;
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              renders: {parentRenders.current}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount((c) => c + 1)}
            >
              Parent counter: {count}
            </Button>
          </div>

          {/* Nested child */}
          <Child name="Alice" />
        </div>

        {count >= 3 && (
          <div className="rounded-lg bg-purple-500/10 p-4 text-sm space-y-2">
            <p className="font-medium text-purple-400">
              The child re-rendered {parentRenders.current} times even though
              its props never changed!
            </p>
            <p className="text-muted-foreground">
              When a parent renders, React re-renders all its children by
              default. The child&apos;s <code className="text-foreground">name</code>{" "}
              prop stayed &quot;Alice&quot; the whole time.
            </p>
          </div>
        )}

        <Accordion>
          <AccordionItem value="fix">
            <AccordionTrigger className="text-sm font-medium">
              How do you prevent this?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Wrap the child with{" "}
                <code className="text-foreground">React.memo()</code> to skip
                re-renders when props haven&apos;t changed:
              </p>
              <pre className="rounded-lg bg-muted/50 p-3 font-mono text-xs overflow-x-auto">
{`const MemoChild = React.memo(Child);
// Now <MemoChild name="Alice" /> only
// re-renders if name actually changes.`}
              </pre>
              <p>
                You&apos;ll learn more about this in the{" "}
                <strong>Performance</strong> section with{" "}
                <code className="text-foreground">useMemo</code> and{" "}
                <code className="text-foreground">useCallback</code>.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
