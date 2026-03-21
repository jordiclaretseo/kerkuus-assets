import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientId, name, email, phone, message, source } = body;

    if (!clientId || !name || !email || !phone) {
      return NextResponse.json({ error: 'Falten camps obligatoris' }, { status: 400 });
    }

    const supabase = supabaseAdmin();
    const { error } = await supabase.from('leads').insert({
      client_id: clientId,
      name,
      email,
      phone,
      message,
      source,
      status: 'new'
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error intern del servidor' }, { status: 500 });
  }
}
