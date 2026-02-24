import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Check } from "lucide-react";

export function VaultBriefing() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <X className="size-5" />
              Unlocked Vault
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Anyone with a ref walks straight into the vault — full access to
                every asset
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Parent can modify styles, remove elements, and override
                attributes at will
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                No security boundary between parent and child component
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Check className="size-5" />
              Teller Window
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Customers interact through a secure window — only approved
                transactions go through
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Internal vault operations stay hidden behind the counter
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Clean API boundary keeps the component&apos;s internals
                protected
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        useImperativeHandle is your bank&apos;s teller window — the customer
        gets deposit, withdraw, and check balance, not the vault key.
      </p>
    </div>
  );
}
