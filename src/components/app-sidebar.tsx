"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpen,
  RefreshCw,
  Eye,
  Share2,
  Pointer,
  Brain,
  Repeat,
  Layers,
  Database,
  Pencil,
  Puzzle,
  ChevronRight,
  Box,
  Zap,
  Gauge,
  Link2,
  Hourglass,
  Timer,
  Ruler,
  Fingerprint,
  SlidersHorizontal,
  RotateCcw,
  Play,
  GitBranch,
  Flame,
  Equal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

type HookItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Category = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hooks: HookItem[];
};

const renderingCategory: Category = {
  label: "React Rendering",
  href: "/rendering",
  icon: Activity,
  hooks: [
    { href: "/rendering/what-is-rendering", label: "What is Rendering?", icon: Eye },
    { href: "/rendering/variables-reset", label: "Variables Reset", icon: RotateCcw },
    { href: "/rendering/code-reexecution", label: "Code Re-execution", icon: Play },
    { href: "/rendering/render-cascade", label: "Render Cascade", icon: GitBranch },
    { href: "/rendering/expensive-work", label: "Expensive Work", icon: Flame },
    { href: "/rendering/reference-trap", label: "Reference Trap", icon: Equal },
  ],
};

const reactCategories: Category[] = [
  {
    label: "State Management",
    href: "/state-management",
    icon: Box,
    hooks: [
      { href: "/state-management/use-state", label: "useState", icon: Layers },
      {
        href: "/state-management/use-reducer",
        label: "useReducer",
        icon: Eye,
      },
    ],
  },
  {
    label: "Side Effects",
    href: "/side-effects",
    icon: Zap,
    hooks: [
      {
        href: "/side-effects/use-effect",
        label: "useEffect",
        icon: RefreshCw,
      },
      {
        href: "/side-effects/use-layout-effect",
        label: "useLayoutEffect",
        icon: Ruler,
      },
    ],
  },
  {
    label: "Context",
    href: "/context",
    icon: Link2,
    hooks: [
      { href: "/context/use-context", label: "useContext", icon: Share2 },
    ],
  },
  {
    label: "Refs",
    href: "/refs",
    icon: Pointer,
    hooks: [
      { href: "/refs/use-ref", label: "useRef", icon: Pointer },
      { href: "/refs/use-id", label: "useId", icon: Fingerprint },
      {
        href: "/refs/use-imperative-handle",
        label: "useImperativeHandle",
        icon: SlidersHorizontal,
      },
    ],
  },
  {
    label: "Performance",
    href: "/performance",
    icon: Gauge,
    hooks: [
      { href: "/performance/use-memo", label: "useMemo", icon: Brain },
      {
        href: "/performance/use-callback",
        label: "useCallback",
        icon: Repeat,
      },
      {
        href: "/performance/use-transition",
        label: "useTransition",
        icon: Hourglass,
      },
      {
        href: "/performance/use-deferred-value",
        label: "useDeferredValue",
        icon: Timer,
      },
    ],
  },
  {
    label: "Custom Hooks",
    href: "/custom-hooks",
    icon: Puzzle,
    hooks: [],
  },
];

const tanstackCategory: Category = {
  label: "TanStack Query",
  href: "/tanstack-query",
  icon: Database,
  hooks: [
    { href: "/tanstack-query/use-query", label: "useQuery", icon: Database },
    {
      href: "/tanstack-query/use-mutation",
      label: "useMutation",
      icon: Pencil,
    },
  ],
};

function CategoryItem({
  category,
  pathname,
}: {
  category: Category;
  pathname: string;
}) {
  const isActive =
    pathname === category.href ||
    category.hooks.some((h) => pathname === h.href);

  // Single page category (no sub-items)
  if (category.hooks.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === category.href}>
          <Link href={category.href}>
            <category.icon />
            <span>{category.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible asChild defaultOpen={isActive}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={category.label}>
            <category.icon />
            <span>{category.label}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {category.hooks.map((hook) => (
              <SidebarMenuSubItem key={hook.href}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === hook.href}
                >
                  <Link href={hook.href}>
                    <span className="font-mono text-xs">{hook.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="size-5" />
          <div>
            <p className="text-sm font-semibold leading-none">Learn Hooks</p>
            <p className="text-xs text-muted-foreground">
              React + TanStack Query
            </p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fundamentals</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <CategoryItem
                category={renderingCategory}
                pathname={pathname}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>React Hooks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reactCategories.map((category) => (
                <CategoryItem
                  key={category.href}
                  category={category}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            TanStack Query
            <Badge variant="secondary" className="ml-auto text-[10px]">
              v5
            </Badge>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tanstackCategory.hooks.map((hook) => (
                <SidebarMenuItem key={hook.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === hook.href}
                  >
                    <Link href={hook.href}>
                      <hook.icon />
                      <span className="font-mono text-xs">{hook.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
