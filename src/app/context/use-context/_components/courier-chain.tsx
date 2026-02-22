"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const agents = [
  {
    codename: "HQ",
    role: "Has the classified secret",
    isSource: true,
    isTarget: false,
    color: "#eab308",
  },
  {
    codename: "Regional Office",
    role: "Just passes the folder along",
    isSource: false,
    isTarget: false,
    color: undefined,
  },
  {
    codename: "Field Station",
    role: "Just passes the folder along",
    isSource: false,
    isTarget: false,
    color: undefined,
  },
  {
    codename: "Safe House",
    role: "Just passes the folder along",
    isSource: false,
    isTarget: false,
    color: undefined,
  },
  {
    codename: "Agent Shadow",
    role: "Actually needs the secret",
    isSource: false,
    isTarget: true,
    color: "#a855f7",
  },
];

const drillingCode = `// Secret passed through every courier...
function HQ({ secret }) {
  return <RegionalOffice secret={secret} />;
}
function RegionalOffice({ secret }) {  // doesn't use it!
  return <FieldStation secret={secret} />;
}
function FieldStation({ secret }) {     // doesn't use it!
  return <SafeHouse secret={secret} />;
}
function SafeHouse({ secret }) {        // doesn't use it!
  return <AgentShadow secret={secret} />;
}
function AgentShadow({ secret }) {
  return <span>Mission: {secret}</span>; // finally used!
}`;

export function CourierChain() {
  const [highlight, setHighlight] = useState(false);

  const exposedCount = agents.filter(
    (a) => !a.isSource && !a.isTarget
  ).length;

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            COMPROMISED
          </Badge>
          <span className="text-sm text-muted-foreground">
            Courier chain — 5 layers deep
          </span>
          {highlight && (
            <Badge variant="destructive" className="ml-auto font-mono text-xs">
              {exposedCount} exposed
            </Badge>
          )}
        </div>

        {/* Agent node chain */}
        <div className="space-y-2">
          {agents.map((agent, i) => {
            const isMiddle = !agent.isSource && !agent.isTarget;
            const exposed = highlight && isMiddle;

            return (
              <div key={agent.codename}>
                <div
                  className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-300 border ${
                    exposed
                      ? "bg-red-950/30 border-red-500"
                      : agent.color
                      ? "bg-zinc-900"
                      : "bg-zinc-900 border-white/10"
                  }`}
                  style={
                    !exposed && agent.color
                      ? { borderColor: agent.color + "60" }
                      : undefined
                  }
                >
                  <code className="font-mono text-sm font-bold shrink-0">
                    {agent.codename}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    {agent.role}
                  </span>
                  {exposed && (
                    <Badge
                      variant="destructive"
                      className="text-[10px] px-1.5 py-0 ml-auto shrink-0"
                    >
                      EXPOSED
                    </Badge>
                  )}
                </div>
                {i < agents.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <span
                      className="text-xs"
                      style={{
                        color: exposed ? "#ef4444" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      ┊ passes secret ↓
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {highlight && (
          <p className="text-center text-sm text-red-500 font-medium">
            {exposedCount} couriers exposed to classified data!
          </p>
        )}

        <div className="flex justify-center">
          <button
            className="text-sm underline text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setHighlight((h) => !h)}
          >
            {highlight ? "Hide liabilities" : "Expose Liabilities"}
          </button>
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is the courier chain dangerous?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Regional Office, Field Station, and Safe House don&apos;t need
                the secret — they just pass it to the next courier. Each
                intermediary is a liability.
              </p>
              <p>
                Change the secret format? You have to update every courier in
                the chain. Add a new piece of intel? Same problem.
              </p>
              <p className="font-medium text-foreground">
                What if HQ could broadcast directly to the field agent?
              </p>
              <CodeBlock code={drillingCode} filename="courier-chain.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
