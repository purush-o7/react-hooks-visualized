import { cn } from "@/lib/utils";

interface GlowCardProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(99, 102, 241, 0.4)",
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 transition-shadow duration-300 hover:shadow-lg",
        className
      )}
      style={{
        // @ts-expect-error CSS custom property
        "--glow-color": glowColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 24px 2px ${glowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {children}
    </div>
  );
}
