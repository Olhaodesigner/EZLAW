// pages/index.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <div className="shell">
        <div className="card" style={{ maxWidth: 520, margin: '4rem auto' }}>
          <h1 className="app-title">
            <span>EZLAW</span> • Painel Administrativo
          </h1>
          <p className="app-subtitle">
            Centralize os casos com contrato fechado, acompanhe o status e mantenha sua equipe
            alinhada.
          </p>

          <p className="muted" style={{ marginBottom: '1.25rem' }}>
            Este painel é exclusivo da administração. Aqui você cadastra apenas clientes com
            contrato assinado e atualiza o status conforme o andamento do processo.
          </p>

          <Link href="/admin" legacyBehavior>
            <a className="btn-primary">Entrar no painel do administrador</a>
          </Link>
        </div>
      </div>
    </main>
  );
}
