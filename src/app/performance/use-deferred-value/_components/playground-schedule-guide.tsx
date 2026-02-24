"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Check, X } from "lucide-react";

const questions = [
  {
    id: "props",
    question:
      "Do you receive the value from props or state you can't wrap in startTransition?",
    yes: "useDeferredValue works when you can't control the state update — perfect for values from props",
    no: "If you own the state, useTransition might give you more control",
  },
  {
    id: "expensive",
    question:
      "Does the value trigger an expensive render or computation?",
    yes: "Deferring lets the expensive render lag behind while the input stays snappy",
    no: "If the render is fast, deferring adds complexity without benefit",
  },
  {
    id: "stale",
    question:
      "Can the display show slightly stale content while fresh data loads?",
    yes: "Perfect — the board can show old schedules while new ones compute",
    no: "If stale content is confusing, consider optimizing the render instead",
  },
];

const guideCode = `// DO defer — expensive grid regenerates on each keystroke
const deferredQuery = useDeferredValue(query);
const grid = generateExpensiveGrid(deferredQuery);

// DO defer — value comes from props you can't control
const deferredFilter = useDeferredValue(props.filter);

// DON'T — simple state, fast render
const [count, setCount] = useState(0); // no deferral needed`;

export function PlaygroundScheduleGuide() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    props: null,
    expensive: null,
    stale: null,
  });

  const yesCount = Object.values(answers).filter((v) => v === true).length;
  const answered = Object.values(answers).filter((v) => v !== null).length;

  function getVerdict() {
    if (answered < 3) return null;
    if (yesCount >= 2)
      return {
        text: "Defer it! The board can show stale schedules while fresh ones compute.",
        color: "green",
      };
    if (yesCount === 1)
      return {
        text: "Borderline — check if useTransition gives you more control.",
        color: "amber",
      };
    return {
      text: "No deferral needed — the board updates fast enough.",
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
          Should You Defer?
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Decision Guide
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Answer these questions to decide if useDeferredValue fits your
          situation.
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

        <CodeBlock code={guideCode} filename="schedule-guide.tsx" />
      </CardContent>
    </Card>
  );
}
