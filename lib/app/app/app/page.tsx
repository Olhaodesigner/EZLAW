import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 30 }}>
      <h1>EZLAW • Admin</h1>
      <p>Gerencie casos com contrato fechado.</p>

      <Link href="/admin" style={{
        padding: "10px 20px",
        background: "#6c5ce7",
        borderRadius: 8,
        display: "inline-block",
        marginTop: 20
      }}>Acessar painel</Link>
    </main>
  );
}
