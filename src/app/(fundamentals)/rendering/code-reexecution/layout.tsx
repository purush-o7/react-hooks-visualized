import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Re-execution",
  description: "Every render re-runs your component function from top to bottom",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
