// pages/api/cases/[id].js
import { getSupabaseClient } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { id } = req.query;
  let supabase;

  try {
    supabase = getSupabaseClient();
  } catch (err) {
    console.error('Erro ao iniciar Supabase:', err);
    return res
      .status(500)
      .json({ error: 'Erro interno na configuração do Supabase.' });
  }

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status obrigatório.' });
      }

      const { data, error } = await supabase
        .from('cases')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase PATCH /cases/[id]:', error);
        return res
          .status(500)
          .json({ error: 'Erro ao atualizar status no banco de dados.' });
      }

      return res.status(200).json(data);
    } catch (err) {
      console.error('Erro inesperado PATCH /cases/[id]:', err);
      return res
        .status(500)
        .json({ error: 'Erro inesperado ao atualizar status.' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
