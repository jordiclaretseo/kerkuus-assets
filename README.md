# Local Leads SaaS (Next.js + Tailwind + Supabase)

SaaS orientat a negocis locals (restaurants, escoles, gimnasos) per captació de leads i gestió comercial bàsica.

## Funcionalitats incloses

- Landing page automàtica per client (`/[slug]`).
- Formulari de captació de leads amb inserció a Supabase.
- Dashboard per cada client (`/dashboard/[slug]`) amb mètriques bàsiques.
- CRM simple (pipeline via estats: `new`, `contacted`, `qualified`, `won`, `lost`).
- Disseny modern/minimalista amb Tailwind.
- Preparat per monetització recurrent (base multi-client + plans en schema suggerit).

## Stack

- Next.js (App Router)
- Tailwind CSS
- Supabase (Postgres + API)

## 1) Instal·lació

```bash
npm install
```

## 2) Configura variables d'entorn

Copia el fitxer d'exemple:

```bash
cp .env.example .env.local
```

Omple:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL` (opcional, per links públics)

## 3) Crea taules i dades demo a Supabase

A SQL Editor de Supabase, executa:

- `supabase/schema.sql`

Això crea:

- `clients`
- `leads`
- índexos
- 3 clients de demo:
  - `restaurant-can-brasa`
  - `escola-sant-jordi`
  - `gimnas-fitzone`

## 4) Executa en local

```bash
npm run dev
```

Obre `http://localhost:3000`.

## Rutes principals

- Home: `/`
- Landing client: `/{slug}`
- Dashboard client: `/dashboard/{slug}`
- API alta lead: `POST /api/leads`
- API canvi estat lead: `POST /api/leads/{id}/status`

## Monetització (subscripció mensual)

L'MVP queda preparat a nivell d'arquitectura multi-client. Per monetitzar:

1. Afegeix taules `plans` i `subscriptions`.
2. Integra Stripe Checkout + Billing Portal.
3. Limita funcionalitats segons pla (ex: leads/mes, usuaris, automatitzacions).
4. Webhooks per activar/suspendre comptes segons pagament.

## Notes de seguretat (MVP)

- Actualment el dashboard no incorpora autenticació d'usuaris; és un MVP funcional.
- En producció, afegeix auth (Supabase Auth/Clerk), RLS i permisos per client.
