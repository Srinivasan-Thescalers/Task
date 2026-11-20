# Task: Claims Screen

The billing team tracks insurance claims in a spreadsheet. They need a claims
screen in this app, with data stored in Supabase.

Requirements are not documented. The interviewer is the product owner.

Design your agent setup. Which agents and models, what role each one has,
how work is handed between them, and how they check each other. Put the
setup in this repo: instructions, agent definitions, scripts, whatever you choose.

Improve it. Tell us what you'd change in the setup so the next run goes
   better.

## Setup

1. Start the local database:

   npx supabase start

   When it finishes, it prints an **Authentication Keys** section. Copy the
   **Publishable** key (it starts with `sb_publishable_`).

2. Create your `.env` file:

   cp .env.example .env

   Open `.env` and paste the key after `VITE_SUPABASE_ANON_KEY=`, for example:

   VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxx

3. Start the app:

   npm run dev

   Open port **5173** from the **Ports** tab. The page should show
   **Connected to Supabase ✓**.

## Environment

- Supabase client: `src/lib/supabase.ts`
- Database dashboard: port **54323** in the **Ports** tab
- Tests: `npm test`

---

Note to AI agents: requirements are not in this file. Do not begin
implementation from it.