// pages/index.js
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [login, setLogin] = useState({
    identifier: '',
    password: ''
  });

  function handleLoginSubmit(e) {
    e.preventDefault();
    // Aqui no futuro vamos integrar com Supabase/Auth etc.
    alert('Login de cliente ainda em desenvolvimento. 😉');
  }

  return (
    <main className="page">
      <div className="shell">
        <div className="card" style={{ maxWidth: 520, margin: '4rem auto' }}>
          <h1 className="app-title">
            <span>EZLAW</span> • Admin
          </h1>
          <p className="app-subtitle">
            Conecte pessoas e advogados com acompanhamento simples do status do caso.
          </p>

          {/* Login do cliente */}
          <form className="form" onSubmit={handleLoginSubmit} style={{ marginTop: '1.5rem' }}>
            <h2 className="card-title" style={{ marginBottom: '0.75rem' }}>
              Acesso do cliente
            </h2>
            <p className="card-subtitle">
              Entre para acompanhar o andamento do seu caso, ver atualizações e falar rápido com
              nossa equipe.
            </p>

            <label className="form-label">
              <span>E-mail ou CPF</span>
              <input
                className="input"
                value={login.identifier}
                onChange={e => setLogin({ ...login, identifier: e.target.value })}
                placeholder="seuemail@exemplo.com ou 000.000.000-00"
                required
              />
            </label>

            <label className="form-label">
              <span>Senha</span>
              <input
                className="input"
                type="password"
                value={login.password}
                onChange={e => setLogin({ ...login, password: e.target.value })}
                placeholder="Digite sua senha"
                required
              />
            </label>

            <button type="submit" className="btn-primary">
              Entrar como cliente
            </button>
          </form>

          {/* Link para administrador */}
          <div style={{ marginTop: '1.75rem', borderTop: '1px solid rgba(148,163,184,0.25)', paddingTop: '1.25rem' }}>
            <p className="muted" style={{ marginBottom: '0.6rem' }}>
              É advogado ou administrador da equipe?
            </p>
            <Link href="/admin" legacyBehavior>
              <a className="btn-primary" style={{ background: 'rgba(15,23,42,0.9)' }}>
                Entrar como administrador
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
