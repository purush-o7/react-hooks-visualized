import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-8">
        <span className="text-[8rem] font-bold leading-none tracking-tighter text-muted-foreground/20">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-mono text-muted-foreground">
            &lt;ComponentNotFound /&gt;
          </span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Lost in the Component Tree</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        This route doesn&apos;t exist — like a component that was never rendered.
        Let&apos;s navigate you back to familiar territory.
      </p>

      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="size-4 mr-2" />
            Home
          </Link>
        </Button>
      </div>

      <div className="mt-12 rounded-lg bg-muted/30 border border-border/50 p-4 font-mono text-xs text-muted-foreground max-w-sm">
        <p className="text-red-400">Error: Cannot find module</p>
        <p>&nbsp;&nbsp;at resolveRoute (next/router)</p>
        <p>&nbsp;&nbsp;at renderPage (next/server)</p>
        <p className="text-muted-foreground/50 mt-2">
          // Try checking the URL or navigating home
        </p>
      </div>
    </div>
  );
}
