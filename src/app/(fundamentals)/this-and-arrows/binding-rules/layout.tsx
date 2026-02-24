import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binding Rules",
  description: "Implicit, explicit, new, and default binding — the four rules that determine this",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
