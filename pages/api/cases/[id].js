// pages/api/cases/[id].js
import { getSupabaseClient } from '../../../lib/supabase';

export default async function handler(req, res) {
  const supabase = getSupabaseClient();
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status obrigatório' });
    }

    const { data, error } = await supabase
      .from('cases')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar status' });
    }

    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
