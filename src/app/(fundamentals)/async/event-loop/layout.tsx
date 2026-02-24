import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Event Loop",
  description: "How JavaScript handles async operations with the call stack, task queue, and microtask queue",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
