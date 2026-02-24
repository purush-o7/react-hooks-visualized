import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arrow Functions",
  description: "Lexical this, concise syntax, and when to use arrow functions vs regular functions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
