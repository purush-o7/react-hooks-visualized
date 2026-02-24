"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { BrokenDJ } from "./_components/broken-dj";
import { FixedDJ } from "./_components/fixed-dj";
import { DependencyGuideDJ } from "./_components/dependency-guide-dj";
import { PlaygroundNowPlaying } from "./_components/playground-now-playing";
import { PlaygroundBeatLoop } from "./_components/playground-beat-loop";
import { PlaygroundKeyboardShortcuts } from "./_components/playground-keyboard-shortcuts";

const USE_EFFECT_MISTAKES: Mistake[] = [
  {
    title: "Missing dependency array",
    subtitle: "Omitting the dependency array causes the effect to run every render",
    filename: "player.tsx",
    wrongCode: `function NowPlaying({ trackId }) {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    fetch(\`/api/tracks/\${trackId}\`)
      .then(res => res.json())
      .then(data => setTrack(data));
  }); // no dependency array — runs after EVERY render

  return <div>{track?.name}</div>;
}`,
    rightCode: `function NowPlaying({ trackId }) {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    fetch(\`/api/tracks/\${trackId}\`)
      .then(res => res.json())
      .then(data => setTrack(data));
  }, [trackId]); // only re-runs when trackId changes

  return <div>{track?.name}</div>;
}`,
    explanation:
      "Without a dependency array, React has no way to know when to skip re-running the effect. If the effect updates state, it triggers a re-render which triggers the effect again — an infinite loop. Use [] for mount-only effects, or list the specific values the effect depends on.",
  },
  {
    title: "Forgetting cleanup (memory leaks)",
    subtitle: "Setting up subscriptions or timers without tearing them down",
    filename: "beat-loop.tsx",
    wrongCode: `function BeatLoop({ bpm }) {
  useEffect(() => {
    const id = setInterval(() => {
      playBeat();
    }, 60000 / bpm);
    // no cleanup — interval runs forever, even after unmount
  }, [bpm]);

  return <div>BPM: {bpm}</div>;
}`,
    rightCode: `function BeatLoop({ bpm }) {
  useEffect(() => {
    const id = setInterval(() => {
      playBeat();
    }, 60000 / bpm);

    return () => clearInterval(id); // cleanup on unmount or bpm change
  }, [bpm]);

  return <div>BPM: {bpm}</div>;
}`,
    explanation:
      "When the component unmounts or the effect re-runs, the old interval/listener keeps firing. This causes memory leaks, duplicate listeners, and attempts to update unmounted components. Always return a cleanup function that tears down whatever the effect set up.",
  },
  {
    title: "Objects or arrays as dependencies",
    subtitle: "Passing a new object/array literal into the dependency array",
    filename: "player.tsx",
    wrongCode: `function Playlist({ userId }) {
  const options = { includeHidden: true, userId };

  useEffect(() => {
    fetchPlaylist(options);
  }, [options]); // new object every render = infinite loop!

  return <div>Loading...</div>;
}`,
    rightCode: `function Playlist({ userId }) {
  useEffect(() => {
    const options = { includeHidden: true, userId };
    fetchPlaylist(options);
  }, [userId]); // depend on the primitive, not the object

  return <div>Loading...</div>;
}`,
    explanation:
      "React compares dependencies with Object.is() (reference equality). A new object {} or array [] is created on every render, so it always looks 'different' — causing the effect to re-run infinitely. Depend on primitive values instead, or memoize the object with useMemo.",
  },
  {
    title: "Using async directly as the effect callback",
    subtitle: "Marking the useEffect callback function as async",
    filename: "player.tsx",
    wrongCode: `function NowPlaying({ trackId }) {
  // async callback returns a Promise, not a cleanup function
  useEffect(async () => {
    const res = await fetch(\`/api/tracks/\${trackId}\`);
    const data = await res.json();
    setTrack(data);
  }, [trackId]);
}`,
    rightCode: `function NowPlaying({ trackId }) {
  useEffect(() => {
    async function loadTrack() {
      const res = await fetch(\`/api/tracks/\${trackId}\`);
      const data = await res.json();
      setTrack(data);
    }
    loadTrack();
  }, [trackId]);
}`,
    explanation:
      "useEffect expects its callback to return either undefined or a cleanup function. An async function always returns a Promise, so React can never call your cleanup. Define an inner async function and call it immediately instead.",
  },
];

export default function UseEffectPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useEffect</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          React renders UI. But who handles the music? Timers, subscriptions,
          events — the DJ booth of your component.
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🎧</span> Theme: DJ Booth
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a DJ booth. Rendering is dropping the beat
            &mdash; but side effects (timers, API calls, event listeners) are
            the equipment setup. useEffect is your roadie: it wires up gear
            after each performance and tears it down before the next set,
            keeping the booth clean.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Chaotic DJ */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Chaotic DJ</h2>
          <p className="text-muted-foreground">
            What happens when you drop a beat directly in the component body?
            Every render starts a new track without stopping the old one — pure
            noise.
          </p>
          <BrokenDJ />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Pro DJ */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Pro DJ: useEffect</h2>
          <p className="text-muted-foreground">
            useEffect runs your code AFTER render, and the cleanup function stops
            the old beat before the next one plays. One clean track at a time.
          </p>
          <FixedDJ />
        </section>
      </ScrollReveal>

      {/* Section 3: The Mixing Board */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">The Mixing Board</h2>
          <DependencyGuideDJ />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 4: Playground */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useEffect connects React to the outside world — the browser tab,
              intervals, event listeners, and more. Spin these decks.
            </p>
          </div>

          <PlaygroundNowPlaying />
          <PlaygroundBeatLoop />
          <PlaygroundKeyboardShortcuts />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_EFFECT_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
