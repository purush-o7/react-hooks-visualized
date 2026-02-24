import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stale Closures",
  description: "When closures capture outdated values and how to fix them",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
