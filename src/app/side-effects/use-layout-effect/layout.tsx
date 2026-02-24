import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useLayoutEffect",
  description: "Read layout and paint synchronously before the browser paints to prevent visual flicker",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
