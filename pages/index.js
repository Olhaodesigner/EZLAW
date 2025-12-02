// pages/index.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <div className="shell">
        <div className="card" style={{ maxWidth: 480, margin: '4rem auto' }}>
          <h1 className="app-title">
            <span>EZLAW</span> • Admin
          </h1>
          <p className="app-subtitle" style={{ marginBottom: '1.5rem' }}>
            Painel administrativo para gerenciar apenas os casos com contrato fechado.
          </p>

          <p className="muted" style={{ marginBottom: '1.25rem' }}>
            Use esta área apenas para cadastrar clientes que já fecharam contrato com você
            ou com sua equipe. O status será sincronizado futuramente com o app do cliente.
          </p>

          <Link href="/admin" legacyBehavior>
            <a className="btn-primary">Acessar painel do administrador</a>
          </Link>
        </div>
      </div>
    </main>
  );
}
