import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is a Closure?",
  description: "How functions remember their surrounding scope even after the outer function returns",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
