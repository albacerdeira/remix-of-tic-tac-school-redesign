-- Create contacts table to store lead information
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contacts (public form)
CREATE POLICY "Anyone can insert contacts"
ON public.contacts
FOR INSERT
WITH CHECK (true);

-- Create policy to prevent reading contacts (privacy)
CREATE POLICY "No one can read contacts"
ON public.contacts
FOR SELECT
USING (false);