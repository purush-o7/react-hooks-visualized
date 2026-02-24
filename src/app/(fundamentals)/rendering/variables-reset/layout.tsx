import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Variables Reset on Re-render",
  description: "Why local variables reset every render and how React state preserves values",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
