import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useCallback",
  description: "Memoize callback functions to prevent unnecessary re-renders of child components",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
