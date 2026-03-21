create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  business_name text not null,
  category text not null check (category in ('restaurant', 'escola', 'gimnas')),
  headline text not null,
  subheadline text not null,
  offer_text text not null,
  primary_color text not null default '#2563eb',
  phone text,
  whatsapp text,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  message text,
  source text not null default 'landing',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  created_at timestamptz not null default now()
);

create index if not exists idx_leads_client_id on public.leads(client_id);
create index if not exists idx_leads_status on public.leads(status);

insert into public.clients (slug, business_name, category, headline, subheadline, offer_text, primary_color, phone, whatsapp)
values
  ('restaurant-can-brasa', 'Can Brasa', 'restaurant', 'Reserva taula avui i rep un 10% de descompte', 'Cuina mediterrània amb producte local, ideal per famílies i grups.', 'Cupó de benvinguda per noves reserves online.', '#f97316', '+34 600 000 111', '+34 600 000 111'),
  ('escola-sant-jordi', 'Escola Sant Jordi', 'escola', 'Matrícula oberta 2026-2027', 'Projecte educatiu innovador, anglès i robòtica des de primària.', 'Visita guiada gratuïta per famílies interessades.', '#2563eb', '+34 600 000 222', '+34 600 000 222'),
  ('gimnas-fitzone', 'FitZone', 'gimnas', 'Posa’t en forma amb 7 dies gratis', 'Entrenadors personals i classes dirigides cada dia.', 'Prova completa sense compromís i diagnòstic corporal inclòs.', '#16a34a', '+34 600 000 333', '+34 600 000 333')
on conflict (slug) do nothing;
