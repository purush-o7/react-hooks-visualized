"use client";

import { useReducer, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import { Trash2 } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type TodoAction =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "CLEAR_COMPLETED" };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    case "CLEAR_COMPLETED":
      return state.filter((t) => !t.done);
    default:
      return state;
  }
}

const code = `type TodoAction =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "CLEAR_COMPLETED" };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE":
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case "DELETE":
      return state.filter(t => t.id !== action.id);
    case "CLEAR_COMPLETED":
      return state.filter(t => !t.done);
  }
}`;

export function PlaygroundTodo() {
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: 1, text: "Learn useReducer", done: false },
    { id: 2, text: "Build a todo app", done: false },
  ]);
  const [input, setInput] = useState("");

  const doneCount = todos.filter((t) => t.done).length;

  function handleAdd() {
    if (!input.trim()) return;
    dispatch({ type: "ADD", text: input.trim() });
    setInput("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Todo App
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            CRUD Reducer
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add form */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {todos.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No todos yet — add one above!
            </p>
          )}
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <button
                className={`size-5 rounded border-2 flex items-center justify-center text-xs transition-colors ${
                  todo.done
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-muted-foreground/30"
                }`}
                onClick={() => dispatch({ type: "TOGGLE", id: todo.id })}
              >
                {todo.done && "✓"}
              </button>
              <span
                className={`flex-1 ${
                  todo.done
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => dispatch({ type: "DELETE", id: todo.id })}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Actions */}
        {doneCount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {doneCount} completed
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
            >
              Clear Completed
            </Button>
          </div>
        )}

        <CodeBlock code={code} filename="todo-reducer.tsx" />
      </CardContent>
    </Card>
  );
}
