# CetusCast Landing Page - Project Context

## Project Overview
CetusCast landing page is a modern, high-performance static website built with **Next.js 16** and **React 19**. It serves as the official promotional page for the CetusCast Android application, which allows users to cast photos, videos, and audio from their phones to TVs and DLNA-compatible devices.

The design follows a **Cinematic HUD (Heads-Up Display)** visual system, characterized by:
- A cyber/tech aesthetic with a dark theme and cyan accents.
- Interactive elements like a particle canvas, radar sweep, and terminal-style typing animations.
- Scroll-triggered reveal effects.

### Main Technologies
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** CSS (Custom HUD system in `app/globals.css`) & Tailwind CSS 4
- **Animations:** Custom React hooks, `requestAnimationFrame`, and `motion` library.
- **Icons:** `@phosphor-icons/react`

## Building and Running

### Development
To start the local development server:
```bash
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

### Production Build
The project is configured for **Static Export** (`output: "export"` in `next.config.ts`).
```bash
npm run build
```
The generated static files will be located in the `out/` directory.

### Linting
```bash
npm run lint
```

## Project Structure
- `app/`: Contains the main application logic and styling.
  - `page.tsx`: The primary landing page component containing all sections and animations.
  - `layout.tsx`: Root layout and SEO metadata.
  - `globals.css`: The core of the HUD visual system, including animations and responsive grid.
  - `translations.ts`: Legacy translation data (currently English content is hardcoded in `page.tsx`).
- `screenshots/`: Visual assets for documentation.
- `next.config.ts`: Configuration for static export and image optimization.

## Development Conventions
- **Client Components:** Most interactive UI components use `"use client"` as they rely on React hooks (`useEffect`, `useRef`, `useState`) and browser APIs for animations.
- **Visual System:** Adhere to the "HUD" aesthetic. Use existing CSS variables and classes defined in `app/globals.css` for consistent styling.
- **Animations:** Prefer local `useEffect` or `requestAnimationFrame` for performance-heavy background animations (like the particle canvas). Use the `Reveal` component for scroll-based entrance animations.
- **Static Assets:** Placeholder images are currently served from `picsum.photos`. Replace with actual app screenshots in `screenshots/` before final deployment.
- **Translations:** While English is currently hardcoded in `page.tsx`, refer to `app/translations.ts` if adding multi-language support in the future.
