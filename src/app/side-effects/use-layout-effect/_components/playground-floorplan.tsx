"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

const ROOMS = [
  { id: "bedroom", label: "Bedroom", col: 0, row: 0, w: 2, h: 2, area: "12' × 14'", note: "Master suite" },
  { id: "kitchen", label: "Kitchen", col: 2, row: 0, w: 2, h: 1, area: "10' × 8'", note: "Open plan island" },
  { id: "bath", label: "Bath", col: 2, row: 1, w: 1, h: 1, area: "8' × 6'", note: "Full bathroom" },
  { id: "closet", label: "Closet", col: 3, row: 1, w: 1, h: 1, area: "5' × 6'", note: "Walk-in" },
  { id: "living", label: "Living", col: 0, row: 2, w: 3, h: 1, area: "18' × 10'", note: "Main living area" },
  { id: "balcony", label: "Balcony", col: 3, row: 2, w: 1, h: 1, area: "6' × 8'", note: "Outdoor space" },
];

const CELL = 72; // px per grid cell
const GAP = 3;
const GRID_COLS = 4;
const GRID_ROWS = 3;

const code = `// useLayoutEffect — annotation positioned BEFORE paint
useLayoutEffect(() => {
  if (!selected || !planRef.current) return;
  const roomEl = planRef.current.querySelector(\`[data-room="\${selected}"]\`);
  const planRect = planRef.current.getBoundingClientRect();
  const roomRect = roomEl.getBoundingClientRect();
  setAnnotationPos({
    top: roomRect.top - planRect.top,
    left: roomRect.right - planRect.left + 8,
  });
}, [selected]);

// useEffect — annotation flashes at (0,0) then jumps!
useEffect(() => {
  // Same measurement, but runs AFTER paint
  setTimeout(() => { /* ...measure & position... */ }, 50);
}, [selected]);`;

export function PlaygroundFloorplan() {
  const [selected, setSelected] = useState<string | null>(null);
  const [useLayout, setUseLayout] = useState(true);
  const [annotationPos, setAnnotationPos] = useState({ top: 0, left: 0 });
  const planRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    if (!selected || !planRef.current) return;
    const roomEl = planRef.current.querySelector(
      `[data-room="${selected}"]`
    ) as HTMLElement | null;
    if (!roomEl) return;
    const planRect = planRef.current.getBoundingClientRect();
    const roomRect = roomEl.getBoundingClientRect();

    // Position to the right of the room if there's space, otherwise to the left
    const rightSpace = planRect.right - roomRect.right;
    let left: number;
    if (rightSpace > 140) {
      left = roomRect.right - planRect.left + 8;
    } else {
      left = roomRect.left - planRect.left - 140;
    }

    setAnnotationPos({
      top: roomRect.top - planRect.top,
      left,
    });
  }, [selected]);

  // useLayoutEffect path — positions annotation BEFORE paint
  useLayoutEffect(() => {
    if (useLayout && selected) {
      measure();
    }
  }, [selected, useLayout, measure]);

  // useEffect path — positions annotation AFTER paint (visible flash)
  useEffect(() => {
    if (!useLayout && selected) {
      const timeout = setTimeout(measure, 50);
      return () => clearTimeout(timeout);
    }
  }, [selected, useLayout, measure]);

  function handleRoomClick(roomId: string) {
    if (selected === roomId) {
      setSelected(null);
      return;
    }
    // Reset position to (0,0) so the flash is visible in useEffect mode
    setAnnotationPos({ top: 0, left: 0 });
    setSelected(roomId);
  }

  const selectedRoom = ROOMS.find((r) => r.id === selected);

  const planWidth = GRID_COLS * CELL + (GRID_COLS - 1) * GAP;
  const planHeight = GRID_ROWS * CELL + (GRID_ROWS - 1) * GAP;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Floorplan Annotations
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {useLayout ? "useLayoutEffect" : "useEffect"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch checked={useLayout} onCheckedChange={setUseLayout} />
          <span className="text-sm">
            {useLayout
              ? "useLayoutEffect (instant position)"
              : "useEffect (watch it flash!)"}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Click any room to see its annotation. Toggle to useEffect and click
          different rooms — the annotation card flashes at the top-left corner
          before jumping to the right spot.
        </p>

        {/* Floorplan */}
        <div className="flex justify-center overflow-x-auto py-2">
          <div
            ref={planRef}
            className="relative rounded-lg p-3"
            style={{
              width: planWidth + 24,
              height: planHeight + 24,
              backgroundColor: "#0f172a",
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(59,130,246,0.06) 0 1px, transparent 1px 18px), repeating-linear-gradient(90deg, rgba(59,130,246,0.06) 0 1px, transparent 1px 18px)",
            }}
          >
            {/* Grid rooms */}
            {ROOMS.map((room) => {
              const isSelected = selected === room.id;
              return (
                <button
                  key={room.id}
                  data-room={room.id}
                  onClick={() => handleRoomClick(room.id)}
                  className="absolute flex flex-col items-center justify-center rounded transition-colors cursor-pointer border"
                  style={{
                    left: 12 + room.col * (CELL + GAP),
                    top: 12 + room.row * (CELL + GAP),
                    width: room.w * CELL + (room.w - 1) * GAP,
                    height: room.h * CELL + (room.h - 1) * GAP,
                    backgroundColor: isSelected
                      ? "rgba(59, 130, 246, 0.2)"
                      : "rgba(30, 41, 59, 0.8)",
                    borderColor: isSelected
                      ? "#3b82f6"
                      : "rgba(59, 130, 246, 0.2)",
                    borderWidth: isSelected ? 2 : 1,
                  }}
                >
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: isSelected ? "#60a5fa" : "#64748b" }}
                  >
                    {room.label}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {room.area}
                  </span>
                </button>
              );
            })}

            {/* Annotation card */}
            {selected && selectedRoom && (
              <div
                className="absolute z-10 rounded-md border shadow-lg p-3 w-[130px]"
                style={{
                  top: annotationPos.top,
                  left: annotationPos.left,
                  backgroundColor: "#1e293b",
                  borderColor: "#3b82f6",
                  transition: useLayout ? "none" : "none",
                }}
              >
                <div className="text-xs font-mono font-bold text-blue-400 mb-1">
                  {selectedRoom.label}
                </div>
                <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                  <div>Area: {selectedRoom.area}</div>
                  <div>{selectedRoom.note}</div>
                </div>
                {/* Connector line hint */}
                <div
                  className="absolute top-3 w-2 h-px"
                  style={{
                    backgroundColor: "#3b82f6",
                    left: annotationPos.left > 150 ? "auto" : -8,
                    right: annotationPos.left > 150 ? -8 : "auto",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <CodeBlock code={code} filename="floorplan-annotation.tsx" />
      </CardContent>
    </Card>
  );
}
