# AgriScan
 AI-powered crop pest & disease identifier

## Quickstart

Prerequisites:
- Node.js 20+ recommended
- pnpm (Corepack will activate it automatically)

Install dependencies and run the dev server:

```powershell
# From the project root
corepack enable; corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

The app will be available at http://localhost:3000

Build and run production locally:

```powershell
pnpm build
pnpm start
```

## VS Code

This repo includes `.vscode/tasks.json` and `.vscode/launch.json` so you can:
- Run the task "pnpm: dev" to start the dev server
- Use the debug configuration "Launch Next.js in Chrome" to start the server and open the app in Chrome

## Notes

- Path alias `@/*` is configured in `tsconfig.json`, so imports like `@/components/...` resolve correctly.
- Some dependencies may show peer warnings with React 19 during development; they don’t block running the app.
