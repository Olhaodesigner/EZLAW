// pages/admin.js
import { useEffect, useState } from 'react';

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
    loadCases();
  }, []);

  async function handleCreateCase(e) {
    e.preventDefault();
    try {
      setError('');
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || 'Erro ao criar caso');
      }
      setForm({
        client_name: '',
        email: '',
        phone: '',
        area: AREA_OPTIONS[0],
        summary: ''
      });
      await loadCases();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Falha ao salvar caso');
    }
  }

  async function handleStatusChange(id, status) {
    try {
      setError('');
      const res = await fetch(`/api/cases/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || 'Erro ao atualizar status');
      }
      await loadCases();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Falha ao atualizar status');
    }
  }

  return (
    <main className="page">
      <div className="shell">
        <header className="app-topbar">
          <div>
            <div className="app-title">
              <span>EZLAW</span> • Painel do Administrador
            </div>
            <p className="app-subtitle">
              Cadastre apenas os casos com contrato fechado e acompanhe o status da carteira.
            </p>
          </div>
        </header>

        {/* CARD: Formulário */}
        <section className="card">
          <h2 className="card-title">Cadastrar novo caso</h2>
          <p className="card-subtitle">
            Use este formulário somente após o contrato estar assinado e os honorários definidos.
          </p>

          <form className="form" onSubmit={handleCreateCase}>
            <div className="form-grid">
              <label className="form-label">
                <span>Nome do cliente</span>
                <input
                  className="input"
                  value={form.client_name}
                  onChange={e => setForm({ ...form, client_name: e.target.value })}
                  required
                />
              </label>

              <label className="form-label">
                <span>E-mail</span>
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>

              <label className="form-label">
                <span>Telefone</span>
                <input
                  className="input"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </label>

              <label className="form-label">
                <span>Área de atuação</span>
                <select
                  className="select"
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                  required
                >
                  {AREA_OPTIONS.map(area => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-label">
              <span>Resumo do caso</span>
              <textarea
                className="textarea"
                value={form.summary}
                onChange={e => setForm({ ...form, summary: e.target.value })}
                required
              />
            </label>

            <button type="submit" className="btn-primary">
              Salvar caso
            </button>

            <p className="muted">
              Exemplo de uso: “Aposentadoria por idade urbana – DER 10/05/2024 – contrato 30% sobre
              atrasados + 20% sobre os 12 primeiros meses”.
            </p>
          </form>
        </section>

        {/* CARD: Lista de casos */}
        <section className="card">
          <h2 className="card-title">Casos com contrato fechado</h2>
          <p className="card-subtitle">
            Visualize rapidamente a carteira atual e ajuste o status conforme a movimentação
            processual.
          </p>

          {error && <p className="error-text">{error}</p>}

          {loading ? (
            <p className="muted">Carregando...</p>
          ) : cases.length === 0 ? (
            <p className="muted">
              Nenhum caso cadastrado ainda. Assim que você salvar o primeiro contrato, ele aparecerá
              aqui.
            </p>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Área</th>
                    <th>Status</th>
                    <th>Contato</th>
                    <th>Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map(c => (
                    <tr key={c.id}>
                      <td>
                        <strong>{c.client_name}</strong>
                        <br />
                        <span className="muted">{c.summary}</span>
                      </td>
                      <td>{c.area}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <select
                            className="select"
                            value={c.status}
                            onChange={e => handleStatusChange(c.id, e.target.value)}
                          >
                            {STATUS_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <span className={`status-pill status-${c.status}`}>
                            {STATUS_OPTIONS.find(opt => opt.value === c.status)?.label || c.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>
                          <div>{c.email}</div>
                          <div>{c.phone}</div>
                        </div>
                      </td>
                      <td>
                        <span className="muted">
                          {c.created_at
                            ? new Date(c.created_at).toLocaleDateString('pt-BR')
                            : '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
