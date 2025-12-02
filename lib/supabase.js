// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

let client = null;

/**
 * Cliente do Supabase para uso nas rotas da API (servidor).
 * Usa a SUPABASE_URL e SUPABASE_ANON_KEY definidas nas variáveis de ambiente.
 */
export function getSupabaseClient() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Supabase: variáveis SUPABASE_URL ou SUPABASE_ANON_KEY ausentes');
    }

    client = createClient(url, key, {
      auth: {
        persistSession: false
      }
    });
  }

  return client;
}
