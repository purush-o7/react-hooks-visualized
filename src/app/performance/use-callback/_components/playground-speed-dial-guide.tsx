"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Check, X } from "lucide-react";

const questions = [
  {
    id: "memo",
    question: "Is the child wrapped in memo()?",
    yes: "useCallback helps — stable reference lets memo() skip re-renders",
    no: "No benefit — child re-renders regardless of function identity",
  },
  {
    id: "dep",
    question: "Is this function in a dependency array (useEffect, useMemo)?",
    yes: "useCallback helps — prevents unnecessary effect/memo re-runs",
    no: "One less reason to use useCallback",
  },
  {
    id: "expensive",
    question: "Is the child expensive to render?",
    yes: "High impact — saving the re-render matters",
    no: "Low impact — re-render is fast anyway",
  },
];

const guideCode = `// DO speed dial — child is memo'd
const handleDial = useCallback(() => { ... }, [contacts]);
<MemoizedContactList onDial={handleDial} />

// DO speed dial — used in dependency array
const fetchContacts = useCallback(() => { ... }, [query]);
useEffect(() => { fetchContacts(); }, [fetchContacts]);

// DON'T — no memo, no dependency array
const handleClick = () => { ... }; // inline is fine`;

export function PlaygroundSpeedDialGuide() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    memo: null,
    dep: null,
    expensive: null,
  });

  const yesCount = Object.values(answers).filter((v) => v === true).length;
  const answered = Object.values(answers).filter((v) => v !== null).length;

  function getVerdict() {
    if (answered < 3) return null;
    if (yesCount >= 2)
      return {
        text: "Speed dial it! useCallback prevents unnecessary re-renders here.",
        color: "green",
      };
    if (yesCount === 1)
      return {
        text: "Marginal benefit — the contact list barely notices.",
        color: "amber",
      };
    return {
      text: "Don't bother — no one is checking the button serial.",
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
          Should You Speed Dial?
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Decision Guide
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Answer these questions to decide if useCallback is worth it.
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

        <CodeBlock code={guideCode} filename="speed-dial-guide.tsx" />
      </CardContent>
    </Card>
  );
}
