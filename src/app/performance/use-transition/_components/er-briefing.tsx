import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Check } from "lucide-react";

export function ERBriefing() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <X className="size-5" />
              Overwhelmed ER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Every update blocks the hotline — input freezes while records
                render
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Typing feels broken — each keystroke waits for 10,000 records to
                filter
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                No priority system — urgent and routine cases fight for the same
                thread
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Check className="size-5" />
              Triage System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Hotline stays open — input updates instantly while records catch
                up
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                isPending signals when the waiting room is still processing
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Urgent updates (typing) always jump ahead of heavy renders
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        useTransition is your ER&apos;s triage nurse — it keeps the hotline open
        while heavy patient records process in the background.
      </p>
    </div>
  );
}
