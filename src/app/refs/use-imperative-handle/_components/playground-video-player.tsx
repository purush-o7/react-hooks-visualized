"use client";

import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

type VideoHandle = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (level: number) => void;
};

const VideoPlayer = forwardRef<VideoHandle>(
  function VideoPlayer(_props, ref) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(80);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

    useImperativeHandle(ref, () => ({
      play() {
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
          setCurrentTime((t) => {
            if (t >= 100) {
              clearInterval(intervalRef.current!);
              setIsPlaying(false);
              return 0;
            }
            return t + 1;
          });
        }, 100);
      },
      pause() {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      },
      seek(time: number) {
        setCurrentTime(Math.max(0, Math.min(100, time)));
      },
      setVolume(level: number) {
        setVolume(Math.max(0, Math.min(100, level)));
      },
    }));

    return (
      <div className="rounded-lg bg-muted/50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={isPlaying ? "default" : "outline"} className="text-xs">
            {isPlaying ? "Playing" : "Paused"}
          </Badge>
          <span className="text-xs font-mono text-muted-foreground">
            Internal component state
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs w-16">Progress</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${currentTime}%` }}
              />
            </div>
            <span className="text-xs font-mono w-8">{currentTime}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs w-16">Volume</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${volume}%` }}
              />
            </div>
            <span className="text-xs font-mono w-8">{volume}%</span>
          </div>
        </div>
      </div>
    );
  }
);

const code = `const VideoPlayer = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play()  { setIsPlaying(true); /* start timer */ },
    pause() { setIsPlaying(false); /* stop timer */ },
    seek(time)     { setCurrentTime(time); },
    setVolume(lvl) { setVolume(lvl); },
  }));

  // Parent CANNOT access internal state directly
  // Only the 4 methods above are available
  return <div>...</div>;
});

// Parent controls:
videoRef.current.play();
videoRef.current.setVolume(50);`;

export function PlaygroundVideoPlayer() {
  const videoRef = useRef<VideoHandle>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Custom Video Controls
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Imperative API
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <VideoPlayer ref={videoRef} />

        <div className="space-y-2">
          <p className="text-sm font-medium">Parent controls (via ref):</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => videoRef.current?.play()}>
              Play
            </Button>
            <Button variant="outline" size="sm" onClick={() => videoRef.current?.pause()}>
              Pause
            </Button>
            <Button variant="outline" size="sm" onClick={() => videoRef.current?.seek(0)}>
              Rewind
            </Button>
            <Button variant="outline" size="sm" onClick={() => videoRef.current?.seek(50)}>
              Seek 50%
            </Button>
            <Button variant="outline" size="sm" onClick={() => videoRef.current?.setVolume(100)}>
              Max Volume
            </Button>
            <Button variant="outline" size="sm" onClick={() => videoRef.current?.setVolume(20)}>
              Low Volume
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          The parent can only call play, pause, seek, and setVolume. It cannot
          access the internal timer, state, or DOM elements.
        </p>

        <CodeBlock code={code} filename="video-player.tsx" />
      </CardContent>
    </Card>
  );
}
