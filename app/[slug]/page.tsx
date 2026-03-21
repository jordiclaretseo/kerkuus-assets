import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LeadForm } from '@/components/LeadForm';
import { supabaseAdmin } from '@/lib/supabase';
import type { Client } from '@/lib/types';

async function getClientBySlug(slug: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', slug)
    .single<Client>();

  if (error) return null;
  return data;
}

export default async function ClientLandingPage({ params }: { params: { slug: string } }) {
  const client = await getClientBySlug(params.slug);

  if (!client) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:grid-cols-2 md:p-10">
        <div>
          <p className="inline-flex rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${client.primary_color}22`, color: client.primary_color }}>
            {client.category.toUpperCase()}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">{client.headline}</h1>
          <p className="mt-3 text-slate-600">{client.subheadline}</p>

          <div className="mt-8 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-900">Oferta destacada</p>
            <p className="mt-1 text-slate-600">{client.offer_text}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-slate-200 px-3 py-1">📞 {client.phone || 'No disponible'}</span>
            <span className="rounded-full border border-slate-200 px-3 py-1">💬 {client.whatsapp || 'No disponible'}</span>
          </div>

          <Link href={`/dashboard/${client.slug}`} className="mt-8 inline-block text-sm font-semibold" style={{ color: client.primary_color }}>
            Obrir dashboard →
          </Link>
        </div>

        <LeadForm clientId={client.id} slug={client.slug} accentColor={client.primary_color} />
      </section>
    </main>
  );
}
