"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

const code = `const [polling, setPolling] = useState(false);

const { data } = useQuery({
  queryKey: ["time"],
  queryFn: () => ({
    time: new Date().toLocaleTimeString(),
    timestamp: Date.now(),
  }),
  refetchInterval: polling ? 3000 : false,
  // When enabled: auto-refetch every 3 seconds!
});`;

export function PlaygroundPolling() {
  const [polling, setPolling] = useState(false);

  const { data, dataUpdatedAt } = useQuery({
    queryKey: ["time"],
    queryFn: () => ({
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now(),
    }),
    refetchInterval: polling ? 3000 : false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          Auto-Refresh
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Polling
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Toggle polling on — the data refreshes automatically every 3 seconds.
        </p>

        <div className="text-center rounded-lg bg-muted/50 p-6 space-y-2">
          <p className="text-4xl font-mono font-bold">
            {data?.time ?? "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            Last updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—"}
          </p>
          {polling && (
            <div className="flex items-center justify-center gap-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-600">
                Auto-refreshing every 3s
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">Polling</span>
          <Switch checked={polling} onCheckedChange={setPolling} />
          <span className="text-sm text-muted-foreground">
            {polling ? "ON" : "OFF"}
          </span>
        </div>

        <CodeBlock code={code} filename="auto-refresh.tsx" />
      </CardContent>
    </Card>
  );
}
