"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const capsules = [
  { name: "Alice", year: 2020, message: "Hello from 2020!" },
  { name: "Bob", year: 2021, message: "Greetings from 2021!" },
  { name: "Carol", year: 2022, message: "Sealed in 2022!" },
];

export function VisualCapsuleSeal() {
  const [sealedIndex, setSealedIndex] = useState<number | null>(null);
  const [opened, setOpened] = useState(false);

  const seal = (index: number) => {
    setSealedIndex(index);
    setOpened(false);
  };

  const open = () => setOpened(true);

  const capsule = sealedIndex !== null ? capsules[sealedIndex] : null;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            Time Capsule — seal a value, open it later
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Each capsule seals a different value. Click one to create a closure,
            then open it to see what was captured:
          </p>

          <div className="flex gap-3 flex-wrap">
            {capsules.map((c, i) => (
              <Button
                key={c.name}
                variant={sealedIndex === i ? "default" : "outline"}
                onClick={() => seal(i)}
              >
                Seal {c.name}&apos;s capsule ({c.year})
              </Button>
            ))}
          </div>

          {capsule && (
            <div className="space-y-3">
              <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm space-y-1">
                <p className="text-muted-foreground">
                  {`// Closure created — captured: name="${capsule.name}", year=${capsule.year}`}
                </p>
                <p>{`const openCapsule = () => "${capsule.message}";`}</p>
              </div>

              <Button variant="secondary" onClick={open} disabled={opened}>
                {opened ? "Capsule opened!" : "Open time capsule"}
              </Button>

              {opened && (
                <div className="rounded-lg bg-blue-500/10 p-4 text-sm">
                  <p className="font-medium text-blue-500">
                    The closure remembered:
                  </p>
                  <p className="font-mono mt-1 text-muted-foreground">
                    {`"${capsule.message}"`} — sealed by {capsule.name} in{" "}
                    {capsule.year}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
