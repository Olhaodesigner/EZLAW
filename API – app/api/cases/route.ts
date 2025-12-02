import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET() {
  const supabase = supabaseServer();
  const { data } = await supabase.from("cases").select("*").order("id", { ascending: false });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { client_name, email, phone, area, summary } = body;

  const { data, error } = await supabase
    .from("cases")
    .insert({
      client_name,
      email,
      phone,
      area,
      summary,
      status: "CONTRATO_FECHADO"
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}
