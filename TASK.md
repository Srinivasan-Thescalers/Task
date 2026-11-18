# Task: Claims Workflow (45 minutes)

Use one or more AI agents to build a claims screen for a clinic's billing team.

> You will probably **not** finish everything. Choosing what to build first, and how you
> direct and check the agent, is part of the test. Rushed, unchecked work scores lower
> than a smaller piece of work you have checked and can defend.

## The domain

A **claim** is money a clinic asks an insurer to pay for a patient's treatment.

Each claim has:
- patient name
- consultant name
- amount (GBP)
- status
- created date

### Status rules

```
draft ──► submitted ──► paid
              │
              └──────► rejected ──► draft   (corrected and resubmitted)
```

- Only the transitions shown above are allowed. `paid` is final.
- The amount can only be changed while the claim is a `draft`.
- Only `draft` claims can be deleted. Other claims are financial records and must stay.

These rules must hold **no matter how the data is changed**: through the UI, through the
Supabase dashboard, or by a direct API call with the anon key.

## Requirements

1. **Schema.** Create the `claims` table with a migration. You decide the column types and
   constraints, and must be able to explain why.
2. **Page.** On one page, you can:
   - create a claim
   - list claims, newest first, with a total amount for each status
   - change a claim's status (only to a valid next status)
   - edit a draft's amount
   - delete a draft
3. **Validation.**
   - Patient name is required. A name made only of spaces counts as empty.
   - The amount must be positive, in pounds and pence, and no more than £100,000.00.
   - Users type amounts the way people do: `1250`, `1,250.50`, `£12.5`. Inputs such as
     `12.345`, `-5`, `1e3` and `abc` must be rejected with a clear message.
4. **Concurrency.** Two billing staff may have the same claim open in two tabs. If one of
   them saves a change based on out-of-date data, they must be told; the other person's
   change must not be overwritten without warning.
5. **Audit.** Every status change is recorded: which claim, from which status, to which
   status, and when. Nobody can edit or delete these records using the app's API key.
6. **States.** Handle loading, empty and error states. When a save is rejected, the user
   sees why and the list shows what is really in the database.
7. **Tests.** Write tests that would **fail** if the rules above were broken. A test that
   only checks that the page renders doesn't count. Be ready to show a test failing.
8. **Show it working** in the Supabase dashboard after each action. Also show at least one
   rule blocking a change you attempt directly in the dashboard or with a direct API call.

## Deliverable: `DECISIONS.md`

Write a short note (bullet points are fine) covering:
- the main choices you made, and the alternatives you rejected
- at least one place where the agent got something wrong or cut a corner, how you noticed,
  and what you did about it
- what you would do next with more time

## Rules

- You may use any AI agent, or several.
- Explain your choices out loud as you go.
- We care about how you direct and check the agents, not just whether you finish.
- If a requirement is unclear, decide, write down your assumption, and carry on.

## Useful pointers

- The Supabase client is already set up in `src/lib/supabase.ts`. Import `supabase` from there.
- Migrations: `npx supabase migration new <name>`, then `npx supabase db reset` (or
  `npx supabase migration up`) to apply them.
- Tests: `npm test` (Vitest + Testing Library, see `src/App.test.tsx`).
