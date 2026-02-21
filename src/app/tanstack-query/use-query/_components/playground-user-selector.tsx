"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Loader2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
}

const code = `const [userId, setUserId] = useState(1);

const { data: user, isPending, isFetching } = useQuery({
  queryKey: ["user", userId],  // Different key per user!
  queryFn: () =>
    fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`)
      .then(res => res.json()),
});

// Switch to user 2 → new query key → fetch
// Switch BACK to user 1 → cached! Instant.`;

export function PlaygroundUserSelector() {
  const [userId, setUserId] = useState(1);

  const { data: user, isPending, isFetching } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      ).then((res) => res.json()),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">👤</span>
          User Selector
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Dynamic Keys
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select a user — previously fetched users load instantly from cache!
        </p>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((id) => (
            <Button
              key={id}
              variant={userId === id ? "default" : "outline"}
              size="sm"
              onClick={() => setUserId(id)}
            >
              User {id}
            </Button>
          ))}
        </div>

        <div className="rounded-lg bg-muted/50 p-4 min-h-[120px]">
          {isPending ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading user...
            </div>
          ) : user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="font-medium">{user.name}</p>
                {isFetching && (
                  <Loader2 className="size-3 animate-spin text-muted-foreground" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs font-medium text-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Phone</p>
                  <p>{user.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Website</p>
                  <p>{user.website}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Company</p>
                  <p>{user.company.name}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Query key: <code>[&quot;user&quot;, {userId}]</code>
          {!isPending && !isFetching && " — cached!"}
        </p>

        <CodeBlock code={code} filename="user-selector.tsx" />
      </CardContent>
    </Card>
  );
}
