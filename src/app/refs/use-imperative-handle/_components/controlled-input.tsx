"use client";

import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

type ControlledInputHandle = {
  focus: () => void;
  clear: () => void;
  scrollIntoView: () => void;
};

const ControlledFancyInput = forwardRef<ControlledInputHandle, { placeholder?: string }>(
  function ControlledFancyInput({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      clear() {
        if (inputRef.current) inputRef.current.value = "";
      },
      scrollIntoView() {
        inputRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    return (
      <div className="rounded-lg border-2 border-dashed border-green-500/30 p-3">
        <Input ref={inputRef} placeholder={placeholder || "Type something..."} className="border-0 bg-transparent" />
      </div>
    );
  }
);

const EXPOSED_METHODS = ["focus()", "clear()", "scrollIntoView()"];
const BLOCKED_PROPS = ["style", "innerHTML", "remove()", "setAttribute()"];

const controlledCode = `const ControlledFancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus()  { inputRef.current.focus(); },
    clear()  { inputRef.current.value = ""; },
    scrollIntoView() {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    },
  }));

  return <input ref={inputRef} />;
  //            ↑ internal ref — parent can't access it!
});

// Parent gets ONLY these 3 methods:
ref.current.focus();         // ✓ Works
ref.current.clear();         // ✓ Works
ref.current.scrollIntoView();// ✓ Works
ref.current.style;           // ✗ undefined
ref.current.remove();        // ✗ undefined`;

export function ControlledInput() {
  const inputRef = useRef<ControlledInputHandle>(null);
  const [accessLog, setAccessLog] = useState<string[]>([]);

  function logAccess(action: string) {
    setAccessLog((prev) => [...prev.slice(-4), action]);
  }

  function handleFocus() {
    inputRef.current?.focus();
    logAccess("focus() — allowed");
  }

  function handleClear() {
    inputRef.current?.clear();
    logAccess("clear() — allowed");
  }

  function handleScrollIntoView() {
    inputRef.current?.scrollIntoView();
    logAccess("scrollIntoView() — allowed");
  }

  function handleTryStyle() {
    const result = (inputRef.current as unknown as Record<string, unknown>)?.style;
    logAccess(`style → ${result === undefined ? "undefined! Blocked." : "accessible"}`);
  }

  function handleTryRemove() {
    const result = (inputRef.current as unknown as Record<string, unknown>)?.remove;
    logAccess(`remove → ${result === undefined ? "undefined! Blocked." : "accessible"}`);
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            CONTROLLED
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Curated API only
          </Badge>
        </div>

        <ControlledFancyInput ref={inputRef} placeholder="I only expose what I choose..." />

        <div className="space-y-2">
          <p className="text-sm font-medium text-green-600">Allowed methods:</p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleFocus}>
              Focus
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={handleScrollIntoView}>
              Scroll Into View
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Try accessing blocked properties:
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleTryStyle}>
              Try .style
            </Button>
            <Button variant="outline" size="sm" onClick={handleTryRemove}>
              Try .remove()
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-green-500/10 p-3">
            <p className="text-xs font-medium mb-2 text-green-600">Exposed:</p>
            <div className="flex flex-wrap gap-1.5">
              {EXPOSED_METHODS.map((m) => (
                <Badge key={m} variant="outline" className="font-mono text-[10px] border-green-500/30 text-green-600">
                  .{m}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-red-500/10 p-3">
            <p className="text-xs font-medium mb-2 text-red-500">Blocked:</p>
            <div className="flex flex-wrap gap-1.5">
              {BLOCKED_PROPS.map((p) => (
                <Badge key={p} variant="outline" className="font-mono text-[10px] border-red-500/30 text-red-500 line-through">
                  .{p}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {accessLog.length > 0 && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs font-medium mb-1">Access log:</p>
            {accessLog.map((log, i) => (
              <p key={i} className={`text-xs font-mono ${log.includes("Blocked") ? "text-green-600" : log.includes("allowed") ? "text-muted-foreground" : "text-red-500"}`}>
                {log}
              </p>
            ))}
          </div>
        )}

        <CodeBlock code={controlledCode} filename="controlled-input.tsx" />
      </div>
    </GlowCard>
  );
}
