"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Pot = { id: number; name: string; color: string };

const initialPots: Pot[] = [
  { id: 1, name: "Vase", color: "red" },
  { id: 2, name: "Bowl", color: "blue" },
  { id: 3, name: "Mug", color: "green" },
];

const potNames = ["Teapot", "Jug", "Plate", "Cup", "Jar"];
const potColors = ["purple", "orange", "teal", "pink", "gold"];

export function ExamplePotteryShelf() {
  const [pots, setPots] = useState<Pot[]>(initialPots);
  const nextId = useRef(4);
  const [lastAction, setLastAction] = useState("");

  const addPot = () => {
    const name = potNames[Math.floor(Math.random() * potNames.length)];
    const color = potColors[Math.floor(Math.random() * potColors.length)];
    const newPot = { id: nextId.current++, name, color };
    setPots([...pots, newPot]);
    setLastAction(`Added "${name}" (spread + append)`);
  };

  const removePot = (id: number) => {
    const pot = pots.find((p) => p.id === id);
    setPots(pots.filter((p) => p.id !== id));
    setLastAction(`Removed "${pot?.name}" (filter)`);
  };

  const renamePot = (id: number) => {
    const newName = potNames[Math.floor(Math.random() * potNames.length)];
    setPots(
      pots.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
    setLastAction(`Renamed pot #${id} to "${newName}" (map + spread)`);
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            INTERACTIVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            Pottery Shelf — immutable array operations
          </span>
        </div>

        <div className="space-y-2">
          {pots.length === 0 ? (
            <p className="text-sm text-muted-foreground p-4 text-center">
              The shelf is empty. Add a pot!
            </p>
          ) : (
            pots.map((pot) => (
              <div
                key={pot.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div
                  className="size-4 rounded-full shrink-0"
                  style={{ backgroundColor: pot.color }}
                />
                <span className="font-mono text-sm flex-1">
                  #{pot.id} {pot.name}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => renamePot(pot.id)}
                >
                  Rename
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                  onClick={() => removePot(pot.id)}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={addPot}>Add pot</Button>
          <Button
            variant="outline"
            onClick={() => {
              setPots(initialPots);
              nextId.current = 4;
              setLastAction("");
            }}
          >
            Reset shelf
          </Button>
        </div>

        {lastAction && (
          <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs text-muted-foreground">
            Last: {lastAction}
          </div>
        )}
      </div>
    </GlowCard>
  );
}
