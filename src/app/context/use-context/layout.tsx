import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useContext",
  description: "Subscribe to React context and share data across components without prop drilling",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
