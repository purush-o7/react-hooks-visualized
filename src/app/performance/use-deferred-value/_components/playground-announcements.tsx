"use client";

import { useState, useDeferredValue } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";

const INITIAL_ANNOUNCEMENT = `ATTENTION ALL PASSENGERS

Platform Change: The 14:30 service to Edinburgh Waverley will now depart from Platform 7 instead of Platform 3.

Delay Notice: The 15:15 service to Manchester Piccadilly is delayed by approximately 20 minutes due to signaling issues at Crewe.

Service Update: All services to Bristol Temple Meads are running on time. Please check the departure board for your platform number.

Lost Property: A blue backpack was found on the 12:45 arrival from Birmingham. Please collect from the information desk.

Safety Reminder: Please keep your belongings with you at all times. Report any unattended luggage to station staff immediately.`;

function formatAnnouncement(text: string): string {
  let result = text;
  for (let pass = 0; pass < 50; pass++) {
    result = result
      .replace(
        /^(ATTENTION.*)/gm,
        `<div class="text-lg font-bold text-yellow-500 mb-2">$1</div>`
      )
      .replace(
        /^(Platform Change:)/gm,
        `<span class="font-bold text-amber-500">$1</span>`
      )
      .replace(
        /^(Delay Notice:)/gm,
        `<span class="font-bold text-red-500">$1</span>`
      )
      .replace(
        /^(Service Update:)/gm,
        `<span class="font-bold text-green-500">$1</span>`
      )
      .replace(
        /^(Lost Property:)/gm,
        `<span class="font-bold text-blue-500">$1</span>`
      )
      .replace(
        /^(Safety Reminder:)/gm,
        `<span class="font-bold text-orange-500">$1</span>`
      )
      .replace(
        /Platform (\d+)/g,
        `<span class="font-mono text-yellow-500">Platform $1</span>`
      )
      .replace(
        /(\d{2}:\d{2})/g,
        `<span class="font-mono text-teal-500">$1</span>`
      );
  }
  return result;
}

const announcementCode = `const deferredAnnouncement = useDeferredValue(announcement);
const display = formatAnnouncement(deferredAnnouncement);
const isStale = announcement !== deferredAnnouncement;
// Composer is instant, platform display follows behind`;

export function PlaygroundAnnouncements() {
  const [announcement, setAnnouncement] = useState(INITIAL_ANNOUNCEMENT);
  const deferredAnnouncement = useDeferredValue(announcement);

  const formatted = formatAnnouncement(deferredAnnouncement);
  const isStale = announcement !== deferredAnnouncement;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="megaphone">
            📢
          </span>
          Station Announcements
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Live Preview
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Composer
              </p>
              <Badge
                variant="outline"
                className="border-green-500 text-green-500 font-mono text-[10px]"
              >
                Instant
              </Badge>
            </div>
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full h-[250px] rounded-lg border bg-muted/50 p-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Platform Display
              </p>
              {isStale ? (
                <Badge
                  variant="outline"
                  className="border-amber-500 text-amber-500 font-mono text-[10px] animate-pulse"
                >
                  Broadcasting...
                </Badge>
              ) : (
                deferredAnnouncement && (
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-500 font-mono text-[10px]"
                  >
                    Live
                  </Badge>
                )
              )}
            </div>
            <div
              className="h-[250px] rounded-lg border bg-zinc-900 p-3 overflow-y-auto transition-opacity duration-200 text-sm text-muted-foreground"
              style={{ opacity: isStale ? 0.6 : 1 }}
              dangerouslySetInnerHTML={{
                __html: formatted
                  .split("\n")
                  .map((line) => (line.trim() === "" ? "<br/>" : `<p>${line}</p>`))
                  .join(""),
              }}
            />
          </div>
        </div>

        <CodeBlock code={announcementCode} filename="announcements.tsx" />
      </CardContent>
    </Card>
  );
}
