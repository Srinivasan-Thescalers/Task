import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './supabase'

export type ConnectionResult = { ok: true } | { ok: false; message: string }

const SETUP_HINT =
  'Run `npx supabase start`, copy .env.example to .env, paste the anon/publishable key it printed, then restart `npm run dev`.'

/**
 * Checks once that the local Supabase stack is reachable through the Vite proxy
 * and that the anon key is accepted. Doesn't need any tables to exist.
 */
export async function checkConnection(): Promise<ConnectionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, message: `VITE_SUPABASE_ANON_KEY is not set. ${SETUP_HINT}` }
  }

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: { apikey: supabaseAnonKey },
    })
    if (res.ok) return { ok: true }
    if (res.status === 401 || res.status === 403) {
      return { ok: false, message: `Supabase rejected the anon key (HTTP ${res.status}). ${SETUP_HINT}` }
    }
    return { ok: false, message: `Supabase is not responding (HTTP ${res.status}). ${SETUP_HINT}` }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    return { ok: false, message: `Could not reach Supabase (${detail}). ${SETUP_HINT}` }
  }
}
