# Vetranio Live Test

Starter environment: Vite + React + TypeScript, with a local Supabase instance.

## Setup

1. Wait for the Codespace to finish building. It runs `npm install` and installs the agent CLIs.
2. Run `npx supabase start`. The first run downloads Docker images and takes a few minutes.
3. Copy `.env.example` to `.env` and paste in the anon/publishable key that `npx supabase start` printed:
   ```sh
   cp .env.example .env
   ```
   Run `npx supabase status` to see the key again.
4. Run `npm run dev`, then open the **App** port (5173) from the **Ports** tab. You should see "Connected to Supabase ✓".
5. Open the **Supabase Dashboard** port (54323) to see tables and data.
6. Start an agent in the terminal (`claude`, `codex`, `opencode` or `gemini`) and sign in with your own account.
7. Read [TASK.md](TASK.md).

## How the app reaches Supabase

The app runs in your browser on a forwarded URL (`https://…-5173.app.github.dev`), so it can't reach `127.0.0.1:54321` directly. Instead, the Supabase client in `src/lib/supabase.ts` calls `<app origin>/supabase/...`, and the Vite dev server proxies those requests to the local Supabase API. See `vite.config.ts`.

## Scripts

- `npm run dev`: start the dev server
- `npm test`: run the tests once (`npm run test:watch` for watch mode)
- `npm run build`: type-check and build the app
- `npm run lint`: lint with oxlint
