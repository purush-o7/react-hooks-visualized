import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Render Cascade",
  description: "How a parent re-render cascades to all child components",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
