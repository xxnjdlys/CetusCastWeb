# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Build static export
npm run build        # Outputs static files to /out directory

# Lint
npm run lint         # ESLint via next lint
```

No test suite is configured in this project.

## Architecture

This is a **single-page Next.js landing page** for the CetusCast Android app, configured for **static export** (`output: "export"` in `next.config.ts`). The entire page is one client component.

### Key files

- [app/page.tsx](app/page.tsx) — The entire landing page, marked `"use client"`. Contains all sections: Hero, Features, HowItWorks, Screenshots, Privacy, Download, Footer. All components live in this single file.
- [app/translations.ts](app/translations.ts) — All UI strings for `en` and `zh` locales, typed as `const`. Language state is managed locally in `page.tsx` via `useState<Lang>`.
- [app/layout.tsx](app/layout.tsx) — Root layout with metadata only.
- [app/globals.css](app/globals.css) — Global styles with Tailwind CSS v4.
- [next.config.ts](next.config.ts) — Static export config; images are unoptimized and remote patterns are whitelisted.

### Internationalization

Language switching is implemented without a routing library. `page.tsx` holds a `lang` state (`"en" | "zh"`) and passes `translations[lang]` down to all sections. To add new strings, extend both `en` and `zh` objects in `translations.ts` and use the `Translations` type for type safety.

### Static export & deployment

`npm run build` produces a static site in `/out`. Deploy by serving `/out` directly with nginx or any static file host. No server-side rendering.

### Dependencies

- **motion** — Framer Motion (v12) for scroll/entrance animations
- **@phosphor-icons/react** — Icon library
- **Tailwind CSS v4** — Utility-first styling (no config file; uses CSS-based config)
