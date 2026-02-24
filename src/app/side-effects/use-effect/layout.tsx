import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useEffect",
  description: "Synchronize your component with external systems like APIs, timers, and event listeners",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
