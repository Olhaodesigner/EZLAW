"use client";

import { useEffect, useState } from "react";

interface Case {
  id: number;
  client_name: string;
  email: string;
  phone: string;
  area: string;
  summary: string;
  status: string;
  created_at?: string;
}

export default function AdminPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [form, setForm] = useState({
    client_name: "",
    email: "",
    phone: "",
    area: "",
    summary: "",
  });

  async function loadCases() {
    const res = await fetch("/api/cases");
    setCases(await res.json());
  }

  useEffect(() => {
    loadCases();
  }, []);

  async function createCase(e: any) {
    e.preventDefault();

    await fetch("/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ client_name: "", email: "", phone: "", area: "", summary: "" });
    loadCases();
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/cases/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    loadCases();
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>Administração de Casos</h1>

      <form onSubmit={createCase} style={{ marginBottom: 30 }}>
        <input placeholder="Nome" value={form.client_name}
          onChange={e => setForm({ ...form, client_name: e.target.value })} />

        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input placeholder="Telefone" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} />

        <input placeholder="Área" value={form.area}
          onChange={e => setForm({ ...form, area: e.target.value })} />

        <textarea placeholder="Resumo" value={form.summary}
          onChange={e => setForm({ ...form, summary: e.target.value })} />

        <button type="submit">Criar Caso</button>
      </form>

      <h2>Casos Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Área</th>
            <th>Status</th>
            <th>Contato</th>
          </tr>
        </thead>

        <tbody>
          {cases.map(c => (
            <tr key={c.id}>
              <td>{c.client_name}</td>
              <td>{c.area}</td>
              <td>
                <select value={c.status}
                  onChange={e => updateStatus(c.id, e.target.value)}>
                  <option value="CONTRATO_FECHADO">Contrato Fechado</option>
                  <option value="EM_ANALISE">Em Análise</option>
                  <option value="AGUARDANDO_DOC">Aguardando Documentos</option>
                  <option value="AJUIZADO">Ajuizado</option>
                  <option value="ENCERRADO">Encerrado</option>
                </select>
              </td>
              <td>{c.email}<br />{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
