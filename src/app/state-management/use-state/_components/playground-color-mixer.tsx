"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

export function PlaygroundColorMixer() {
  const [color, setColor] = useState({ r: 99, g: 102, b: 241 });

  const bgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
  const hex = rgbToHex(color.r, color.g, color.b);

  const code = `const [color, setColor] = useState({ r: ${color.r}, g: ${color.g}, b: ${color.b} });

// Update just one channel — spread keeps the rest!
setColor(prev => ({ ...prev, r: ${color.r} }));
//         ^^^^^^^^ without this, g and b would be lost`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          Color Mixer
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Object State + Spread
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          {/* Color preview */}
          <div
            className="size-32 rounded-xl shadow-lg transition-colors duration-200 shrink-0"
            style={{ backgroundColor: bgColor }}
          />

          {/* Sliders */}
          <div className="flex-1 w-full space-y-3">
            {/* Red */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-red-500">Red</span>
                <span className="font-mono text-muted-foreground">
                  {color.r}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={255}
                value={color.r}
                onChange={(e) =>
                  setColor((prev) => ({ ...prev, r: Number(e.target.value) }))
                }
                className="w-full accent-red-500"
              />
            </div>

            {/* Green */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-green-500">Green</span>
                <span className="font-mono text-muted-foreground">
                  {color.g}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={255}
                value={color.g}
                onChange={(e) =>
                  setColor((prev) => ({ ...prev, g: Number(e.target.value) }))
                }
                className="w-full accent-green-500"
              />
            </div>

            {/* Blue */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-blue-500">Blue</span>
                <span className="font-mono text-muted-foreground">
                  {color.b}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={255}
                value={color.b}
                onChange={(e) =>
                  setColor((prev) => ({ ...prev, b: Number(e.target.value) }))
                }
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Color values */}
        <div className="flex gap-2 justify-center">
          <Badge variant="outline" className="font-mono">
            {bgColor}
          </Badge>
          <Badge variant="outline" className="font-mono">
            {hex}
          </Badge>
        </div>

        <CodeBlock code={code} filename="color-mixer.tsx" />
      </CardContent>
    </Card>
  );
}
