"use client";

import { X, Check } from "lucide-react";

export function MissionBriefing() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem side */}
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-5 space-y-3">
          <h3 className="font-bold text-red-400">Chaotic Ground Control</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <span>5 operators, 5 radios — no shared protocol</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <span>Abort requires calling every station manually</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <span>System logic scattered across operators</span>
            </li>
          </ul>
        </div>

        {/* Solution side */}
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-5 space-y-3">
          <h3 className="font-bold text-green-400">Flight Commander Protocol</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>All commands go through one Flight Computer</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>Abort = single ABORT command</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>All logic centralized in the reducer</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        useReducer is like a Flight Commander — all state changes are commands
        routed through one Flight Computer.
      </p>
    </div>
  );
}
