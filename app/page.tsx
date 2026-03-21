import Link from 'next/link';

const samples = [
  { slug: 'restaurant-can-brasa', label: 'Restaurant' },
  { slug: 'escola-sant-jordi', label: 'Escola' },
  { slug: 'gimnas-fitzone', label: 'Gimnàs' }
];

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <div className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
        <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          SaaS de captació local
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Landing pages automàtiques + CRM simple per negocis locals.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          MVP amb Next.js, Tailwind i Supabase per captar leads, visualitzar-los al dashboard i fer seguiment comercial amb un embut bàsic.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {samples.map((sample) => (
            <Link
              key={sample.slug}
              href={`/${sample.slug}`}
              className="rounded-2xl border border-slate-200 p-4 text-sm transition hover:border-blue-400 hover:bg-blue-50"
            >
              Veure demo {sample.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
