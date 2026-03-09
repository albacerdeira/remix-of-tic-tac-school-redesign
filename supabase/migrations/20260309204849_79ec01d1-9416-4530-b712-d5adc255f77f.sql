
ALTER TABLE public.contacts 
  ADD COLUMN utm_source TEXT,
  ADD COLUMN utm_medium TEXT,
  ADD COLUMN utm_campaign TEXT,
  ADD COLUMN referrer TEXT;

ALTER TABLE public.enrollment_inquiries 
  ADD COLUMN utm_source TEXT,
  ADD COLUMN utm_medium TEXT,
  ADD COLUMN utm_campaign TEXT,
  ADD COLUMN referrer TEXT;
