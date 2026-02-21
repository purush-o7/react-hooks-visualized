"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😎", label: "Cool" },
  { emoji: "🤔", label: "Thinking" },
  { emoji: "😴", label: "Sleepy" },
];

const colors = [
  { value: "#ef4444", label: "Red" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#22c55e", label: "Green" },
  { value: "#a855f7", label: "Purple" },
];

const accessories = [
  { emoji: "🎩", label: "Top Hat" },
  { emoji: "👑", label: "Crown" },
  { emoji: "🎀", label: "Bow" },
  { emoji: "🕶️", label: "Shades" },
];

interface Character {
  name: string;
  mood: string;
  color: string;
  accessory: string;
}

export function PlaygroundCharacterCreator() {
  const [character, setCharacter] = useState<Character>({
    name: "Hooky",
    mood: "😊",
    color: "#3b82f6",
    accessory: "🎩",
  });

  const code = `const [character, setCharacter] = useState({
  name: "${character.name}",
  mood: "${character.mood}",
  color: "${character.color}",
  accessory: "${character.accessory}",
});

// Always spread! Otherwise you lose other fields:
setCharacter(prev => ({ ...prev, mood: "${character.mood}" }));

// Without spread:
// setCharacter({ mood: "${character.mood}" });
// name, color, accessory → GONE`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎭</span>
          Character Creator
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Complex Object State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Character Preview */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div
              className="size-32 rounded-full flex items-center justify-center text-5xl transition-colors duration-300 relative"
              style={{ backgroundColor: character.color + "30" }}
            >
              <div
                className="size-24 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: character.color + "50" }}
              >
                {character.mood}
              </div>
              {/* Accessory */}
              <span className="absolute -top-2 -right-1 text-2xl">
                {character.accessory}
              </span>
            </div>
            <span className="font-bold text-lg">
              {character.name || "???"}
            </span>
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={character.name}
                onChange={(e) =>
                  setCharacter((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter a name..."
              />
            </div>

            {/* Mood */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mood</label>
              <div className="flex gap-2">
                {moods.map((m) => (
                  <Button
                    key={m.label}
                    variant={character.mood === m.emoji ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setCharacter((prev) => ({ ...prev, mood: m.emoji }))
                    }
                    title={m.label}
                  >
                    {m.emoji}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Color</label>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    className="size-8 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: c.value,
                      outline:
                        character.color === c.value
                          ? `3px solid ${c.value}`
                          : "none",
                      outlineOffset: "2px",
                    }}
                    onClick={() =>
                      setCharacter((prev) => ({ ...prev, color: c.value }))
                    }
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Accessory */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Accessory</label>
              <div className="flex gap-2">
                {accessories.map((a) => (
                  <Button
                    key={a.label}
                    variant={
                      character.accessory === a.emoji ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setCharacter((prev) => ({
                        ...prev,
                        accessory: a.emoji,
                      }))
                    }
                    title={a.label}
                  >
                    {a.emoji}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CodeBlock code={code} filename="character-creator.tsx" />
      </CardContent>
    </Card>
  );
}
