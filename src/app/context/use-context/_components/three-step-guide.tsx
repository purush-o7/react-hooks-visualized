import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: 1,
    title: "Create",
    code: "createContext(defaultValue)",
    description: "Create the mailbox — a shared channel for data",
    color: "#3b82f6",
  },
  {
    step: 2,
    title: "Provide",
    code: "<Ctx.Provider value={data}>",
    description: "Drop the mail in — wrap components that need access",
    color: "#22c55e",
  },
  {
    step: 3,
    title: "Consume",
    code: "useContext(Ctx)",
    description: "Pick up the mail — read the value anywhere inside",
    color: "#a855f7",
  },
];

export function ThreeStepGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {steps.map((s) => (
        <Card key={s.step} style={{ borderColor: s.color + "40" }}>
          <CardContent className="pt-6 space-y-2 text-center">
            <div
              className="size-8 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto"
              style={{ backgroundColor: s.color }}
            >
              {s.step}
            </div>
            <p className="font-bold">{s.title}</p>
            <code
              className="text-xs font-mono block"
              style={{ color: s.color }}
            >
              {s.code}
            </code>
            <p className="text-xs text-muted-foreground">{s.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
