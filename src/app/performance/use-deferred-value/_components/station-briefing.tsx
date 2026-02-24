import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Check } from "lucide-react";

export function StationBriefing() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <X className="size-5" />
              Overloaded Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Every schedule recompute freezes the information desk — input
                locks up
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Typing is broken — each keystroke waits for 15,000 departures to
                filter
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                No way to show travelers that fresh data is loading
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Check className="size-5" />
              Smart Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Information desk stays open — input responds instantly while the
                board catches up
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Board shows last known schedule while fresh data loads in the
                background
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Stale indicator tells travelers the board is updating
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        useDeferredValue is your station&apos;s smart display — it shows the
        last schedule while the new one loads, keeping the information desk
        responsive.
      </p>
    </div>
  );
}
