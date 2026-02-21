import { Card, CardContent } from "@/components/ui/card";

const rules = [
  {
    emoji: "📛",
    title: 'Name starts with "use"',
    description:
      "React uses this convention to enforce the Rules of Hooks. If it starts with use, React knows to check hook rules.",
    code: "useToggle, useDebounce, useLocalStorage",
    color: "#3b82f6",
  },
  {
    emoji: "🧩",
    title: "Can call other hooks inside",
    description:
      "Custom hooks are just functions that compose built-in hooks. useState, useEffect, useRef — mix and match.",
    code: "useState + useEffect = useDebounce",
    color: "#a855f7",
  },
];

export function HookRules() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rules.map((rule) => (
        <Card key={rule.title} style={{ borderColor: rule.color + "40" }}>
          <CardContent className="pt-6 space-y-2 text-center">
            <div className="text-3xl">{rule.emoji}</div>
            <p className="font-bold">{rule.title}</p>
            <p className="text-xs text-muted-foreground">
              {rule.description}
            </p>
            <code
              className="text-xs font-mono block"
              style={{ color: rule.color }}
            >
              {rule.code}
            </code>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
