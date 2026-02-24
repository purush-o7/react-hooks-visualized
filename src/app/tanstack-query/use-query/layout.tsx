import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useQuery",
  description: "Fetch, cache, and synchronize server data with automatic background refetching",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
