// pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const VALID_USER = 'juliocesar';
const VALID_PASS = '1234';

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState({ user: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Se já estiver logado, manda direto pro /admin
    if (typeof window === 'undefined') return;
    const logged = window.localStorage.getItem('ezlaw_admin_logged');
    if (logged === 'true') {
      router.replace('/admin');
    }
  }, [router]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.user === VALID_USER && form.password === VALID_PASS) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('ezlaw_admin_logged', 'true');
      }
      router.push('/admin');
    } else {
      setError('Usuário ou senha inválidos.');
    }
  }

  return (
    <main className="page">
      <div className="shell">
        <div className="card" style={{ maxWidth: 520, margin: '4rem auto' }}>
          <h1 className="app-title">
            <span>EZLAW</span> • Painel Administrativo
          </h1>
          <p className="app-subtitle">
            Acesse o painel exclusivo da administração para gerenciar apenas os casos com contrato
            fechado.
          </p>

          <form className="form" onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <h2 className="card-title" style={{ marginBottom: '0.75rem' }}>
              Login do administrador
            </h2>
            <p className="card-subtitle">
              Use as credenciais internas definidas por você. Este acesso não é público.
            </p>

            <label className="form-label">
              <span>Usuário</span>
              <input
                className="input"
                value={form.user}
                onChange={e => setForm({ ...form, user: e.target.value })}
                placeholder="Ex.: juliocesar"
                required
              />
            </label>

            <label className="form-label">
              <span>Senha</span>
              <input
                className="input"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Ex.: 1234"
                required
              />
            </label>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="btn-primary">
              Entrar no painel do administrador
            </button>
          </form>

          <p className="muted" style={{ marginTop: '1.5rem' }}>
            Futuramente, este login pode ser integrado com Supabase Auth ou outro provedor seguro.
            Por enquanto, é apenas um bloqueio simples para uso interno da sua equipe.
          </p>
        </div>
      </div>
    </main>
  );
}
