import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Async / Await",
  description: "Write asynchronous code that reads like synchronous code",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
