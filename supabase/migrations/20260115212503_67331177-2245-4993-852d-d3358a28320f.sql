-- Drop existing restrictive policies
DROP POLICY IF EXISTS "No one can read contacts" ON public.contacts;
DROP POLICY IF EXISTS "Only service role can read enrollment inquiries" ON public.enrollment_inquiries;

-- Create policies that allow authenticated users to read contacts
CREATE POLICY "Authenticated users can read contacts"
ON public.contacts
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create policies that allow authenticated users to delete contacts
CREATE POLICY "Authenticated users can delete contacts"
ON public.contacts
FOR DELETE
USING (auth.role() = 'authenticated');

-- Create policies that allow authenticated users to read enrollment inquiries
CREATE POLICY "Authenticated users can read enrollment inquiries"
ON public.enrollment_inquiries
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create policies that allow authenticated users to delete enrollment inquiries
CREATE POLICY "Authenticated users can delete enrollment inquiries"
ON public.enrollment_inquiries
FOR DELETE
USING (auth.role() = 'authenticated');