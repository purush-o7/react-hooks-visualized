"use client";

import { useState, useId } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function TicketedOwnerField({ label }: { label: string }) {
  const id = useId();
  const ownerId = id + "-car-owner";
  const [value, setValue] = useState("");
  const [wasFocused, setWasFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={ownerId}
        className="text-sm font-medium cursor-pointer hover:underline"
      >
        {label}
      </label>
      <Input
        id={ownerId}
        placeholder="Enter owner name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setWasFocused(true)}
        className={wasFocused ? "ring-2 ring-green-500/50" : ""}
      />
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="font-mono text-[10px] text-amber-600 border-amber-600/30"
        >
          id=&quot;{ownerId}&quot;
        </Badge>
        {wasFocused && (
          <span className="text-xs text-green-600">
            Correct car retrieved!
          </span>
        )}
      </div>
    </div>
  );
}

const ticketCode = `function OwnerField() {
  const id = useId();
  //         ↑ e.g. ":r1:", ":r2:", ":r3:"

  return (
    <>
      <label htmlFor={id + "-car-owner"}>Car Owner</label>
      <input id={id + "-car-owner"} />
    </>
  );
}

// Two lots — each gets a unique ticket!
<OwnerField />  {/* id=":r1:-car-owner" */}
<OwnerField />  {/* id=":r2:-car-owner" */}

// Labels ALWAYS retrieve the right car`;

export function TicketPrinter() {
  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#d97706" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            TICKET SYSTEM
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Each lot gets its own ticket
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Click any label — it focuses the correct input every time!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-green-500/20 p-4 space-y-3">
            <Badge
              variant="outline"
              className="text-xs border-green-500/30 text-green-600"
            >
              Lot A
            </Badge>
            <TicketedOwnerField label="Car Owner (Lot A)" />
          </div>
          <div className="rounded-lg border border-green-500/20 p-4 space-y-3">
            <Badge
              variant="outline"
              className="text-xs border-green-500/30 text-green-600"
            >
              Lot B
            </Badge>
            <TicketedOwnerField label="Car Owner (Lot B)" />
          </div>
        </div>

        <CodeBlock code={ticketCode} filename="ticket-printer.tsx" />
      </div>
    </GlowCard>
  );
}
