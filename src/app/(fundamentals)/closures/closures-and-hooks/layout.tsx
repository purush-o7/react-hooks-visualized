import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closures & React Hooks",
  description: "Why every render creates fresh closures and how this affects hooks",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
