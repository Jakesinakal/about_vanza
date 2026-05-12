# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type-check without emitting
```

No test suite exists yet.

## Next.js version warning

This project uses a Next.js version that may differ from your training data. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for the authoritative API reference.

## Stack

- **Next.js 16** with React 19, App Router, no static export configured
- **Tailwind CSS v4** — config lives entirely in `src/app/globals.css` via `@theme`; no `tailwind.config.js`
- **Framer Motion v12** — use inline `initial`/`animate`/`transition` props; the `variants` function form is type-incompatible in v12
- **@tabler/icons-react v3** — icon library used throughout

## Design tokens (`globals.css`)

Custom tokens defined in `@theme`:
- `bg-cream` / `dark:bg-midnight` — page backgrounds
- `bg-surface` / `dark:bg-midnight-soft` — card/section backgrounds
- Accent colors from Tailwind defaults: `text-cyan-500`, `text-violet-600`

Dark mode uses class strategy via `@variant dark (&:where(.dark, .dark *))`. `layout.tsx` injects an inline script into `<head>` to set the `dark` class before hydration (prevents FOUC). `ThemeProvider` then syncs React state and `localStorage`.

## Key architecture

**Content** — `src/lib/constants.ts` is the single source of truth for all personal data (`PERSONAL_INFO`, `PROJECTS`, `JOURNEY`, `ACTIVITIES`, `MOTIVATION_CARDS`, `NAV_LINKS`). Edit here to update the site. Types for each constant live in `src/lib/types.ts`.

**Page assembly** — `src/app/page.tsx` imports and stacks section components: `Header`, `Hero`, `Activities`, `Projects`, `About`, `Contact`, `Footer`. The journey/timeline is rendered by `Timeline.tsx` inside `About.tsx`. Section `id` attributes must stay in sync with the hardcoded `sectionIds` array in `Header.tsx` (line 23): `['hero', 'activities', 'projects', 'about', 'contact']`.

**Activities carousel** — `Activities.tsx` uses a direct-DOM pattern to avoid re-renders during animation. The disc rotation is stored in `angleRef` (a ref) and written directly to `discRef.current.style.transform` on every frame. React state (`activeIndex`) is only used for the dot-indicator UI. Drag interaction uses window-level `pointermove`/`pointerup` pointer-event listeners (added on `pointerdown`, torn down on release) with `{ passive: false }` so `preventDefault()` blocks scroll. `data-nav="true"` on arrow/dot buttons excludes them from triggering a drag. After release, a `requestAnimationFrame` momentum loop decays velocity with a 260 ms half-life, then calls `snapToNearest()`.

**Theme** — `ThemeProvider` (client component) exposes `useTheme()` for `{ theme, toggleTheme }`. Only `Header.tsx` uses it directly.

**Utilities** — `src/lib/utils.ts` exports `cn()` (className joiner) and `scrollTo(id)`. Decorative SVG primitives (stars, squiggles, etc.) live in `src/components/ui/SketchElements.tsx`.

## Adding a real profile photo

In `Hero.tsx`, replace the placeholder `<span>` inside the photo div with:
```tsx
import Image from 'next/image';
<Image src="/images/photo.jpg" fill alt="Your name" className="object-cover" />
```
Drop the image in `public/images/`.

## Customization

All personal data lives in `src/lib/constants.ts`. Update `PERSONAL_INFO`, `ACTIVITIES`, `PROJECTS`, `JOURNEY`, and `MOTIVATION_CARDS` there. When adding or renaming sections, update both the section's `id` attribute and the `sectionIds` array in `Header.tsx`.
