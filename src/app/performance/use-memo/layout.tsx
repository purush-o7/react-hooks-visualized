import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useMemo",
  description: "Cache expensive calculations between renders to avoid unnecessary recomputation",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
