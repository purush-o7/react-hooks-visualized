import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useDeferredValue",
  description: "Defer updating part of the UI to keep interactions feeling instant",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
