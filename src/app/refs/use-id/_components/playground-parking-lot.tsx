"use client";

import { useState, useId, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function CarSpot({
  spotNumber,
  onTicketGenerated,
}: {
  spotNumber: number;
  onTicketGenerated: (ticket: string) => void;
}) {
  const id = useId();
  const ownerId = id + "-owner";

  useEffect(() => {
    onTicketGenerated(ownerId);
  }, [ownerId, onTicketGenerated]);

  return (
    <div className="rounded-lg border border-white/10 bg-zinc-800 p-4 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="text-xs">
          Spot #{spotNumber}
        </Badge>
        <Badge
          variant="outline"
          className="font-mono text-[10px] text-amber-600 border-amber-600/30"
        >
          {ownerId}
        </Badge>
      </div>
      <label
        htmlFor={ownerId}
        className="text-sm font-medium cursor-pointer hover:underline block"
      >
        Owner
      </label>
      <Input id={ownerId} placeholder="Enter owner name..." />
    </div>
  );
}

const parkingCode = `function CarSpot() {
  const id = useId();
  // Each spot: ":r1:-owner", ":r2:-owner", etc.

  return (
    <>
      <label htmlFor={id + "-owner"}>Owner</label>
      <input id={id + "-owner"} />
    </>
  );
}

// Add as many cars as you want — zero collisions!`;

export function PlaygroundParkingLot() {
  const [count, setCount] = useState(2);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  function handleTicket(ticket: string) {
    setGeneratedIds((prev) => {
      if (prev.includes(ticket)) return prev;
      return [...prev, ticket];
    });
  }

  function addCar() {
    setCount((c) => c + 1);
  }

  function removeCar() {
    setCount((c) => Math.max(1, c - 1));
    setGeneratedIds((prev) => prev.slice(0, -1));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🅿️</span>
          Parking Lot
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {count} cars
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Add and remove cars from the lot. Each car automatically gets a unique
          ticket — click any label to verify it focuses the correct input.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addCar}>
            Park Car
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={removeCar}
            disabled={count <= 1}
          >
            Drive Away
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: count }, (_, i) => (
            <CarSpot
              key={i}
              spotNumber={i + 1}
              onTicketGenerated={handleTicket}
            />
          ))}
        </div>

        {generatedIds.length > 0 && (
          <div className="rounded-lg bg-zinc-800/50 border border-white/5 p-3 space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Generated Tickets
            </p>
            <div className="flex flex-wrap gap-1.5">
              {generatedIds.slice(0, count).map((ticket) => (
                <Badge
                  key={ticket}
                  variant="outline"
                  className="font-mono text-[10px] text-amber-600 border-amber-600/30"
                >
                  {ticket}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <CodeBlock code={parkingCode} filename="parking-lot.tsx" />
      </CardContent>
    </Card>
  );
}
