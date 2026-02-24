import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Async in React",
  description: "Handle async operations inside React components with useEffect and data fetching patterns",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
