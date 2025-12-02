// pages/api/cases/index.js
import { getSupabaseClient } from '../../../lib/supabase';

export default async function handler(req, res) {
  let supabase;

  // Inicializa Supabase
  try {
    supabase = getSupabaseClient();
  } catch (err) {
    console.error('Erro ao iniciar Supabase:', err);
    return res.status(500).json({
      error: 'Erro interno na configuração do Supabase.',
      detail: err.message || String(err)
    });
  }

  // GET /api/cases -> lista casos
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase GET /cases:', error);
        return res.status(500).json({
          error: 'Erro ao buscar casos no banco de dados.',
          detail: error.message || error.code || error
        });
      }

      return res.status(200).json(data || []);
    } catch (err) {
      console.error('Erro inesperado GET /cases:', err);
      return res.status(500).json({
        error: 'Erro inesperado ao buscar casos.',
        detail: err.message || String(err)
      });
    }
  }

  // POST /api/cases -> cria caso
  if (req.method === 'POST') {
    try {
      const { client_name, email, phone, area, summary } = req.body;

      if (!client_name || !email || !phone || !area || !summary) {
        return res.status(400).json({
          error: 'Campos obrigatórios faltando.',
          detail: { client_name, email, phone, area, summary }
        });
      }

      const { data, error } = await supabase
        .from('cases')
        .insert({
          client_name,
          email,
          phone,
          area,
          summary,
          status: 'CONTRATO_FECHADO'
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase POST /cases:', error);
        return res.status(500).json({
          error: 'Erro ao criar caso no banco de dados.',
          detail: error.message || error.code || error
        });
      }

      return res.status(201).json(data);
    } catch (err) {
      console.error('Erro inesperado POST /cases:', err);
      return res.status(500).json({
        error: 'Erro inesperado ao criar caso.',
        detail: err.message || String(err)
      });
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
