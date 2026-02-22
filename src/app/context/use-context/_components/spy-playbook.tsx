"use client";

const steps = [
  {
    number: 1,
    color: "#eab308",
    title: "Establish the Channel",
    code: "createContext(defaultValue)",
    description:
      "Set up the secure frequency — a shared encrypted line for intel.",
  },
  {
    number: 2,
    color: "#22c55e",
    title: "Broadcast from HQ",
    code: "<IntelCtx.Provider value={data}>",
    description:
      "HQ sends the classified data — wrap the network that needs access.",
  },
  {
    number: 3,
    color: "#a855f7",
    title: "Decode in the Field",
    code: "useContext(IntelCtx)",
    description:
      "Any field agent tunes in — read the intel anywhere inside the network.",
  },
];

export function SpyPlaybook() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {steps.map((step) => (
        <div
          key={step.number}
          className="rounded-xl bg-zinc-900 p-5 text-center space-y-3"
          style={{ borderTop: `3px solid ${step.color}40` }}
        >
          <div
            className="mx-auto flex items-center justify-center size-9 rounded-full text-sm font-bold text-black"
            style={{ backgroundColor: step.color }}
          >
            {step.number}
          </div>
          <h3 className="font-bold text-sm">{step.title}</h3>
          <code
            className="block text-xs font-mono px-2 py-1.5 rounded-md bg-zinc-900/60"
            style={{ color: step.color }}
          >
            {step.code}
          </code>
          <p className="text-xs text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
