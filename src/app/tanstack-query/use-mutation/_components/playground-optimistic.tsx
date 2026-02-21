"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const code = `const addTodo = useMutation({
  mutationFn: (text: string) => createTodoOnServer(text),

  // Optimistic update: change UI BEFORE server responds
  onMutate: async (text) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });
    const previous = queryClient.getQueryData(["todos"]);

    // Add the todo immediately (optimistic)
    queryClient.setQueryData(["todos"], (old) => [
      ...old,
      { id: Date.now(), text, done: false },
    ]);

    return { previous }; // save for rollback
  },

  // If error: roll back to previous state
  onError: (err, text, context) => {
    queryClient.setQueryData(["todos"], context.previous);
  },

  // Always refetch after error or success
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});`;

let nextId = 100;

export function PlaygroundOptimistic() {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ["optimistic-todos"],
    queryFn: () =>
      Promise.resolve([
        { id: 1, text: "Learn useMutation", done: false },
        { id: 2, text: "Try optimistic updates", done: false },
      ]),
    staleTime: Infinity,
  });

  const addTodo = useMutation({
    mutationFn: async (text: string) => {
      // Simulate server delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Simulate random failure (20% chance)
      if (Math.random() < 0.2) throw new Error("Server error!");
      return { id: ++nextId, text, done: false };
    },
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ["optimistic-todos"] });
      const previous = queryClient.getQueryData<Todo[]>(["optimistic-todos"]);

      queryClient.setQueryData<Todo[]>(["optimistic-todos"], (old) => [
        ...(old || []),
        { id: Date.now(), text, done: false },
      ]);

      return { previous };
    },
    onError: (_err, _text, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["optimistic-todos"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["optimistic-todos"] });
    },
  });

  function handleAdd() {
    if (!input.trim()) return;
    addTodo.mutate(input.trim());
    setInput("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          Optimistic Updates
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Instant UI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Add a todo — it appears instantly. If the server fails (20% chance),
          it rolls back.
        </p>

        <div className="flex gap-2">
          <Input
            placeholder="New todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border p-3 text-sm"
            >
              <span>{todo.text}</span>
            </div>
          ))}
        </div>

        {addTodo.isPending && (
          <p className="text-xs text-yellow-600 text-center">
            Syncing with server... (1.5s delay)
          </p>
        )}
        {addTodo.isError && (
          <p className="text-xs text-red-500 text-center">
            Server failed! Rolled back to previous state.
          </p>
        )}

        <CodeBlock code={code} filename="optimistic-updates.tsx" />
      </CardContent>
    </Card>
  );
}
