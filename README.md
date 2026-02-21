# Learn React Hooks

An interactive Next.js application where **each route is a self-contained learning topic** for React Hooks and TanStack Query. Every hook page follows a consistent **Problem → Solution → Playground** flow with animated demos you can break and fix yourself.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Motion** (`motion/react`) — spring animations, AnimatePresence, layout transitions
- **TanStack Query v5** (React Query)
- **shadcn/ui** — base components (Button, Card, Tabs, Sidebar, etc.)
- **Magic UI** (`@magicui`) — animated components (shimmer, border beam, magic card)
- **Motion Primitives** (`@motion-primitives`) — animated accordion, text effects, transitions
- **Dice UI** (`@diceui`) — accessible components (tags input, combobox)

## Registries

Configured in `components.json`:

```json
{
  "registries": {
    "@magicui": "https://magicui.design/r/{name}",
    "@diceui": "https://diceui.com/r/{name}.json",
    "@motion-primitives": "https://motion-primitives.com/c/{name}.json"
  }
}
```

Install additional components:
```bash
npx shadcn@latest add @shadcn/dialog
npx shadcn@latest add @magicui/globe
npx shadcn@latest add @diceui/sortable
npx shadcn@latest add @motion-primitives/carousel
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout with shadcn Sidebar
│   ├── providers.tsx               # TanStack QueryClientProvider
│   ├── page.tsx                    # Home — topic overview grid
│   │
│   ├── state-management/
│   │   ├── page.tsx                # Category landing
│   │   ├── use-state/page.tsx      # useState topic
│   │   └── use-reducer/page.tsx    # useReducer topic
│   │
│   ├── side-effects/
│   │   ├── page.tsx
│   │   └── use-effect/page.tsx     # useEffect topic
│   │
│   ├── context/
│   │   ├── page.tsx
│   │   └── use-context/page.tsx    # useContext topic
│   │
│   ├── refs/
│   │   ├── page.tsx
│   │   └── use-ref/page.tsx        # useRef topic
│   │
│   ├── performance/
│   │   ├── page.tsx
│   │   ├── use-memo/               # useMemo — "The Lego Builder"
│   │   │   ├── page.tsx
│   │   │   └── _components/
│   │   │       ├── slow-builder.tsx          # Problem: forgetful builder
│   │   │       ├── fast-builder.tsx          # Solution: smart builder
│   │   │       ├── before-after.tsx          # Comparison cards
│   │   │       ├── playground-tower.tsx      # Playground: brick costs
│   │   │       ├── playground-pattern.tsx    # Playground: pattern grid
│   │   │       └── playground-inventory.tsx  # Playground: parts stats
│   │   └── use-callback/           # useCallback topic
│   │       ├── page.tsx
│   │       └── _components/
│   │
│   ├── tanstack-query/
│   │   ├── page.tsx
│   │   ├── use-query/page.tsx      # useQuery topic
│   │   └── use-mutation/page.tsx   # useMutation topic
│   │
│   └── custom-hooks/
│       ├── page.tsx
│       └── _components/
│
├── components/
│   ├── app-sidebar.tsx             # Navigation sidebar
│   ├── code-block.tsx              # Code snippet with copy button
│   └── ui/                         # shadcn + registry components
│       ├── button.tsx               # @shadcn
│       ├── card.tsx                 # @shadcn
│       ├── tabs.tsx                 # @shadcn
│       ├── badge.tsx                # @shadcn
│       ├── sidebar.tsx              # @shadcn
│       ├── input.tsx                # @shadcn
│       ├── alert.tsx                # @shadcn
│       ├── separator.tsx            # @shadcn
│       ├── glow-card.tsx            # custom
│       ├── border-beam.tsx          # @magicui
│       ├── magic-card.tsx           # @magicui
│       ├── accordion.tsx            # @motion-primitives
│       ├── text-effect.tsx          # @motion-primitives
│       └── ...
│
├── hooks/
│   └── use-mobile.ts               # @shadcn (sidebar dependency)
└── lib/
    └── utils.ts                     # cn() helper
```

## Topics

### React Hooks

| Route | Hook | What You'll Learn |
|---|---|---|
| `/state-management/use-state` | `useState` | Local state, counters, toggles, object state |
| `/side-effects/use-effect` | `useEffect` | Side effects, cleanup, dependency arrays, timers |
| `/context/use-context` | `useContext` | Context API, theme toggling, avoiding prop drilling |
| `/refs/use-ref` | `useRef` | DOM access, persisting values, render counting |
| `/performance/use-memo` | `useMemo` | Lego Builder theme — memoized towers, patterns, stats |
| `/performance/use-callback` | `useCallback` | Stable function refs, preventing child re-renders |
| `/state-management/use-reducer` | `useReducer` | Reducer pattern, complex state, todo list |
| `/custom-hooks` | Custom Hooks | useToggle, useCounter, useDebounce, useLocalStorage |

### TanStack Query

| Route | Hook | What You'll Learn |
|---|---|---|
| `/tanstack-query/use-query` | `useQuery` | Fetching, caching, query keys, dependent queries |
| `/tanstack-query/use-mutation` | `useMutation` | Create/delete, optimistic updates, cache invalidation |

## Page Pattern

Every hook page follows the same structure:

1. **Header** — Title (`font-mono`) + Badge + TextEffect subtitle
2. **Problem** — GlowCard (red) showing the naive approach with visible pain points
3. **Solution** — GlowCard (green) + BorderBeam showing the hook fixing the problem
4. **Before vs After** — Side-by-side comparison cards (red/green)
5. **Playground** — Multiple interactive Card demos with CodeBlock snippets

## Adding a New Topic

1. Create a folder under the appropriate category (e.g. `src/app/performance/use-transition/`)
2. Add a `page.tsx` with `"use client"` directive
3. Add `_components/` folder with Problem, Solution, BeforeAfter, and Playground components
4. Add a nav entry in `src/components/app-sidebar.tsx`
5. Add a card in the category's `page.tsx` and `src/app/page.tsx`
