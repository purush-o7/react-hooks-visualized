"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Check, X } from "lucide-react";

const questions = [
  {
    id: "expensive",
    question:
      "Does the state update trigger expensive rendering (large list, complex computation)?",
    yes: "Heavy renders are exactly what triage is for — route them to the waiting room",
    no: "If the render is fast, triage adds overhead without benefit",
  },
  {
    id: "urgent",
    question:
      "Is there a separate urgent update that must stay responsive (input, animation)?",
    yes: "useTransition keeps the urgent update snappy while the heavy work waits",
    no: "Without a competing urgent update, there's nothing to prioritize",
  },
  {
    id: "stale",
    question:
      "Can users tolerate seeing stale content briefly while the update processes?",
    yes: "Perfect — isPending can signal that fresh data is on its way",
    no: "Users need instant results — consider optimizing the render instead",
  },
];

const guideCode = `// DO triage — heavy filter blocks the input
const [isPending, startTransition] = useTransition();
startTransition(() => setFilteredResults(expensiveFilter(query)));

// DO triage — tab switch renders 3,000 items
startTransition(() => setActiveTab(newTab));

// DON'T — simple state update, fast render
setCount(c => c + 1); // no transition needed`;

export function PlaygroundTriageGuide() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    expensive: null,
    urgent: null,
    stale: null,
  });

  const yesCount = Object.values(answers).filter((v) => v === true).length;
  const answered = Object.values(answers).filter((v) => v !== null).length;

  function getVerdict() {
    if (answered < 3) return null;
    if (yesCount >= 2)
      return {
        text: "Triage it! useTransition keeps the ER running smoothly.",
        color: "green",
      };
    if (yesCount === 1)
      return {
        text: "Borderline case — monitor before prescribing.",
        color: "amber",
      };
    return {
      text: "No triage needed — the ER handles this just fine.",
      color: "red",
    };
  }

  const verdict = getVerdict();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="target">
            🎯
          </span>
          Should You Triage?
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Decision Guide
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Answer these questions to decide if useTransition is worth it.
        </p>

        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="rounded-lg border p-3 space-y-2">
              <p className="text-sm font-medium">{q.question}</p>
              <div className="flex gap-2">
                <button
                  className={`flex items-center gap-1 rounded px-3 py-1 text-sm transition-colors ${
                    answers[q.id] === true
                      ? "bg-green-500/20 text-green-600 border border-green-500/40"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: true }))
                  }
                >
                  <Check className="size-3" /> Yes
                </button>
                <button
                  className={`flex items-center gap-1 rounded px-3 py-1 text-sm transition-colors ${
                    answers[q.id] === false
                      ? "bg-red-500/20 text-red-600 border border-red-500/40"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: false }))
                  }
                >
                  <X className="size-3" /> No
                </button>
              </div>
              {answers[q.id] !== null && (
                <p className="text-xs text-muted-foreground">
                  {answers[q.id] ? q.yes : q.no}
                </p>
              )}
            </div>
          ))}
        </div>

        {verdict && (
          <div
            className="rounded-lg p-4 text-center font-medium"
            style={{
              backgroundColor:
                verdict.color === "green"
                  ? "rgba(34, 197, 94, 0.1)"
                  : verdict.color === "amber"
                    ? "rgba(245, 158, 11, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
              color:
                verdict.color === "green"
                  ? "rgb(34, 197, 94)"
                  : verdict.color === "amber"
                    ? "rgb(245, 158, 11)"
                    : "rgb(239, 68, 68)",
            }}
          >
            {verdict.text}
          </div>
        )}

        <CodeBlock code={guideCode} filename="triage-guide.tsx" />
      </CardContent>
    </Card>
  );
}
