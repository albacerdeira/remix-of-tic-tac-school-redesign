do $$ begin
  create type public.app_role as enum ('admin', 'user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

drop policy if exists "Users can view their own roles" on public.user_roles;
create policy "Users can view their own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

insert into public.user_roles (user_id, role)
select id, 'admin'::public.app_role from auth.users
on conflict (user_id, role) do nothing;

drop policy if exists "Authenticated users can read contacts" on public.contacts;
drop policy if exists "Authenticated users can delete contacts" on public.contacts;
create policy "Admins can read contacts" on public.contacts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update contacts" on public.contacts
  for update to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete contacts" on public.contacts
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Authenticated users can read enrollment inquiries" on public.enrollment_inquiries;
drop policy if exists "Authenticated users can delete enrollment inquiries" on public.enrollment_inquiries;
create policy "Admins can read enrollment inquiries" on public.enrollment_inquiries
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update enrollment inquiries" on public.enrollment_inquiries
  for update to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete enrollment inquiries" on public.enrollment_inquiries
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Authenticated users can view clicks" on public.contact_clicks;
create policy "Admins can view clicks" on public.contact_clicks
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete clicks" on public.contact_clicks
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));