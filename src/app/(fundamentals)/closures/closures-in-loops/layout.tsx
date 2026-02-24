import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closures in Loops",
  description: "The classic loop variable trap and how closures interact with iteration",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
