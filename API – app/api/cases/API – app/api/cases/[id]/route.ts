import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function PATCH(req: Request, { params }: any) {
  const supabase = supabaseServer();
  const body = await req.json();

  const { status } = body;

  const { data, error } = await supabase
    .from("cases")
    .update({ status })
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}
