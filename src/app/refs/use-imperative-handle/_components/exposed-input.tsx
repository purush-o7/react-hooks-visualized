"use client";

import { useRef, forwardRef, useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FancyInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  function FancyInput({ placeholder }, ref) {
    return (
      <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-3">
        <Input ref={ref} placeholder={placeholder || "Type something..."} className="border-0 bg-transparent" />
      </div>
    );
  }
);

const DANGEROUS_PROPS = [
  "style", "innerHTML", "remove()", "setAttribute()",
  "classList", "parentNode", "childNodes", "outerHTML",
];

const exposedCode = `const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} />;
  //            ↑ raw DOM node exposed!
});

// Parent gets EVERYTHING:
const ref = useRef(null);
ref.current.focus();        // OK
ref.current.value = "";     // OK
ref.current.style.color = "red";  // Yikes!
ref.current.remove();       // DANGER!
ref.current.innerHTML = ""; // DANGER!`;

export function ExposedInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [accessLog, setAccessLog] = useState<string[]>([]);

  function logAccess(action: string) {
    setAccessLog((prev) => [...prev.slice(-4), action]);
  }

  function handleFocus() {
    inputRef.current?.focus();
    logAccess("focus() — OK, intended");
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
      logAccess("value = '' — OK, intended");
    }
  }

  function handleDangerousStyle() {
    if (inputRef.current) {
      inputRef.current.style.backgroundColor = "#fee2e2";
      inputRef.current.style.borderRadius = "0";
      logAccess("style.backgroundColor = red — UNINTENDED!");
    }
  }

  function handleDangerousAttribute() {
    if (inputRef.current) {
      inputRef.current.setAttribute("data-hacked", "true");
      logAccess('setAttribute("data-hacked") — UNINTENDED!');
    }
  }

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            EXPOSED
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Full DOM access
          </Badge>
        </div>

        <FancyInput ref={inputRef} placeholder="I'm fully exposed to the parent..." />

        <div className="space-y-2">
          <p className="text-sm font-medium">Intended actions:</p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleFocus}>
              Focus
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-red-500">
            But the parent can also do this:
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-500" onClick={handleDangerousStyle}>
              Change Style
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-500" onClick={handleDangerousAttribute}>
              Set Attribute
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-red-500/10 p-3">
          <p className="text-xs font-medium mb-2">Parent can access ALL of these:</p>
          <div className="flex flex-wrap gap-1.5">
            {DANGEROUS_PROPS.map((prop) => (
              <Badge key={prop} variant="outline" className="font-mono text-[10px] border-red-500/30 text-red-500">
                .{prop}
              </Badge>
            ))}
          </div>
        </div>

        {accessLog.length > 0 && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs font-medium mb-1">Access log:</p>
            {accessLog.map((log, i) => (
              <p key={i} className={`text-xs font-mono ${log.includes("UNINTENDED") ? "text-red-500" : "text-muted-foreground"}`}>
                {log}
              </p>
            ))}
          </div>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is full DOM access a problem?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                When a component exposes its raw DOM ref, the parent can do
                anything — change styles, remove elements, modify attributes.
                This breaks encapsulation and makes the component fragile.
              </p>
              <p className="font-medium text-foreground">
                We need a way to expose only the methods the parent actually
                needs — like a remote control with specific buttons.
              </p>
              <CodeBlock code={exposedCode} filename="exposed-input.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
