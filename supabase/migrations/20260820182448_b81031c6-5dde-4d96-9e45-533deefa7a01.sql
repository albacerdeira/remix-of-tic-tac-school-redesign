alter function public.has_role(uuid, public.app_role) security invoker;

revoke all on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

drop policy if exists "Admins can read contacts" on public.contacts;
drop policy if exists "Admins can update contacts" on public.contacts;
drop policy if exists "Admins can delete contacts" on public.contacts;
create policy "Admins can read contacts" on public.contacts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update contacts" on public.contacts
  for update to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete contacts" on public.contacts
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can read enrollment inquiries" on public.enrollment_inquiries;
drop policy if exists "Admins can update enrollment inquiries" on public.enrollment_inquiries;
drop policy if exists "Admins can delete enrollment inquiries" on public.enrollment_inquiries;
create policy "Admins can read enrollment inquiries" on public.enrollment_inquiries
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update enrollment inquiries" on public.enrollment_inquiries
  for update to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete enrollment inquiries" on public.enrollment_inquiries
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can view clicks" on public.contact_clicks;
drop policy if exists "Admins can delete clicks" on public.contact_clicks;
create policy "Admins can view clicks" on public.contact_clicks
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete clicks" on public.contact_clicks
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));