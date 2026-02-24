import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Mutation Breaks React",
  description: "React relies on reference comparison to detect changes — direct mutation bypasses it",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
