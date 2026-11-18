# Task: Claims CRUD (45 minutes)

Use one or more AI agents to build a claims screen.

1. **Create a `claims` table** in Supabase (use a migration) with:
   - patient name
   - consultant name
   - amount
   - status: `draft` / `submitted` / `paid` / `rejected`
   - created date
2. **Build a page** where you can:
   - create a claim
   - list claims
   - edit a claim's status and amount
   - delete a claim
3. **Validate:** amount must be positive, and patient name is required.
4. **Show the data changing** in the Supabase dashboard after each action.
5. **Write at least one meaningful test.**

**Bonus:** store money safely (no rounding errors), and handle loading, empty and error states.

## Rules

- You may use any AI agent (or several).
- Explain your choices out loud as you go.
- We care about how you direct and check the agents, not just whether you finish.

## Useful pointers

- The Supabase client is already set up in `src/lib/supabase.ts`. Import `supabase` from there.
- Migrations: `npx supabase migration new <name>`, then `npx supabase db reset` (or `npx supabase migration up`) to apply them.
- Tests: `npm test` (Vitest + Testing Library, see `src/App.test.tsx`).
