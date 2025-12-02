// pages/index.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050816',
        color: '#f9fafb',
        padding: '1rem'
      }}
    >
      <div
        style={{
          maxWidth: 480,
          background: '#0b1020',
          padding: '2rem',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: '0.5rem' }}>EZLAW • Admin</h1>
        <p style={{ marginTop: 0, marginBottom: '1.5rem', color: '#9ca3af' }}>
          Painel administrativo para gerenciar apenas os casos com contrato fechado.
        </p>
        <Link
          href="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.6rem 1.4rem',
            borderRadius: 999,
            background: '#6c5ce7',
            fontWeight: 600
          }}
        >
          Acessar painel do administrador
        </Link>
      </div>
    </main>
  );
}
