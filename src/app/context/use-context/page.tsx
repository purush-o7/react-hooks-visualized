"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { CourierChain } from "./_components/courier-chain";
import { EncryptedChannel } from "./_components/encrypted-channel";
import { SpyPlaybook } from "./_components/spy-playbook";
import { PlaygroundSafeHouse } from "./_components/playground-safe-house";
import { PlaygroundAgentDossier } from "./_components/playground-agent-dossier";
import { PlaygroundCodeLanguage } from "./_components/playground-code-language";

const USE_CONTEXT_MISTAKES: Mistake[] = [
  {
    title: "Unmemoized provider value",
    subtitle: "Passing a new object literal as the context value on every render",
    filename: "spy-provider.tsx",
    wrongCode: `function SpyNetworkProvider({ children }) {
  const [agents, setAgents] = useState([]);

  // New object on every render — ALL consumers re-render
  return (
    <SpyContext.Provider value={{ agents, setAgents }}>
      {children}
    </SpyContext.Provider>
  );
}`,
    rightCode: `function SpyNetworkProvider({ children }) {
  const [agents, setAgents] = useState([]);

  const value = useMemo(
    () => ({ agents, setAgents }),
    [agents]
  );

  return (
    <SpyContext.Provider value={value}>
      {children}
    </SpyContext.Provider>
  );
}`,
    explanation:
      "Context uses reference equality to detect changes. If you pass a new object literal as the value, every consumer re-renders on every provider re-render — even if the data inside hasn't changed. Wrap the value in useMemo so the reference only changes when the actual data changes.",
  },
  {
    title: "One giant context for everything",
    subtitle: "Putting all app state in a single context provider",
    filename: "app-context.tsx",
    wrongCode: `// Every consumer re-renders when ANY field changes
const AppContext = createContext(null);

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState([]);

  return (
    <AppContext.Provider value={{
      user, setUser, theme, setTheme, notifications, setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
}`,
    rightCode: `// Split into focused contexts
const UserContext = createContext(null);
const ThemeContext = createContext(null);
const NotificationContext = createContext(null);

function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}`,
    explanation:
      "When everything lives in one context, a change to any field triggers a re-render in every consumer — even components that only need the theme will re-render when notifications update. Split your context into focused providers so consumers only subscribe to the data they actually use.",
  },
  {
    title: "Using context without a provider",
    subtitle: "Consuming a context that has no provider above it in the tree",
    filename: "agent.tsx",
    wrongCode: `const SpyContext = createContext(undefined);

function AgentCard() {
  // No SpyProvider above this component — gets undefined
  const ctx = useContext(SpyContext);
  return <div>{ctx.agentName}</div>; // TypeError!
}

// Rendered without wrapping in a provider
function App() {
  return <AgentCard />;
}`,
    rightCode: `const SpyContext = createContext(undefined);

function useSpyContext() {
  const ctx = useContext(SpyContext);
  if (ctx === undefined) {
    throw new Error("useSpyContext must be used within a SpyProvider");
  }
  return ctx;
}

function AgentCard() {
  const { agentName } = useSpyContext(); // clear error if missing
  return <div>{agentName}</div>;
}`,
    explanation:
      "If no provider exists above the consumer in the component tree, useContext returns the default value passed to createContext (often undefined or null). This usually leads to a silent bug or a runtime crash. Create a custom hook that throws a descriptive error when the provider is missing.",
  },
];

export default function UseContextPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useContext</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if a field agent could receive classified intel without a single
          courier?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🕵️</span> Theme: Spy Network
          </p>
          <p className="text-sm text-muted-foreground">
            Your app is a spy network. Prop drilling is like passing classified
            documents through a chain of couriers &mdash; every intermediary
            handles the secret. useContext is an encrypted radio channel: HQ
            (Provider) broadcasts intel, and any field agent (consumer) tunes in
            directly. No couriers, no leaks, no middlemen.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Courier Chain */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Courier Chain</h2>
          <p className="text-muted-foreground">
            Prop drilling is like passing classified documents through a chain of
            couriers — every intermediary sees the secret, and each one is a
            liability.
          </p>
          <CourierChain />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Encrypted Channel */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Encrypted Channel</h2>
          <p className="text-muted-foreground">
            useContext creates an encrypted channel — HQ broadcasts directly to
            the field agent. No intermediaries, no leaks.
          </p>
          <EncryptedChannel />
        </section>
      </ScrollReveal>

      {/* Section 3: The Spy Playbook */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">The Spy Playbook</h2>
          <SpyPlaybook />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 4: Field Operations */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Field Operations</h2>
            <p className="text-muted-foreground">
              Every spy needs field practice. Try these operations — each one uses
              context to share intel across the network.
            </p>
          </div>

          <PlaygroundSafeHouse />
          <PlaygroundAgentDossier />
          <PlaygroundCodeLanguage />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_CONTEXT_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
