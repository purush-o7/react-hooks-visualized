"use client";

import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";

const contextCode = `// 1. Create the context
const UserContext = createContext(null);

// 2. Provide at the top
function App() {
  const [user] = useState({ name: "Alice" });
  return (
    <UserContext.Provider value={user}>
      <Layout />   {/* no props! */}
    </UserContext.Provider>
  );
}

function Layout() { return <Sidebar />; }    // clean!
function Sidebar() { return <UserMenu />; }  // clean!
function UserMenu() { return <Avatar />; }   // clean!

// 3. Consume anywhere
function Avatar() {
  const user = useContext(UserContext);  // teleported!
  return <span>{user.name}</span>;
}`;

const levels = [
  { name: "App + Provider", isProvider: true, isConsumer: false },
  { name: "Layout", isProvider: false, isConsumer: false },
  { name: "Sidebar", isProvider: false, isConsumer: false },
  { name: "UserMenu", isProvider: false, isConsumer: false },
  { name: "Avatar", isProvider: false, isConsumer: true },
];

export function ContextSolution() {
  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            TELEPORT
          </Badge>
          <span className="text-sm text-muted-foreground">
            Data skips the middle layers entirely
          </span>
        </div>

        {/* Visual tree */}
        <div className="space-y-1 relative">
          {levels.map((level, i) => (
            <div
              key={level.name}
              className="flex items-center gap-3 rounded-lg p-2"
              style={{ paddingLeft: `${i * 24 + 8}px` }}
            >
              <code className="font-mono text-sm font-bold">
                {level.name}
              </code>
              {level.isProvider && (
                <Badge className="bg-green-600 text-[10px] px-1.5 py-0">
                  provides user
                </Badge>
              )}
              {level.isConsumer && (
                <Badge className="bg-blue-600 text-[10px] px-1.5 py-0">
                  useContext(UserContext)
                </Badge>
              )}
              {!level.isProvider && !level.isConsumer && (
                <span className="text-xs text-green-600">
                  no props needed!
                </span>
              )}
            </div>
          ))}

          {/* Visual "teleport" arrow */}
          <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-green-500 to-blue-500 opacity-30 rounded" />
        </div>

        <p className="text-center text-sm text-green-600 dark:text-green-400">
          Provider at the top → useContext at the bottom. Middle layers
          don&apos;t know or care!
        </p>

        <CodeBlock code={contextCode} filename="with-context.tsx" />
      </div>
    </GlowCard>
  );
}
