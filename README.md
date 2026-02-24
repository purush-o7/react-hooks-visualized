# Learn React Hooks

An interactive, themed learning platform for React Hooks and TanStack Query. Every hook is taught through a real-world metaphor — spy networks, space launches, DJ booths — so the concepts stick, not just the syntax.

**[Live Demo](https://hooks-101.vercel.app)**

## Why This Exists

Most React docs explain *what* a hook does. Few explain *why* it works that way or *when* it matters. This project fills that gap:

- **Hooks don't make sense without foundations.** Closures, immutability, and the render cycle are prerequisites — not optional reading. This site teaches them first and shows exactly how each one connects to hooks.
- **Abstract APIs need concrete metaphors.** `useReducer` is hard to grasp from a type signature. But "you're launching a rocket and every dispatch is a mission command" — that clicks. Each hook is wrapped in a unique story that makes the mental model intuitive.
- **Reading isn't learning.** Every page has live, interactive playgrounds where you can break things, tweak values, and see how hooks behave in real-time. Build intuition hands-on, not through walls of text.

## What's Inside

### Fundamentals (Start Here)

The JavaScript foundations every React hook builds on. If closures or the render cycle feel fuzzy, start here.

| Topic | What You'll Learn |
|---|---|
| React Rendering | Re-renders, variables reset, render cascade, expensive work |
| Closures | Captured variables, stale closures, closures in loops and hooks |
| Immutability | Value vs reference, why mutation breaks React, spread patterns |
| Async JavaScript | Event loop, promises, async/await, async in React |
| this & Arrows | Binding rules, arrow functions, this in React |

### React Hooks (Themed)

Each hook has its own world. The theme isn't decoration — it *is* the explanation.

| Hook | Theme | What You'll Learn |
|---|---|---|
| `useState` | Switchboard | Local state, counters, toggles, object state |
| `useReducer` | Space Launch | Reducer pattern, dispatch actions, complex state |
| `useEffect` | DJ Booth | Side effects, cleanup, dependency arrays, timers |
| `useLayoutEffect` | Blueprint | Synchronous DOM measurement before paint |
| `useContext` | Spy Network | Context API, avoiding prop drilling, shared state |
| `useRef` | Recording Studio | DOM access, persisting values across renders |
| `useId` | Valet Parking | Stable unique IDs for accessibility and SSR |
| `useImperativeHandle` | Bank Vault | Customizing exposed ref handles |
| `useMemo` | Lego Builder | Memoized computations, expensive calculations |
| `useCallback` | Speed Dial | Stable function references, preventing re-renders |
| `useTransition` | Emergency Room | Concurrent rendering, non-blocking updates |
| `useDeferredValue` | Train Station | Deferred rendering, keeping inputs responsive |
| Custom Hooks | — | useToggle, useDebounce, useLocalStorage |

### TanStack Query v5

| Hook | What You'll Learn |
|---|---|
| `useQuery` | Fetching, caching, query keys, pagination, polling |
| `useMutation` | Create/delete, optimistic updates, cache invalidation |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repo
git clone https://github.com/purush-o7/react-hooks-visualized.git
cd react-hooks-visualized

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Commands

```bash
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Motion** (`motion/react`) — spring animations, layout transitions
- **TanStack Query v5**
- **shadcn/ui** — base components (Card, Sidebar, Badge, etc.)
- **Magic UI** / **Motion Primitives** / **Dice UI** — animated and accessible components

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Welcome page
│   ├── layout.tsx                  # Root layout (sidebar + TOC)
│   ├── providers.tsx               # QueryClientProvider
│   │
│   ├── (fundamentals)/             # Route group
│   │   ├── rendering/              # 6 topics
│   │   ├── closures/               # 4 topics
│   │   ├── immutability/           # 4 topics
│   │   ├── async/                  # 4 topics
│   │   └── this-and-arrows/        # 4 topics
│   │
│   ├── state-management/           # useState, useReducer
│   ├── side-effects/               # useEffect, useLayoutEffect
│   ├── context/                    # useContext
│   ├── refs/                       # useRef, useId, useImperativeHandle
│   ├── performance/                # useMemo, useCallback, useTransition, useDeferredValue
│   ├── custom-hooks/               # Custom hook patterns
│   └── tanstack-query/             # useQuery, useMutation
│
├── components/
│   ├── app-sidebar.tsx             # Navigation sidebar
│   ├── table-of-contents.tsx       # Right-side TOC
│   ├── code-block.tsx              # Syntax highlighted code
│   └── ui/                         # shadcn + registry components
│
└── hooks/                          # Shared hooks (useKeyboardNav, useMobile)
```

### Page Pattern

Every hook page follows the same structure:

1. **Theme Briefing** — a story that frames the hook as a real-world scenario
2. **Problem** — the naive approach with visible pain points
3. **Solution** — the hook fixing the problem
4. **Before vs After** — side-by-side comparison
5. **Playgrounds** — multiple interactive demos with code snippets

## Contributing

Contributions are welcome! Here's how to get involved:

### Adding a New Hook Topic

1. Create a folder: `src/app/<category>/<hook-name>/`
2. Add `page.tsx` — follow the Problem → Solution → Playground flow
3. Add `_components/` with themed demo components
4. Add a nav entry in `src/components/app-sidebar.tsx`
5. Add a card in the category's `page.tsx`

### Guidelines

- **Pick a theme.** Every hook should have a real-world metaphor. The theme should make the hook's behavior feel obvious.
- **Make it interactive.** Playgrounds aren't optional. If you can't click it, it's not done.
- **Keep it focused.** Each page teaches one hook. Go deep, not wide.
- **Use existing patterns.** Check how other hook pages are structured — consistency matters.

### Reporting Issues

Found a bug or have an idea? [Open an issue](https://github.com/purush-o7/react-hooks-visualized/issues).

## License

MIT

---

Built by [Purush](https://github.com/purush-o7)
