import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useRef",
  description: "Hold a mutable reference that persists across renders without causing re-renders",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
