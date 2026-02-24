import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is Rendering?",
  description: "Understand how React transforms your components into UI through the rendering process",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
