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

function HardcodedOwnerField({ label }: { label: string }) {
  const [value, setValue] = useState("");
  const [wasFocused, setWasFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor="car-owner"
        className="text-sm font-medium cursor-pointer hover:underline"
      >
        {label}
      </label>
      <Input
        id="car-owner"
        placeholder="Enter owner name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setWasFocused(true)}
        className={wasFocused ? "ring-2 ring-red-500/50" : ""}
      />
      {wasFocused && (
        <p className="text-xs text-red-500">Wrong car retrieved!</p>
      )}
    </div>
  );
}

const collisionCode = `function OwnerField() {
  // Hardcoded ID — same for every instance!
  return (
    <>
      <label htmlFor="car-owner">Car Owner</label>
      <input id="car-owner" />
    </>
  );
}

// Two lots — both use id="car-owner"
<OwnerField />  {/* id="car-owner" */}
<OwnerField />  {/* id="car-owner" — COLLISION! */}

// Clicking Lot B's label focuses Lot A's input
// because both share id="car-owner"`;

export function NoTicketLot() {
  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            NO TICKETS
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Both use id=&quot;car-owner&quot;
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Click the <strong>&quot;Car Owner (Lot B)&quot;</strong> label — it
          focuses Lot A&apos;s input instead!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-4 space-y-3">
            <Badge variant="outline" className="text-xs">
              Lot A
            </Badge>
            <HardcodedOwnerField label="Car Owner (Lot A)" />
          </div>
          <div className="rounded-lg border border-red-500/30 p-4 space-y-3">
            <Badge
              variant="outline"
              className="text-xs border-red-500/30 text-red-500"
            >
              Lot B
            </Badge>
            <HardcodedOwnerField label="Car Owner (Lot B)" />
          </div>
        </div>

        <p className="text-sm text-red-500 font-medium">
          Both labels point to id=&quot;car-owner&quot; — the valet always grabs
          the first car in the lot!
        </p>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why do ticketless lots fail?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                HTML IDs must be unique within a page. When two elements share
                the same ID, htmlFor and getElementById always find the first
                one. This breaks labels, aria-describedby, and causes SSR
                hydration mismatches.
              </p>
              <p className="font-medium text-foreground">
                We need each car (component instance) to get its own unique
                ticket automatically.
              </p>
              <CodeBlock code={collisionCode} filename="no-ticket-lot.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
