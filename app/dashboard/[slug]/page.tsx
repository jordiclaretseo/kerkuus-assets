import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import type { Client, Lead, LeadStatus } from '@/lib/types';

const statuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost'];

async function getDashboardData(slug: string) {
  const supabase = supabaseAdmin();

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', slug)
    .single<Client>();

  if (!client) return null;

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('client_id', client.id)
    .order('created_at', { ascending: false })
    .returns<Lead[]>();

  return { client, leads: leads || [] };
}

export default async function DashboardPage({ params }: { params: { slug: string } }) {
  const data = await getDashboardData(params.slug);
  if (!data) notFound();

  const totalLeads = data.leads.length;
  const wonLeads = data.leads.filter((lead) => lead.status === 'won').length;
  const conversion = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">CRM · {data.client.business_name}</h1>
          <p className="text-slate-600">Pipeline simple per fer seguiment de leads.</p>
        </div>
      </header>

      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card title="Leads totals" value={String(totalLeads)} />
        <Card title="Leads guanyats" value={String(wonLeads)} />
        <Card title="Conversió" value={`${conversion}%`} />
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">Contacte</th>
              <th className="px-4 py-3">Missatge</th>
              <th className="px-4 py-3">Origen</th>
              <th className="px-4 py-3">Estat</th>
            </tr>
          </thead>
          <tbody>
            {data.leads.map((lead) => (
              <tr key={lead.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-slate-600">{lead.email}</p>
                  <p className="text-slate-500">{lead.phone}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{lead.message || '-'}</td>
                <td className="px-4 py-3">{lead.source}</td>
                <td className="px-4 py-3">
                  <form action={`/api/leads/${lead.id}/status`} method="POST">
                    <input type="hidden" name="slug" value={data.client.slug} />
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="rounded-lg border border-slate-300 px-2 py-1"
                      onChange={(e) => e.currentTarget.form?.requestSubmit()}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </form>
                </td>
              </tr>
            ))}
            {data.leads.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={4}>
                  Encara no hi ha leads.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  );
}
