// pages/admin.js
import { useEffect, useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'CONTRATO_FECHADO', label: 'Contrato fechado' },
  { value: 'EM_ANALISE', label: 'Em análise' },
  { value: 'AGUARDANDO_DOC', label: 'Aguardando documentos' },
  { value: 'AJUIZADO', label: 'Ajuizado' },
  { value: 'ENCERRADO', label: 'Encerrado' }
];

export default function AdminPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    client_name: '',
    email: '',
    phone: '',
    area: '',
    summary: ''
  });

  async function loadCases() {
    setLoading(true);
    const res = await fetch('/api/cases');
    const json = await res.json();
    setCases(json || []);
    setLoading(false);
  }

  useEffect(() => {
    loadCases();
  }, []);

  async function handleCreateCase(e) {
    e.preventDefault();

    await fetch('/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({
      client_name: '',
      email: '',
      phone: '',
      area: '',
      summary: ''
    });

    loadCases();
  }

  async function handleStatusChange(id, status) {
    await fetch(`/api/cases/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    loadCases();
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050816', color: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <header style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0 }}>EZLAW • Painel do Administrador</h1>
          <p style={{ marginTop: '0.5rem', color: '#9ca3af' }}>
            Cadastre apenas os casos com contrato fechado e acompanhe o status.
          </p>
        </header>

        {/* Formulário para cadastrar novo caso */}
        <section
          style={{
            marginBottom: '2rem',
            background: '#0b1020',
            padding: '1.5rem',
            borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <h2 style={{ marginTop: 0 }}>Cadastrar novo caso</h2>

          <form
            onSubmit={handleCreateCase}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '0.75rem'
              }}
            >
              <label style={labelStyle}>
                Nome do cliente
                <input
                  style={inputStyle}
                  value={form.client_name}
                  onChange={e => setForm({ ...form, client_name: e.target.value })}
                  required
                />
              </label>

              <label style={labelStyle}>
                E-mail
                <input
                  style={inputStyle}
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>

              <label style={labelStyle}>
                Telefone
                <input
                  style={inputStyle}
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </label>

              <label style={labelStyle}>
                Área
                <input
                  style={inputStyle}
                  placeholder="Previdenciário, Trabalhista..."
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                  required
                />
              </label>
            </div>

            <label style={labelStyle}>
              Resumo do caso
              <textarea
                style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                value={form.summary}
                onChange={e => setForm({ ...form, summary: e.target.value })}
                required
              />
            </label>

            <button
              type="submit"
              style={{
                marginTop: '0.5rem',
                alignSelf: 'flex-start',
                padding: '0.6rem 1.4rem',
                borderRadius: 999,
                border: 'none',
                background: 'linear-gradient(120deg, #6c5ce7, #a855f7, #ec4899)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Salvar caso
            </button>
          </form>
        </section>

        {/* Lista de casos */}
        <section
          style={{
            background: '#0b1020',
            padding: '1.5rem',
            borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <h2 style={{ marginTop: 0 }}>Casos com contrato fechado</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : cases.length === 0 ? (
            <p>Nenhum caso cadastrado ainda.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Cliente</th>
                    <th style={thStyle}>Área</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Contato</th>
                    <th style={thStyle}>Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #1f2937' }}>
                      <td style={tdStyle}>
                        <strong>{c.client_name}</strong>
                        <br />
                        <small style={{ color: '#9ca3af' }}>{c.summary}</small>
                      </td>
                      <td style={tdStyle}>{c.area}</td>
                      <td style={tdStyle}>
                        <select
                          style={inputStyle}
                          value={c.status}
                          onChange={e => handleStatusChange(c.id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={tdStyle}>
                        <small>{c.email}</small>
                        <br />
                        <small>{c.phone}</small>
                      </td>
                      <td style={tdStyle}>
                        <small>
                          {c.created_at
                            ? new Date(c.created_at).toLocaleDateString('pt-BR')
                            : '-'}
                        </small>
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

const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 14, gap: 4 };

const inputStyle = {
  marginTop: 4,
  width: '100%',
  borderRadius: 10,
  border: '1px solid #1f2937',
  padding: '0.5rem 0.75rem',
  background: '#050816',
  color: '#f9fafb',
  fontSize: 14
};

const thStyle = {
  textAlign: 'left',
  padding: '0.5rem',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '#9ca3af'
};

const tdStyle = {
  padding: '0.5rem',
  verticalAlign: 'top'
};
