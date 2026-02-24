"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Check, X } from "lucide-react";

const questions = [
  {
    id: "length",
    code: "useMemo(() => items.length, [items])",
    answer: false,
    reason: "O(1) property access — memoizing costs more than the lookup.",
  },
  {
    id: "arithmetic",
    code: "useMemo(() => a + b, [a, b])",
    answer: false,
    reason: "Simple arithmetic — comparing deps is as expensive as the computation.",
  },
  {
    id: "filter-map",
    code: "useMemo(() => items.filter(x => x.active).map(x => x.name), [items])",
    answer: true,
    reason: "O(n) filter + map on a potentially large list — worth memoizing.",
  },
  {
    id: "sort",
    code: "useMemo(() => items.sort((a,b) => a.price - b.price), [items])",
    answer: true,
    reason: "O(n log n) sort — definitely worth memoizing for large arrays.",
  },
];

const overEngineeringCode = `// Don't memoize trivial operations
const count = items.length;           // O(1)
const total = price * quantity;       // simple math

// DO memoize expensive derived data
const sorted = useMemo(
  () => [...items].sort(compareFn),
  [items]
);`;

export function PlaygroundOverEngineering() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    length: null,
    arithmetic: null,
    "filter-map": null,
    sort: null,
  });

  const answered = Object.values(answers).filter((v) => v !== null).length;
  const correct = questions.filter(
    (q) => answers[q.id] === q.answer
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="wrench">
            🔧
          </span>
          Over-Engineering Check
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Best Practice
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          You don&apos;t need a vault for a single Lego brick. For each snippet,
          decide: <strong>useMemo</strong> or <strong>just compute</strong>?
        </p>

        <div className="space-y-3">
          {questions.map((q) => {
            const userAnswer = answers[q.id];
            const isAnswered = userAnswer !== null;
            const isCorrect = userAnswer === q.answer;

            return (
              <div key={q.id} className="rounded-lg border p-3 space-y-2">
                <code className="block text-xs font-mono">{q.code}</code>
                <div className="flex gap-2">
                  <button
                    className={`flex items-center gap-1 rounded px-3 py-1 text-sm transition-colors ${
                      userAnswer === true
                        ? isCorrect
                          ? "bg-green-500/20 text-green-600 border border-green-500/40"
                          : "bg-red-500/20 text-red-600 border border-red-500/40"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: true }))
                    }
                    disabled={isAnswered}
                  >
                    <Check className="size-3" /> Memoize
                  </button>
                  <button
                    className={`flex items-center gap-1 rounded px-3 py-1 text-sm transition-colors ${
                      userAnswer === false
                        ? isCorrect
                          ? "bg-green-500/20 text-green-600 border border-green-500/40"
                          : "bg-red-500/20 text-red-600 border border-red-500/40"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: false }))
                    }
                    disabled={isAnswered}
                  >
                    <X className="size-3" /> Just Compute
                  </button>
                </div>
                {isAnswered && (
                  <p
                    className="text-xs"
                    style={{
                      color: isCorrect ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
                    }}
                  >
                    {isCorrect ? "Correct! " : "Not quite. "}
                    {q.reason}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {answered === 4 && (
          <div
            className="rounded-lg p-4 text-center font-medium"
            style={{
              backgroundColor:
                correct >= 3
                  ? "rgba(34, 197, 94, 0.1)"
                  : correct >= 2
                  ? "rgba(245, 158, 11, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
              color:
                correct >= 3
                  ? "rgb(34, 197, 94)"
                  : correct >= 2
                  ? "rgb(245, 158, 11)"
                  : "rgb(239, 68, 68)",
            }}
          >
            {correct}/4 correct!{" "}
            {correct === 4
              ? "Perfect — you know when to reach for useMemo."
              : correct >= 3
              ? "Almost there — memoize expensive work, skip the trivial."
              : "Review the rule: memoize O(n) and above, skip O(1) and simple math."}
          </div>
        )}

        <CodeBlock code={overEngineeringCode} filename="when-to-memo.tsx" />
      </CardContent>
    </Card>
  );
}
