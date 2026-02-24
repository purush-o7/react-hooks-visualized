import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useState",
  description: "Manage local component state with React's most fundamental hook",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
