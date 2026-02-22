"use client";

import { createContext, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

interface AgentProfile {
  codename: string;
  clearance: string;
  avatar: string;
}

const AgentCtx = createContext<AgentProfile>({
  codename: "Shadow",
  clearance: "Field Agent",
  avatar: "🕵️",
});

const clearanceLevels = [
  { label: "Trainee", color: "#6b7280" },
  { label: "Field Agent", color: "#3b82f6" },
  { label: "Handler", color: "#a855f7" },
  { label: "Director", color: "#eab308" },
];

const avatars = ["🕵️", "🥷", "🦊", "🎭"];

function IDBadge() {
  const { codename, avatar, clearance } = useContext(AgentCtx);
  return (
    <div
      className="rounded-lg p-4 space-y-2 bg-zinc-900 border border-white/10"
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        ID Badge
      </p>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{avatar}</span>
        <div>
          <p className="font-mono font-bold text-sm">{codename || "—"}</p>
          <p className="text-[10px] text-muted-foreground">{clearance}</p>
        </div>
      </div>
      <div className="border-t border-dashed pt-1">
        <p className="text-[9px] text-red-500 uppercase tracking-widest">
          Classified
        </p>
      </div>
    </div>
  );
}

function CommsPanel() {
  const { codename, clearance } = useContext(AgentCtx);
  const level = clearanceLevels.find((l) => l.label === clearance);
  return (
    <div
      className="rounded-lg p-4 space-y-2 bg-zinc-900 border border-white/10"
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        Comms Panel
      </p>
      <p className="text-sm font-mono">
        Incoming for:{" "}
        <span className="font-bold">{codename || "Unknown"}</span>
      </p>
      <Badge
        className="text-[10px] px-1.5 py-0"
        style={{ backgroundColor: level?.color ?? "#6b7280" }}
      >
        {clearance}
      </Badge>
    </div>
  );
}

function MissionCard() {
  const { codename, clearance, avatar } = useContext(AgentCtx);
  const level = clearanceLevels.find((l) => l.label === clearance);
  return (
    <div
      className="rounded-lg p-4 space-y-3 text-center bg-zinc-900 border border-white/10"
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        Mission Card
      </p>
      <span className="text-5xl block">{avatar}</span>
      <p className="font-mono font-bold">{codename || "—"}</p>
      <Badge
        className="text-xs px-2 py-0.5"
        style={{ backgroundColor: level?.color ?? "#6b7280" }}
      >
        {clearance}
      </Badge>
      <p className="text-[10px] text-muted-foreground italic">
        All 3 panels read from AgentContext
      </p>
    </div>
  );
}

const code = `const AgentCtx = createContext({ codename: "", clearance: "", avatar: "" });

function HQ() {
  const [agent, setAgent] = useState({ codename: "Shadow", clearance: "Field Agent", avatar: "🕵️" });
  return (
    <AgentCtx.Provider value={agent}>
      <IDBadge />       {/* reads codename + avatar */}
      <CommsPanel />    {/* reads codename + clearance */}
      <MissionCard />   {/* reads all fields */}
    </AgentCtx.Provider>
  );
}

function IDBadge() {
  const { codename, avatar } = useContext(AgentCtx);
  return <div>{avatar} {codename}</div>;
}`;

export function PlaygroundAgentDossier() {
  const [agent, setAgent] = useState<AgentProfile>({
    codename: "Shadow",
    clearance: "Field Agent",
    avatar: "🕵️",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Agent Dossier
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Shared State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Edit controls */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Codename
            </label>
            <input
              type="text"
              value={agent.codename}
              onChange={(e) =>
                setAgent((a) => ({ ...a, codename: e.target.value }))
              }
              placeholder="Enter codename..."
              className="w-full rounded-md border bg-transparent px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Clearance Level
            </label>
            <div className="flex flex-wrap gap-2">
              {clearanceLevels.map((level) => (
                <Button
                  key={level.label}
                  variant={
                    agent.clearance === level.label ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setAgent((a) => ({ ...a, clearance: level.label }))
                  }
                  style={
                    agent.clearance === level.label
                      ? { backgroundColor: level.color }
                      : undefined
                  }
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Avatar
            </label>
            <div className="flex gap-2">
              {avatars.map((av) => (
                <button
                  key={av}
                  onClick={() => setAgent((a) => ({ ...a, avatar: av }))}
                  className={`text-2xl p-2 rounded-lg border transition-colors ${
                    agent.avatar === av
                      ? "border-foreground bg-foreground/10"
                      : "border-transparent hover:border-muted-foreground/30"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Consumer components */}
        <AgentCtx.Provider value={agent}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <IDBadge />
            <CommsPanel />
          </div>
          <MissionCard />
        </AgentCtx.Provider>

        <CodeBlock code={code} filename="agent-dossier.tsx" />
      </CardContent>
    </Card>
  );
}
