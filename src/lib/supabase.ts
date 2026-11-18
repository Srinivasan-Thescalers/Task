import { createClient } from '@supabase/supabase-js'

// Requests go to the Vite dev server, which proxies /supabase to the local
// Supabase API (http://127.0.0.1:54321). See vite.config.ts.
export const supabaseUrl = `${window.location.origin}/supabase`

export const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const isSupabaseConfigured = supabaseAnonKey.trim().length > 0

// createClient throws on an empty key, which would blank the whole page.
// Use a placeholder so the app still renders and can show a setup message.
export const supabase = createClient(
  supabaseUrl,
  isSupabaseConfigured ? supabaseAnonKey : 'missing-anon-key',
)
