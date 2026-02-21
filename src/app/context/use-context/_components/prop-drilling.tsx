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

const drillingCode = `function App() {
  const [user] = useState({ name: "Alice" });
  return <Layout user={user} />;       // pass down
}

function Layout({ user }) {
  return <Sidebar user={user} />;      // pass through (doesn't use it!)
}

function Sidebar({ user }) {
  return <UserMenu user={user} />;     // pass through (doesn't use it!)
}

function UserMenu({ user }) {
  return <Avatar user={user} />;       // finally uses it
}`;

const levels = [
  { name: "App", usesIt: true, label: "Creates the data" },
  { name: "Layout", usesIt: false, label: "Just passes it through" },
  { name: "Sidebar", usesIt: false, label: "Just passes it through" },
  { name: "UserMenu", usesIt: false, label: "Just passes it through" },
  { name: "Avatar", usesIt: true, label: "Actually uses the data" },
];

export function PropDrilling() {
  const [highlight, setHighlight] = useState(false);

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            TEDIOUS
          </Badge>
          <span className="text-sm text-muted-foreground">
            Prop drilling through 5 layers
          </span>
        </div>

        {/* Visual tree */}
        <div className="space-y-1">
          {levels.map((level, i) => (
            <div
              key={level.name}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors"
              style={{
                paddingLeft: `${i * 24 + 8}px`,
                backgroundColor:
                  highlight && !level.usesIt
                    ? "rgba(239, 68, 68, 0.1)"
                    : "transparent",
              }}
            >
              <code className="font-mono text-sm font-bold">
                {level.name}
              </code>
              <span className="text-xs text-muted-foreground">
                {level.label}
              </span>
              {!level.usesIt && highlight && (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                  wasted prop
                </Badge>
              )}
              {i < levels.length - 1 && (
                <span className="text-xs text-muted-foreground ml-auto">
                  → passes <code>user</code> down
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className="text-sm underline text-muted-foreground hover:text-foreground"
            onClick={() => setHighlight((h) => !h)}
          >
            {highlight
              ? "Hide wasted props"
              : "Highlight components that don't use the prop"}
          </button>
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is prop drilling painful?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Layout, Sidebar, and UserMenu don&apos;t use <code>user</code> at
                all — they just pass it to the next child. Add more layers and
                it gets worse.
              </p>
              <p>
                Rename the prop? You have to update every component in the
                chain. Add a new field? Same thing.
              </p>
              <p className="font-medium text-foreground">
                What if we could &quot;teleport&quot; data directly to where
                it&apos;s needed?
              </p>
              <CodeBlock code={drillingCode} filename="prop-drilling.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
