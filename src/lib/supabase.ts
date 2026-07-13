import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// During Vercel static build without env vars, return a stub that never throws.
// In production (env vars set in Vercel dashboard), the real client is used.
function createSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window === 'undefined') {
      // SSR / static generation — silent stub
      console.warn(
        '[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Add them in Vercel → Settings → Environment Variables.'
      );
    }
    // Return a dummy client pointing at a placeholder — all queries will fail gracefully
    // (callers already have try/catch + fallback data)
    return createClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key',
      { auth: { persistSession: false } }
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();
