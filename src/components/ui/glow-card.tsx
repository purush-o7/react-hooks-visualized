import { cn } from "@/lib/utils";

const themeColors: Record<string, string> = {
  rendering: "rgba(239, 68, 68, 0.35)",
  closures: "rgba(245, 158, 11, 0.35)",
  immutability: "rgba(6, 182, 212, 0.35)",
  async: "rgba(99, 102, 241, 0.35)",
  "this-arrows": "rgba(168, 85, 247, 0.35)",
  "state-management": "rgba(34, 197, 94, 0.35)",
  "side-effects": "rgba(234, 179, 8, 0.35)",
  context: "rgba(59, 130, 246, 0.35)",
  refs: "rgba(236, 72, 153, 0.35)",
  performance: "rgba(249, 115, 22, 0.35)",
  success: "rgba(34, 197, 94, 0.35)",
  error: "rgba(239, 68, 68, 0.35)",
  info: "rgba(59, 130, 246, 0.35)",
  warning: "rgba(245, 158, 11, 0.35)",
};

interface GlowCardProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  theme?: keyof typeof themeColors;
}

export function GlowCard({
  children,
  className,
  glowColor,
  theme,
}: GlowCardProps) {
  const resolvedColor = glowColor || (theme && themeColors[theme]) || "rgba(99, 102, 241, 0.4)";

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg",
        className
      )}
      style={{
        // @ts-expect-error CSS custom property
        "--glow-color": resolvedColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 24px 2px ${resolvedColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {children}
    </div>
  );
}
