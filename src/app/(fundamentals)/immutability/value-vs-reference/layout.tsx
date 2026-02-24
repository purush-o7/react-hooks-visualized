import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Value vs Reference",
  description: "Primitives copy by value, objects share references — why this matters in React",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
