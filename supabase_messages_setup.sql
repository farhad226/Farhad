-- Run this in Supabase SQL editor to create the messages table

CREATE TABLE IF NOT EXISTS public.messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    subject text,
    message text NOT NULL,
    created_at bigint DEFAULT (extract(epoch from now()) * 1000)
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to post a message
CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Only authenticated admins can view messages
CREATE POLICY "Admin read access for messages" ON public.messages FOR SELECT USING (auth.role() = 'authenticated');
-- Admin delete access
CREATE POLICY "Admin delete access for messages" ON public.messages FOR DELETE USING (auth.role() = 'authenticated');
