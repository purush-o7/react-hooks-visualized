import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Check } from "lucide-react";

export function PhoneBriefing() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <X className="size-5" />
              Redial Frenzy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                New button engraved every render — contact list thinks contacts
                changed
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                memo() can&apos;t help — the button serial is always different
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Child re-renders every time parent updates, even for unrelated
                changes
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Check className="size-5" />
              Speed Dial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Same button, same serial — contact list skips the re-render
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                memo() works perfectly — stable reference means stable child
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Updates only when the actual contacts change
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        useCallback is your phone&apos;s speed dial — it keeps the same button
        until the contacts actually change, so memo&apos;d children don&apos;t
        re-render needlessly.
      </p>
    </div>
  );
}
