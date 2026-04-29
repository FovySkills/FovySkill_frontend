# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router frontend. Route pages and API handlers live under `app/`, for example `app/page.tsx`, `app/Login/page.tsx`, and `app/api/auth/login/route.ts`. Shared UI sections live in `components/`, with PascalCase files such as `Navbar.tsx`. App-specific auth, API, cookie, and service helpers are in `app/lib/`; general utilities are in `lib/`. Static images and icons are stored in `public/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js development server.
- `npm run build`: create a production build and run framework checks.
- `npm run start`: serve the production build after `npm run build`.
- `npm run lint`: run ESLint with Next.js Core Web Vitals and TypeScript rules.

There is currently no `npm test` script.

## Coding Style & Naming Conventions

Use TypeScript and React TSX. Keep indentation at 2 spaces, prefer named exports for shared components, and use PascalCase for component names. Use camelCase for functions, variables, and local helpers. Match existing route folder casing because it affects URLs. Use the `@/*` path alias when it improves import clarity. Styling is primarily Tailwind CSS classes in JSX; keep class lists readable and avoid unrelated visual rewrites.

## Testing Guidelines

No testing framework is configured yet. For now, validate changes with `npm run lint` and `npm run build`. When adding tests, add the runner and script in the same change, and place tests near the behavior they cover, for example `ComponentName.test.tsx` beside a component. Cover authentication, cookie handling, upload/download, and graph rendering paths when those areas change.

## Commit & Pull Request Guidelines

Recent history uses short imperative messages, with occasional prefixes such as `fix:`. Prefer clear messages like `fix: footer logo path` or `add dashboard user interactions`; avoid vague messages such as `u`. Pull requests should include a short summary, linked issue or task, screenshots for UI changes, notes about API or environment changes, and verification commands.

## Security & Configuration Tips

Do not commit secrets. Service endpoints and cookie names are centralized in `app/lib/env.ts`; prefer environment variables for deploy-specific values. Avoid logging tokens or uploaded file contents.

## Agent-Specific Instructions

Check `git status` before editing. Preserve unrelated user changes and keep edits narrowly scoped to the requested task.
