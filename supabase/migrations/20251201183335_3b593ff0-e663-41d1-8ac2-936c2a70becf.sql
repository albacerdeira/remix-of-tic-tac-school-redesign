-- Create table for enrollment inquiries
CREATE TABLE public.enrollment_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  course_for TEXT NOT NULL CHECK (course_for IN ('adult', 'child')),
  child_age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.enrollment_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit enrollment inquiries" 
ON public.enrollment_inquiries 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent public reading (admin only)
CREATE POLICY "Only service role can read enrollment inquiries" 
ON public.enrollment_inquiries 
FOR SELECT 
USING (false);