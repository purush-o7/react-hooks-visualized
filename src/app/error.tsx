"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-8">
        <span className="text-[8rem] font-bold leading-none tracking-tighter text-red-500/20">
          !
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-mono text-red-400">
            throw new Error()
          </span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Something Broke</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        An unhandled error crashed this component. Like a useEffect without a
        try/catch — let&apos;s recover.
      </p>

      <div className="flex gap-3">
        <Button onClick={reset}>
          <RotateCcw className="size-4 mr-2" />
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="size-4 mr-2" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
