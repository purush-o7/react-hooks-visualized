"use client";

import { useReducer } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CargoItem {
  id: string;
  name: string;
  weight: number;
  qty: number;
}

interface CargoState {
  items: CargoItem[];
}

type CargoAction =
  | { type: "LOAD_CARGO"; item: Omit<CargoItem, "qty"> }
  | { type: "JETTISON"; id: string }
  | { type: "ADJUST_LOAD"; id: string; delta: number }
  | { type: "PURGE_BAY" };

const MAX_CAPACITY = 500;

function cargoReducer(state: CargoState, action: CargoAction): CargoState {
  switch (action.type) {
    case "LOAD_CARGO": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "JETTISON":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "ADJUST_LOAD": {
      return {
        items: state.items
          .map((i) =>
            i.id === action.id
              ? { ...i, qty: Math.max(0, i.qty + action.delta) }
              : i
          )
          .filter((i) => i.qty > 0),
      };
    }
    case "PURGE_BAY":
      return { items: [] };
    default:
      return state;
  }
}

const catalog = [
  { id: "fuel-cell", name: "Fuel Cell", weight: 50 },
  { id: "shield-module", name: "Shield Module", weight: 120 },
  { id: "ration-pack", name: "Ration Pack", weight: 5 },
];

const cargoCode = `type CargoAction =
  | { type: "LOAD_CARGO"; item: { id, name, weight } }
  | { type: "JETTISON"; id: string }
  | { type: "ADJUST_LOAD"; id: string; delta: number }
  | { type: "PURGE_BAY" };

function cargoReducer(state, action) {
  switch (action.type) {
    case "LOAD_CARGO": {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return { items: state.items.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "JETTISON":
      return { items: state.items.filter(i => i.id !== action.id) };
    case "ADJUST_LOAD":
      return { items: state.items
        .map(i => i.id === action.id
          ? { ...i, qty: Math.max(0, i.qty + action.delta) } : i)
        .filter(i => i.qty > 0) };
    case "PURGE_BAY":
      return { items: [] };
  }
}`;

export function PlaygroundCargoBay() {
  const [state, dispatch] = useReducer(cargoReducer, { items: [] });

  const totalWeight = state.items.reduce(
    (sum, i) => sum + i.weight * i.qty,
    0
  );

  const weightPercent = Math.min((totalWeight / MAX_CAPACITY) * 100, 100);

  function getWeightColor() {
    if (totalWeight > 450) return "bg-red-500";
    if (totalWeight > 300) return "bg-amber-500";
    return "bg-green-500";
  }

  function getWeightTextColor() {
    if (totalWeight > 450) return "text-red-400";
    if (totalWeight > 300) return "text-amber-400";
    return "text-green-400";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">📦</span>
          Cargo Bay
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Nested State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Supply Depot */}
        <div>
          <p className="text-sm font-medium mb-2 text-muted-foreground">
            Supply Depot
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {catalog.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded bg-zinc-900/50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.weight} kg
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    dispatch({ type: "LOAD_CARGO", item })
                  }
                >
                  Load
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Cargo Manifest */}
        <div>
          <p className="text-sm font-medium mb-2 text-muted-foreground">
            Cargo Manifest
          </p>
          <div className="space-y-1">
            {state.items.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center bg-zinc-900/50 rounded">
                Bay is empty. Load supplies from the depot.
              </p>
            )}
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded px-3 py-2 bg-zinc-900/50"
              >
                <span className="text-sm flex-1">{item.name}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "ADJUST_LOAD",
                        id: item.id,
                        delta: -1,
                      })
                    }
                    className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-mono w-8 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "ADJUST_LOAD",
                        id: item.id,
                        delta: 1,
                      })
                    }
                    className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="text-xs font-mono text-muted-foreground w-16 text-right">
                  {item.weight * item.qty} kg
                </span>
                <button
                  onClick={() =>
                    dispatch({ type: "JETTISON", id: item.id })
                  }
                  className="text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Weight Capacity Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Weight Capacity</span>
            <span className={`font-mono ${getWeightTextColor()}`}>
              {totalWeight} / {MAX_CAPACITY} kg
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getWeightColor()}`}
              style={{ width: `${weightPercent}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: "PURGE_BAY" })}
            >
              Purge Bay
            </Button>
          </div>
        )}

        <CodeBlock code={cargoCode} filename="cargo-bay-reducer.tsx" />
      </CardContent>
    </Card>
  );
}
