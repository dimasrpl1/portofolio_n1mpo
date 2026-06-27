-- =========================================================
-- Skema tabel komentar + Row Level Security (RLS)
-- Jalankan di Supabase: SQL Editor > New query > paste > Run
-- =========================================================

create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 60),
  message     text not null check (char_length(message) between 1 and 500),
  created_at  timestamptz not null default now()
);

create index if not exists comments_created_at_idx
  on public.comments (created_at desc);

-- Aktifkan RLS
alter table public.comments enable row level security;

-- Publik boleh MEMBACA semua komentar
drop policy if exists "comments_select_public" on public.comments;
create policy "comments_select_public"
  on public.comments for select
  to anon, authenticated
  using (true);

-- Publik boleh MENAMBAH komentar (insert)
-- Catatan: teks sudah disensor di server sebelum sampai sini.
drop policy if exists "comments_insert_public" on public.comments;
create policy "comments_insert_public"
  on public.comments for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 60
    and char_length(message) between 1 and 500
  );

-- Tidak ada policy UPDATE/DELETE => publik tidak bisa ubah/hapus.

-- Aktifkan Realtime untuk tabel ini:
alter publication supabase_realtime add table public.comments;
