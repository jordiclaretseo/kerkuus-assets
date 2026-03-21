'use client';

import { useState } from 'react';

type LeadFormProps = {
  clientId: string;
  slug: string;
  accentColor: string;
};

export function LeadForm({ clientId, slug, accentColor }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setOk(false);

    const payload = {
      clientId,
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
      source: `landing:${slug}`
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'No s’ha pogut enviar el formulari');
      }

      setOk(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconegut');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Demana informació</h2>
      <p className="mt-2 text-sm text-slate-600">Et contactarem en menys de 24h.</p>

      <div className="mt-4 grid gap-3">
        <input name="name" required placeholder="Nom i cognoms" className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2" style={{ boxShadow: `0 0 0 0 ${accentColor}` }} />
        <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2" />
        <input name="phone" required placeholder="Telèfon" className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2" />
        <textarea name="message" rows={4} placeholder="Què necessites?" className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? 'Enviant...' : 'Vull més informació'}
      </button>

      {ok && <p className="mt-3 text-sm text-emerald-600">Lead enviat correctament ✅</p>}
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
    </form>
  );
}
