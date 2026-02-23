"use client";

import { useReducer, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Trash2 } from "lucide-react";

interface Objective {
  id: number;
  text: string;
  completed: boolean;
}

type ChecklistAction =
  | { type: "LOG_OBJECTIVE"; text: string }
  | { type: "COMPLETE_OBJECTIVE"; id: number }
  | { type: "SCRUB_OBJECTIVE"; id: number }
  | { type: "ARCHIVE_COMPLETED" };

let nextId = 1;

function checklistReducer(
  state: Objective[],
  action: ChecklistAction
): Objective[] {
  switch (action.type) {
    case "LOG_OBJECTIVE":
      return [...state, { id: nextId++, text: action.text, completed: false }];
    case "COMPLETE_OBJECTIVE":
      return state.map((obj) =>
        obj.id === action.id ? { ...obj, completed: !obj.completed } : obj
      );
    case "SCRUB_OBJECTIVE":
      return state.filter((obj) => obj.id !== action.id);
    case "ARCHIVE_COMPLETED":
      return state.filter((obj) => !obj.completed);
    default:
      return state;
  }
}

const initialObjectives: Objective[] = [
  { id: nextId++, text: "Verify life support systems", completed: false },
  { id: nextId++, text: "Calibrate navigation array", completed: false },
  { id: nextId++, text: "Load fuel reserves", completed: true },
];

const checklistCode = `type ChecklistAction =
  | { type: "LOG_OBJECTIVE"; text: string }
  | { type: "COMPLETE_OBJECTIVE"; id: number }
  | { type: "SCRUB_OBJECTIVE"; id: number }
  | { type: "ARCHIVE_COMPLETED" };

function checklistReducer(state, action) {
  switch (action.type) {
    case "LOG_OBJECTIVE":
      return [...state, { id: nextId++, text: action.text, completed: false }];
    case "COMPLETE_OBJECTIVE":
      return state.map(obj =>
        obj.id === action.id ? { ...obj, completed: !obj.completed } : obj);
    case "SCRUB_OBJECTIVE":
      return state.filter(obj => obj.id !== action.id);
    case "ARCHIVE_COMPLETED":
      return state.filter(obj => !obj.completed);
  }
}`;

export function PlaygroundMissionChecklist() {
  const [objectives, dispatch] = useReducer(
    checklistReducer,
    initialObjectives
  );
  const [input, setInput] = useState("");

  const completedCount = objectives.filter((o) => o.completed).length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    dispatch({ type: "LOG_OBJECTIVE", text });
    setInput("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          Mission Checklist
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            CRUD Reducer
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="New mission objective..."
            className="flex-1 rounded bg-zinc-900 border border-white/10 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <Button type="submit" size="sm">
            Transmit
          </Button>
        </form>

        {/* Objectives List */}
        <div className="space-y-1">
          {objectives.length === 0 && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No objectives logged. Transmit one above.
            </p>
          )}
          {objectives.map((obj) => (
            <div
              key={obj.id}
              className="flex items-center gap-3 rounded px-3 py-2 bg-zinc-900/50"
            >
              <button
                onClick={() =>
                  dispatch({ type: "COMPLETE_OBJECTIVE", id: obj.id })
                }
                className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                  obj.completed
                    ? "bg-green-600 border-green-600"
                    : "border-amber-500"
                }`}
              >
                {obj.completed && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <span
                className={`flex-1 text-sm ${
                  obj.completed
                    ? "line-through text-muted-foreground"
                    : "text-white"
                }`}
              >
                {obj.text}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: "SCRUB_OBJECTIVE", id: obj.id })
                }
                className="text-zinc-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {completedCount} of {objectives.length} objectives completed
          </p>
          {completedCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: "ARCHIVE_COMPLETED" })}
            >
              Archive Completed
            </Button>
          )}
        </div>

        <CodeBlock code={checklistCode} filename="mission-checklist-reducer.tsx" />
      </CardContent>
    </Card>
  );
}
