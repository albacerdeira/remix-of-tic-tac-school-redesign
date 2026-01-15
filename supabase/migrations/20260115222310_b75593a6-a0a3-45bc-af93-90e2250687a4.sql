-- Create table to track contact link clicks
CREATE TABLE public.contact_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_type TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_url TEXT,
  user_agent TEXT
);

-- Enable RLS
ALTER TABLE public.contact_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert clicks (public tracking)
CREATE POLICY "Anyone can insert clicks"
ON public.contact_clicks
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view clicks (admin only)
CREATE POLICY "Authenticated users can view clicks"
ON public.contact_clicks
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Create index for faster queries
CREATE INDEX idx_contact_clicks_link_type ON public.contact_clicks(link_type);
CREATE INDEX idx_contact_clicks_clicked_at ON public.contact_clicks(clicked_at DESC);