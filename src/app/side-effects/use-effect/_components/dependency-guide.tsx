import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const variants = [
  {
    code: "useEffect(fn, [])",
    title: "Empty array",
    description: "Run once on mount, clean up on unmount",
    example: "Fetch data, set up a subscription",
    color: "#3b82f6",
  },
  {
    code: "useEffect(fn, [a, b])",
    title: "With dependencies",
    description: "Run when a or b change",
    example: "Sync title when count changes",
    color: "#a855f7",
  },
  {
    code: "useEffect(fn)",
    title: "No array",
    description: "Run after every render",
    example: "Rarely needed — usually a mistake!",
    color: "#f97316",
  },
];

export function DependencyGuide() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map((v) => (
          <Card
            key={v.code}
            style={{ borderColor: v.color + "40" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                <code
                  className="font-mono text-sm"
                  style={{ color: v.color }}
                >
                  {v.code}
                </code>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">{v.title}</p>
              <p className="text-xs text-muted-foreground">
                {v.description}
              </p>
              <p className="text-xs text-muted-foreground italic">
                e.g. {v.example}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        The dependency array is your contract with React — &quot;only re-run
        my effect when these values change.&quot;
      </p>
    </div>
  );
}
