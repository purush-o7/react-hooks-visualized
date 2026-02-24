"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import {
  Building2,
  Home,
  Smartphone,
  Voicemail,
  Phone,
  PhoneOff,
} from "lucide-react";

const destinations = [
  { value: "Office", icon: Building2 },
  { value: "Home", icon: Home },
  { value: "Mobile", icon: Smartphone },
  { value: "Voicemail", icon: Voicemail },
];

const priorities = [
  { value: "Low", color: "#71717a" },
  { value: "Normal", color: "#d97706" },
  { value: "Urgent", color: "#ef4444" },
];

const statuses = ["Ringing", "Connected", "On Hold"];

interface Call {
  caller: string;
  destination: string;
  priority: string;
  status: string;
}

const initialCall: Call = {
  caller: "",
  destination: "Office",
  priority: "Normal",
  status: "Ringing",
};

export function PlaygroundCallRouter() {
  const [call, setCall] = useState<Call>(initialCall);

  const code = `const [call, setCall] = useState({
  caller: "${call.caller}",
  destination: "${call.destination}",
  priority: "${call.priority}",
  status: "${call.status}",
});

// Update one field — spread to keep the rest!
setCall(prev => ({ ...prev, destination: "${call.destination}" }));`;

  const priorityColor =
    priorities.find((p) => p.value === call.priority)?.color ?? "#d97706";

  const statusColor =
    call.status === "Connected"
      ? "#22c55e"
      : call.status === "On Hold"
        ? "#d97706"
        : "#3b82f6";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📞</span>
          Call Router
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Object State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Controls */}
          <div className="flex-1 space-y-4">
            {/* Caller */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Caller</label>
              <Input
                value={call.caller}
                onChange={(e) =>
                  setCall((prev) => ({ ...prev, caller: e.target.value }))
                }
                placeholder="Enter caller name..."
              />
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Destination</label>
              <div className="flex gap-2">
                {destinations.map((d) => {
                  const Icon = d.icon;
                  return (
                    <Button
                      key={d.value}
                      variant={
                        call.destination === d.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setCall((prev) => ({
                          ...prev,
                          destination: d.value,
                        }))
                      }
                      title={d.value}
                    >
                      <Icon className="size-4" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <Button
                    key={p.value}
                    variant={call.priority === p.value ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setCall((prev) => ({ ...prev, priority: p.value }))
                    }
                    style={
                      call.priority === p.value
                        ? { backgroundColor: p.color, borderColor: p.color }
                        : undefined
                    }
                  >
                    {p.value}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Status</label>
              <div className="flex gap-2">
                {statuses.map((s) => (
                  <Button
                    key={s}
                    variant={call.status === s ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setCall((prev) => ({ ...prev, status: s }))
                    }
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Call Preview */}
          <div className="shrink-0 w-full sm:w-52">
            <div className="rounded-xl bg-zinc-900 p-4 space-y-3 h-full">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider text-center">
                Active Call
              </p>

              {/* Caller name */}
              <div className="text-center">
                <p className="font-bold text-lg truncate">
                  {call.caller || "Unknown"}
                </p>
              </div>

              {/* Destination */}
              <div className="flex items-center justify-center gap-2">
                {(() => {
                  const dest = destinations.find(
                    (d) => d.value === call.destination
                  );
                  const Icon = dest?.icon ?? Building2;
                  return (
                    <>
                      <Icon className="size-4 text-zinc-400" />
                      <span className="text-sm text-zinc-400">
                        {call.destination}
                      </span>
                    </>
                  );
                })()}
              </div>

              {/* Priority badge */}
              <div className="flex justify-center">
                <Badge
                  className="font-mono text-xs"
                  style={{
                    backgroundColor: priorityColor + "30",
                    color: priorityColor,
                    borderColor: priorityColor + "50",
                  }}
                >
                  {call.priority}
                </Badge>
              </div>

              {/* Status indicator */}
              <div className="flex items-center justify-center gap-2">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: statusColor }}
                />
                <span
                  className="text-xs font-mono"
                  style={{ color: statusColor }}
                >
                  {call.status}
                </span>
              </div>

              {/* End Call */}
              {(call.caller ||
                call.destination !== "Office" ||
                call.priority !== "Normal" ||
                call.status !== "Ringing") && (
                <div className="flex justify-center pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCall(initialCall)}
                    className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                  >
                    <PhoneOff className="size-3 mr-1.5" />
                    End Call
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <CodeBlock code={code} filename="call-router.tsx" />
      </CardContent>
    </Card>
  );
}
