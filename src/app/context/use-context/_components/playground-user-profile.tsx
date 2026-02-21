"use client";

import { createContext, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

interface UserData {
  name: string;
  role: string;
  avatar: string;
}

const UserCtx = createContext<UserData>({
  name: "",
  role: "",
  avatar: "👤",
});

const avatars = ["👤", "🧑‍💻", "🎨", "🚀"];

function HeaderBar() {
  const user = useContext(UserCtx);
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
      <span className="text-sm font-medium">Header</span>
      <div className="flex items-center gap-2">
        <span>{user.avatar}</span>
        <span className="text-sm">{user.name || "Anonymous"}</span>
      </div>
    </div>
  );
}

function Sidebar() {
  const user = useContext(UserCtx);
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <p className="text-xs text-muted-foreground">Sidebar</p>
      <p className="text-sm">
        {user.avatar} {user.name || "Anonymous"}
      </p>
      <Badge variant="outline" className="text-xs">
        {user.role || "No role"}
      </Badge>
    </div>
  );
}

function ProfileCard() {
  const user = useContext(UserCtx);
  return (
    <div className="rounded-lg border p-4 text-center space-y-2">
      <p className="text-3xl">{user.avatar}</p>
      <p className="font-bold">{user.name || "Anonymous"}</p>
      <Badge>{user.role || "No role"}</Badge>
      <p className="text-xs text-muted-foreground">
        All 3 components read from UserContext
      </p>
    </div>
  );
}

const code = `const UserCtx = createContext({ name: "", role: "", avatar: "👤" });

function App() {
  const [user, setUser] = useState({ name: "Alice", role: "Dev", avatar: "🧑‍💻" });
  return (
    <UserCtx.Provider value={user}>
      <HeaderBar />    {/* reads user.name */}
      <Sidebar />      {/* reads user.role */}
      <ProfileCard />  {/* reads everything */}
    </UserCtx.Provider>
  );
}`;

export function PlaygroundUserProfile() {
  const [user, setUser] = useState<UserData>({
    name: "Alice",
    role: "Developer",
    avatar: "🧑‍💻",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">👤</span>
          User Profile
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Shared State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Edit the user below — all consumers update instantly.
        </p>

        {/* Edit controls */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Name"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            placeholder="Role"
            value={user.role}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, role: e.target.value }))
            }
          />
        </div>
        <div className="flex gap-2">
          {avatars.map((a) => (
            <button
              key={a}
              className="text-2xl p-1 rounded transition-all"
              style={{
                outline:
                  user.avatar === a ? "2px solid hsl(var(--primary))" : "none",
                outlineOffset: "2px",
              }}
              onClick={() => setUser((prev) => ({ ...prev, avatar: a }))}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Consumer components */}
        <UserCtx.Provider value={user}>
          <div className="space-y-3">
            <HeaderBar />
            <div className="grid grid-cols-2 gap-3">
              <Sidebar />
              <ProfileCard />
            </div>
          </div>
        </UserCtx.Provider>

        <CodeBlock code={code} filename="user-context.tsx" />
      </CardContent>
    </Card>
  );
}
