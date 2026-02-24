import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useId",
  description: "Generate unique, stable IDs for accessibility attributes that work with server rendering",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
