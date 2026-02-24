import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useTransition",
  description: "Mark state updates as non-urgent to keep the UI responsive during heavy renders",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
