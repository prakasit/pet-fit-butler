# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Pet Fit Butler is a single Next.js 16 frontend application (not a monorepo) for luxury pet wellness management. All data is mock-generated via `@faker-js/faker` with a fixed seed — there are no external APIs, databases, or backend services.

### Dev server

- **Start**: `npx next dev --turbopack` (port 3000)
- The `--turbopack` flag is required because Next.js 16 defaults to Turbopack but the codebase has a webpack config (from `next-pwa`). Without an explicit flag the dev server exits with an error.
- The `npm run dev` script does **not** include this flag; use the direct `npx` command above for development.

### Build

- `npm run build` uses `--webpack` mode for `next-pwa` compatibility. This is already configured in `package.json`.

### Lint & quality

- Standard commands are in `package.json` (`npm run lint`, `npm run build`). See `README.md` for details.
- There is a pre-existing lint error in `components/ui/HealthChart.tsx` (`react-hooks/set-state-in-effect`). This is in the existing codebase and not a setup issue.
