// pages/admin.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const STATUS_OPTIONS = [
  { value: 'CONTRATO_FECHADO', label: 'Contrato fechado' },
  { value: 'EM_ANALISE', label: 'Em análise' },
  { value: 'AGUARDANDO_DOC', label: 'Aguardando documentos' },
  { value: 'AJUIZADO', label: 'Ajuizado' },
  { value: 'ENCERRADO', label: 'Encerrado' }
];

const AREA_OPTIONS = [
  'Previdenciário',
  'Trabalhista',
  'Cível',
  'Família e Sucessões',
  'Consumidor',
  'Empresarial',
  'Tributário',
  'Penal',
  'Outros'
];

export default function AdminPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    client_name: '',
    email: '',
    phone: '',
    area: AREA_OPTIONS[0],
    summary: ''
  });

  // Checa se está logado
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const logged = window.localStorage.getItem('ezlaw_admin_logged');
    if (logged === 'true') {
      setAuthChecking(false);
    } else {
      router.replace('/');
    }
  }, [router]);

  async function loadCases() {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/cases');
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || 'Erro ao carregar casos');
      }
      setCases(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Falha ao buscar casos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authChecking) {
      loadCases();
    }
  }, [authChecking]);
