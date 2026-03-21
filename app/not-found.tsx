import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <p className="text-sm text-slate-500">404</p>
        <h1 className="mt-2 text-3xl font-bold">Pàgina no trobada</h1>
        <p className="mt-2 text-slate-600">Aquest client encara no existeix o no està configurat.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-slate-900 px-4 py-2 text-white">
          Tornar a inici
        </Link>
      </div>
    </main>
  );
}
