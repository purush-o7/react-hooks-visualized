"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fakeData = [
  { id: 1, name: "Widget A", price: "$12.99" },
  { id: 2, name: "Widget B", price: "$24.50" },
  { id: 3, name: "Gadget C", price: "$8.00" },
];

export function ExampleAsyncEffect() {
  const [data, setData] = useState<typeof fakeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const loadData = async () => {
    setData(null);
    setLoading(true);
    setLog(["useEffect(() => {"]);

    await new Promise((r) => setTimeout(r, 300));
    setLog((prev) => [...prev, "  async function loadData() {"]);

    await new Promise((r) => setTimeout(r, 500));
    setLog((prev) => [...prev, "    const data = await fetchData(); // waiting..."]);

    await new Promise((r) => setTimeout(r, 800));
    setLog((prev) => [
      ...prev,
      "    setData(data); // resolved!",
      "  }",
      "  loadData();",
      "}, []);",
    ]);
    setData(fakeData);
    setLoading(false);
  };

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(34, 197, 94, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700">
            PATTERN
          </Badge>
          <span className="text-sm text-muted-foreground">
            Async function inside useEffect
          </span>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs space-y-1 min-h-[100px]">
          {log.length === 0 ? (
            <span className="text-muted-foreground">
              Click &quot;Load Data&quot; to see the pattern...
            </span>
          ) : (
            log.map((line, i) => (
              <div key={i} className="whitespace-pre text-muted-foreground">
                {line}
              </div>
            ))
          )}
        </div>

        {data && (
          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-xs font-medium text-green-400">Loaded data:</p>
            {data.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm font-mono"
              >
                <span>{item.name}</span>
                <span className="text-muted-foreground">{item.price}</span>
              </div>
            ))}
          </div>
        )}

        <Button onClick={loadData} disabled={loading}>
          {loading ? "Loading..." : "Load Data"}
        </Button>
      </div>
    </GlowCard>
  );
}
