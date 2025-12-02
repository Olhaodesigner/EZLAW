// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

let client = null;

export function getSupabaseClient() {
  if (client) return client;

  const url = process.env.SUPABASE_URL || process.env.URL_SUPABASE;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase: variáveis de ambiente ausentes. Defina SUPABASE_URL (ou URL_SUPABASE) e SUPABASE_ANON_KEY.'
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false }
  });

  return client;
}
