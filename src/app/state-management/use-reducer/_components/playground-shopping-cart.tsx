"use client";

import { useReducer } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "qty"> }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "UPDATE_QTY"; id: number; delta: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QTY":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id
              ? { ...i, qty: Math.max(0, i.qty + action.delta) }
              : i
          )
          .filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

const catalog = [
  { id: 1, name: "React Sticker", price: 2.99 },
  { id: 2, name: "Hook Mug", price: 12.99 },
  { id: 3, name: "TypeScript Tee", price: 24.99 },
];

const code = `function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(i => i.id === action.item.id);
      if (exists) {
        return { items: state.items.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        )};
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "UPDATE_QTY":
      return { items: state.items
        .map(i => i.id === action.id ? { ...i, qty: i.qty + action.delta } : i)
        .filter(i => i.qty > 0)  // auto-remove when qty hits 0
      };
    case "REMOVE_ITEM":
      return { items: state.items.filter(i => i.id !== action.id) };
  }
}`;

export function PlaygroundShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          Shopping Cart
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Nested State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Catalog */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Products</p>
          {catalog.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => dispatch({ type: "ADD_ITEM", item })}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Cart */}
        {cart.items.length > 0 && (
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-medium">
              Cart ({itemCount} item{itemCount !== 1 && "s"})
            </p>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 text-sm"
              >
                <span className="flex-1">{item.name}</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QTY",
                        id: item.id,
                        delta: -1,
                      })
                    }
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-6 text-center font-mono">
                    {item.qty}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QTY",
                        id: item.id,
                        delta: 1,
                      })
                    }
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
                <span className="w-16 text-right font-mono">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", id: item.id })
                  }
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t font-bold">
              <span>Total</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => dispatch({ type: "CLEAR" })}
            >
              Clear Cart
            </Button>
          </div>
        )}

        <CodeBlock code={code} filename="cart-reducer.tsx" />
      </CardContent>
    </Card>
  );
}
