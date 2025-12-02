// pages/api/cases/index.js
import { getSupabaseClient } from '../../../lib/supabase';

export default async function handler(req, res) {
  const supabase = getSupabaseClient();

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar casos' });
    }

    return res.status(200).json(data || []);
  }

  if (req.method === 'POST') {
    const { client_name, email, phone, area, summary } = req.body;

    if (!client_name || !email || !phone || !area || !summary) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
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
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar caso' });
    }

    return res.status(201).json(data);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
