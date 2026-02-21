"use client";

import { useState, useId } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function UniqueEmailField({ label }: { label: string }) {
  const id = useId();
  const emailId = id + "-email";
  const [value, setValue] = useState("");
  const [wasFocused, setWasFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={emailId}
        className="text-sm font-medium cursor-pointer hover:underline"
      >
        {label}
      </label>
      <Input
        id={emailId}
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setWasFocused(true)}
        className={wasFocused ? "ring-2 ring-green-500/50" : ""}
      />
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="font-mono text-[10px]">
          id=&quot;{emailId}&quot;
        </Badge>
        {wasFocused && (
          <span className="text-xs text-green-600">Correctly focused!</span>
        )}
      </div>
    </div>
  );
}

const uniqueCode = `function EmailField() {
  const id = useId();
  //         ↑ e.g. ":r1:", ":r2:", ":r3:"

  return (
    <>
      <label htmlFor={id + "-email"}>Email</label>
      <input id={id + "-email"} type="email" />
    </>
  );
}

// Two instances — each gets a unique ID!
<EmailField />  {/* id=":r1:-email" */}
<EmailField />  {/* id=":r2:-email" */}

// Labels ALWAYS focus the right input`;

export function UniqueForm() {
  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            UNIQUE
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Each instance gets its own ID
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Click any label — it focuses the correct input every time!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-green-500/20 p-4 space-y-3">
            <Badge variant="outline" className="text-xs border-green-500/30 text-green-600">
              Form A
            </Badge>
            <UniqueEmailField label="Email (Form A)" />
          </div>
          <div className="rounded-lg border border-green-500/20 p-4 space-y-3">
            <Badge variant="outline" className="text-xs border-green-500/30 text-green-600">
              Form B
            </Badge>
            <UniqueEmailField label="Email (Form B)" />
          </div>
        </div>

        <CodeBlock code={uniqueCode} filename="unique-form.tsx" />
      </div>
    </GlowCard>
  );
}
