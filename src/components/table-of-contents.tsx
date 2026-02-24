"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all h2 elements in the main content area
    const elements = document.querySelectorAll("main h2");
    const items: TocItem[] = [];

    elements.forEach((el, i) => {
      // Generate id if it doesn't have one
      if (!el.id) {
        el.id = `section-${i}`;
      }
      items.push({
        id: el.id,
        text: el.textContent || "",
      });
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null; // Only show for pages with 3+ sections

  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-48 z-10">
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 mb-2 font-medium">
          On this page
        </p>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={cn(
              "block text-xs py-1 pl-3 border-l-2 transition-all duration-200 truncate",
              activeId === heading.id
                ? "border-foreground text-foreground font-medium"
                : "border-transparent text-muted-foreground/60 hover:text-muted-foreground hover:border-muted-foreground/30"
            )}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
