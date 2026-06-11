# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js landing page using the App Router.

- `app/page.tsx` contains the main landing page UI.
- `app/layout.tsx` defines global page metadata and layout wrappers.
- `app/globals.css` contains global styles and Tailwind CSS setup.
- `app/translations.ts` stores localized copy used by the page.
- `screenshots/` is used for visual references or QA captures.
- `out/`, `node_modules/`, `.next/`, and other generated files should not be committed.

There is no dedicated `tests/` directory. Add tests near the feature or in a clearly named test directory if test tooling is introduced.

## Build, Test, and Development Commands

Use npm for dependency management and commit `package-lock.json`.

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the local Next.js development server.
- `npm run build` creates a production build and catches TypeScript/build errors.
- `npm run start` serves the production build after `npm run build`.
- `npm run lint` runs the configured Next.js lint command.

Run `npm run build` before opening a pull request when changing application code.

## Coding Style & Naming Conventions

Write TypeScript and React components in the style already used in `app/`. Prefer small components and avoid abstractions for one-off landing page content. Use two-space indentation in TSX, descriptive names, and PascalCase for React components.

Keep localized or reused copy in `app/translations.ts`. Keep styling consistent with `app/globals.css` and existing Tailwind utility patterns.

## Testing Guidelines

No automated test framework is currently configured. For now, validate changes with:

- `npm run lint`
- `npm run build`
- Manual browser checks for desktop and mobile layouts

If tests are added later, document the framework, add `npm test`, and use names like `page.test.tsx` or `translations.test.ts`.

## Commit & Pull Request Guidelines

Recent commits use short messages such as `update package.json` and `v2, another page style`. Keep subjects concise and imperative when possible, for example `Update landing copy`.

Pull requests should include a brief description, screenshots for visual changes, linked issues, and verification commands. Note known limitations explicitly.

## Security & Configuration Tips

Do not commit `.env*`, secrets, private keys, or local editor settings. Keep generated artifacts out of commits unless they are intentionally used as documentation or release assets.
