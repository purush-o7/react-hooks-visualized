import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Hooks",
  description: "Extract and reuse stateful logic across components with custom hooks",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
