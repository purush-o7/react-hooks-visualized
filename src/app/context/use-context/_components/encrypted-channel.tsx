"use client";

import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";

const agents = [
  {
    codename: "HQ + Provider",
    isProvider: true,
    isConsumer: false,
    color: "#eab308",
  },
  {
    codename: "Regional Office",
    isProvider: false,
    isConsumer: false,
    color: undefined,
  },
  {
    codename: "Field Station",
    isProvider: false,
    isConsumer: false,
    color: undefined,
  },
  {
    codename: "Safe House",
    isProvider: false,
    isConsumer: false,
    color: undefined,
  },
  {
    codename: "Agent Shadow",
    isProvider: false,
    isConsumer: true,
    color: "#a855f7",
  },
];

const contextCode = `const IntelCtx = createContext(null);

function HQ() {
  const [secret] = useState("Rendezvous at dawn");
  return (
    <IntelCtx.Provider value={secret}>
      <RegionalOffice />  {/* no props! */}
    </IntelCtx.Provider>
  );
}

// Middle layers — clean, no secret prop
function RegionalOffice() { return <FieldStation />; }
function FieldStation() { return <SafeHouse />; }
function SafeHouse() { return <AgentShadow />; }

// Agent decodes the intel directly
function AgentShadow() {
  const secret = useContext(IntelCtx);
  return <span>Mission: {secret}</span>;
}`;

export function EncryptedChannel() {
  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#3b82f6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            ENCRYPTED
          </Badge>
          <span className="text-sm text-muted-foreground">
            Direct intel — no intermediaries
          </span>
        </div>

        {/* Agent node chain with signal line */}
        <div className="space-y-1 relative">
          {/* Encrypted signal line */}
          <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-green-500 to-blue-500 opacity-30 rounded" />

          {agents.map((agent) => (
            <div
              key={agent.codename}
              className={`flex items-center gap-3 rounded-lg p-3 relative bg-zinc-900 border ${
                agent.color ? "" : "border-white/10"
              }`}
              style={
                agent.color
                  ? { borderColor: agent.color + "60" }
                  : undefined
              }
            >
              <code className="font-mono text-sm font-bold shrink-0">
                {agent.codename}
              </code>
              {agent.isProvider && (
                <Badge className="bg-green-600 text-[10px] px-1.5 py-0">
                  BROADCASTS
                </Badge>
              )}
              {agent.isConsumer && (
                <Badge className="bg-blue-600 text-[10px] px-1.5 py-0">
                  useContext(IntelCtx)
                </Badge>
              )}
              {!agent.isProvider && !agent.isConsumer && (
                <span className="text-xs text-muted-foreground">
                  no clearance needed
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-green-500 font-medium">
          HQ broadcasts → Agent decodes. No couriers, no leaks.
        </p>

        <CodeBlock code={contextCode} filename="encrypted-channel.tsx" />
      </div>
    </GlowCard>
  );
}
