create extension if not exists pgcrypto;

create table if not exists public.book_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('ENDO-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  name text not null,
  email text not null,
  payment_method text not null check (payment_method in ('zain_cash', 'switch_card')),
  amount_usd numeric(10, 2) not null default 19,
  order_token uuid not null unique,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  verified_at timestamptz
);

alter table public.book_orders enable row level security;

insert into storage.buckets (id, name, public)
values ('books', 'books', false)
on conflict (id) do nothing;
