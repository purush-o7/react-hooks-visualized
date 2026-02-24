import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spreading 101",
  description: "Use the spread operator to create new objects and arrays without mutating the original",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
