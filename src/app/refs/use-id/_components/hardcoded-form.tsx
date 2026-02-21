"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function HardcodedEmailField({ label }: { label: string }) {
  const [value, setValue] = useState("");
  const [wasFocused, setWasFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor="email"
        className="text-sm font-medium cursor-pointer hover:underline"
      >
        {label}
      </label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setWasFocused(true)}
        className={wasFocused ? "ring-2 ring-red-500/50" : ""}
      />
      {wasFocused && (
        <p className="text-xs text-red-500">This input was focused!</p>
      )}
    </div>
  );
}

const collisionCode = `function EmailField() {
  // Hardcoded ID — same for every instance!
  return (
    <>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </>
  );
}

// Rendering TWO instances:
<EmailField />  {/* id="email" */}
<EmailField />  {/* id="email" — COLLISION! */}

// Clicking the second label focuses the FIRST input
// because both share id="email"`;

export function HardcodedForm() {
  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            COLLISION
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Both use id=&quot;email&quot;
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Click the <strong>&quot;Form B&quot;</strong> label — it focuses
          Form A&apos;s input instead!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-4 space-y-3">
            <Badge variant="outline" className="text-xs">Form A</Badge>
            <HardcodedEmailField label="Email (Form A)" />
          </div>
          <div className="rounded-lg border border-red-500/30 p-4 space-y-3">
            <Badge variant="outline" className="text-xs border-red-500/30 text-red-500">
              Form B
            </Badge>
            <HardcodedEmailField label="Email (Form B)" />
          </div>
        </div>

        <p className="text-sm text-red-500 font-medium">
          Both labels point to id=&quot;email&quot; — the browser always picks the
          first match!
        </p>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why do hardcoded IDs break?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                HTML IDs must be unique within a page. When two elements share
                the same ID, htmlFor and getElementById always find the first
                one. This breaks labels, aria-describedby, and causes SSR
                hydration mismatches.
              </p>
              <p className="font-medium text-foreground">
                We need each component instance to generate its own unique ID
                automatically.
              </p>
              <CodeBlock code={collisionCode} filename="hardcoded-form.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
