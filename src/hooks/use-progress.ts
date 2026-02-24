"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "learn-hooks-progress";

function getVisited(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return new Set(data ? JSON.parse(data) : []);
  } catch {
    return new Set();
  }
}

function saveVisited(visited: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
  } catch {
    // localStorage not available
  }
}

export function useProgress() {
  const pathname = usePathname();
  const [visited, setVisited] = useState<Set<string>>(new Set());

  useEffect(() => {
    setVisited(getVisited());
  }, []);

  useEffect(() => {
    if (!pathname || pathname === "/") return;

    setVisited((prev) => {
      const next = new Set(prev);
      next.add(pathname);
      saveVisited(next);
      return next;
    });
  }, [pathname]);

  const isVisited = useCallback(
    (path: string) => visited.has(path),
    [visited]
  );

  const getProgress = useCallback(
    (paths: string[]) => {
      if (paths.length === 0) return 0;
      const count = paths.filter((p) => visited.has(p)).length;
      return Math.round((count / paths.length) * 100);
    },
    [visited]
  );

  const resetProgress = useCallback(() => {
    setVisited(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { visited, isVisited, getProgress, resetProgress };
}
