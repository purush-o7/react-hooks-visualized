import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is this?",
  description: "How the this keyword changes identity based on how a function is called",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
