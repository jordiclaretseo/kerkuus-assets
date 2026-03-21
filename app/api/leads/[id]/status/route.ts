import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { LeadStatus } from '@/lib/types';

const allowedStatuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost'];

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const formData = await req.formData();
  const status = String(formData.get('status') || 'new') as LeadStatus;
  const slug = String(formData.get('slug') || '');

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: 'Status invàlid' }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { error } = await supabase.from('leads').update({ status }).eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL(`/dashboard/${slug}`, req.url));
}
