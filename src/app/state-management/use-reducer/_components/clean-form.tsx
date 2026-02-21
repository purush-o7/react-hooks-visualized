"use client";

import { useReducer } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

interface FormState {
  name: string;
  email: string;
  age: number;
  newsletter: boolean;
  theme: string;
}

type FormAction =
  | { type: "SET_FIELD"; field: string; value: string | number | boolean }
  | { type: "TOGGLE_THEME" }
  | { type: "RESET" };

const initialState: FormState = {
  name: "",
  email: "",
  age: 0,
  newsletter: false,
  theme: "light",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const cleanCode = `const initialState = { name: "", email: "", age: 0, newsletter: false, theme: "light" };

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "RESET":
      return initialState;  // One line resets EVERYTHING!
  }
}

// In the component:
const [state, dispatch] = useReducer(formReducer, initialState);
dispatch({ type: "SET_FIELD", field: "name", value: "Alice" });`;

export function CleanForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            CLEAN
          </Badge>
          <span className="text-sm text-muted-foreground">
            1 useReducer — all logic centralized
          </span>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={state.name}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
          />
          <Input
            placeholder="Email"
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
          />
          <div className="flex items-center gap-3">
            <Input
              placeholder="Age"
              type="number"
              value={state.age || ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "age",
                  value: Number(e.target.value),
                })
              }
              className="w-24"
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={state.newsletter}
                onCheckedChange={(checked) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "newsletter",
                    value: checked,
                  })
                }
              />
              <span className="text-sm">Newsletter</span>
            </div>
            <Button
              variant={state.theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            >
              {state.theme === "light" ? "Light" : "Dark"}
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-green-600 dark:text-green-400">
          All state transitions go through <code>dispatch</code> → the reducer
          decides what happens!
        </p>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset All (1 dispatch call!)
          </Button>
        </div>

        <CodeBlock code={cleanCode} filename="clean-form.tsx" />
      </div>
    </GlowCard>
  );
}
