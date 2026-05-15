# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint
npx tsc --noEmit # Type-check without emitting
```

No test suite exists yet.

## Next.js version warning

Next.js 16 has breaking changes from earlier versions. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for the actual API — do not rely on training-data knowledge of Next.js conventions.

## Stack

- **Next.js 16.2.6** with React 19, App Router, no static export configured
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

**Content** — `src/lib/constants.ts` is the single source of truth for all personal data (`PERSONAL_INFO`, `PROJECTS`, `JOURNEY`, `ACTIVITIES`, `MOTIVATION_CARDS`, `NAV_LINKS`). Edit here to update the site. Types live in `src/lib/types.ts`. `layout.tsx` metadata (title, description, OG tags) auto-derives from `PERSONAL_INFO` — no separate edits needed.

When adding `Activity` entries, `icon` must be one of `'code' | 'pencil' | 'trophy' | 'users' | 'rocket'` and `accent` one of `'cyan' | 'violet' | 'amber' | 'emerald' | 'rose'`. **`slug` must be unique across all activities** — duplicates cause `generateStaticParams` to silently produce only one route. The optional `image` field takes a path relative to `/public` (e.g. `'/images/activities/foo.jpg'`); when set, the card renders a photo background instead of the icon layout. The optional `imagePosition` field (CSS `object-position` value, e.g. `'center 20%'`) controls focal point on both the card and detail-page hero. The optional `imageScale` field (e.g. `0.93` = 7% zoomed out) adjusts the detail-page hero scale via computed inset; default is `1`. The optional `video` field (e.g. `'/images/activities/clip.mp4'`) takes priority over `image` in the detail-page hero (looping, muted autoplay) and, on `comingSoon` carousel cards, renders as a looping video background. Set `comingSoon: true` to disable navigation and show an animated "Coming Soon" badge (with grayscale video/image background if provided); `slug` must still be set but no detail page is generated for it. Activity media files go in `public/images/activities/`. The optional `sections` field (`ActivitySection[]`) populates the detail page body — each entry has `heading: string`, `body: string` (split on `\n\n` into paragraphs), and optional `image` and `video` fields that render inline below the section text (image as `aspect-video`, video as a player with controls). The optional `quote` field renders a pull-quote below the sections with a cyan left border. When adding `TimelineMilestone` entries, `icon` must be one of `'atom' | 'database' | 'code' | 'server' | 'rocket'`. Extend the union in `types.ts` and add the mapping in the component (`ICONS`/`ACCENT` in `Activities.tsx`, icon map in `Timeline.tsx`) if you need a new value.

**Page assembly** — `src/app/page.tsx` imports and stacks section components: `Header`, `Hero`, `Activities`, `Projects`, `About`, `Contact`, `Footer`. The journey/timeline is rendered by `Timeline.tsx` inside `About.tsx`. Section `id` attributes must stay in sync with the hardcoded `sectionIds` array in `Header.tsx` (line 23): `['hero', 'activities', 'projects', 'about', 'contact']`.

**Activities carousel** — `Activities.tsx` uses a direct-DOM pattern to avoid re-renders during animation. The disc rotation is stored in `angleRef` (a ref) and written directly to `discRef.current.style.transform`. React state (`activeIndex`, `hoveredIndex`) is only used for the dot-indicator UI and hover-reveal. Navigation is via arrow buttons and dot indicators only — no drag/swipe. Clicking the active card pushes `router.push('/activities/{slug}')` unless `comingSoon` is true, in which case the click does nothing. Each card supports an optional `image` field: photo cards render a `next/image` background with a zoom-on-hover effect and a transparent gradient overlay; cards without `image` render the icon layout. The hover-reveal overlay slides up from the bottom and stagger-fades in category → title → description when `hoveredIndex === i`.

**Activity detail pages** — `src/app/activities/[slug]/page.tsx` is a server component that renders a detail page for each non-`comingSoon` activity. `generateStaticParams` pre-renders all valid slugs at build time. The page shows the activity's `video` or `image` as a full-width hero, then `description` as a lead paragraph, then each `sections` entry as a headed block, then `quote` (if present) as a pull-quote. When `sections` is absent or empty, the page renders skeleton placeholder lines instead.

**Theme** — `ThemeProvider` (client component) exposes `useTheme()` for `{ theme, toggleTheme }`. Only `Header.tsx` uses it directly.

**Font** — `layout.tsx` adds the `inter.variable` class to `<html>`, injecting `--font-inter` as a CSS variable. `globals.css` maps `--font-sans` to that variable, so the Tailwind `font-sans` utility resolves to Inter.

**Utilities** — `src/lib/utils.ts` exports `cn()` (className joiner) and `scrollTo(id)`. Decorative SVG primitives (stars, squiggles, etc.) live in `src/components/ui/SketchElements.tsx`.

## Customization

All personal data lives in `src/lib/constants.ts`. Update `PERSONAL_INFO`, `ACTIVITIES`, `PROJECTS`, `JOURNEY`, and `MOTIVATION_CARDS` there. When adding or renaming sections, update both the section's `id` attribute and the `sectionIds` array in `Header.tsx`.
