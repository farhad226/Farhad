-- Supabase SQL Setup Script
-- Run this script in your Supabase SQL Editor.

-- 1. Create table for portfolio items
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  created_at bigint NOT NULL
);

-- 2. Create table for skills
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  percentage integer NOT NULL,
  icon text,
  created_at bigint NOT NULL
);

-- 3. Create table for services
CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  icon text,
  created_at bigint NOT NULL
);

-- 4. Create table for site info
CREATE TABLE IF NOT EXISTS public.site_info (
  id text PRIMARY KEY,
  email text,
  phone text,
  location text,
  updated_at bigint
);

-- Insert default site info
INSERT INTO public.site_info (id, email, phone, location, updated_at)
VALUES ('contact', 'farhadhossain6920@gmail.com', '01604118643', 'Dhaka, Bangladesh', extract(epoch from now())::bigint)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_info ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all these tables
CREATE POLICY "Public read access for portfolio" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read access for site_info" ON public.site_info FOR SELECT USING (true);

-- Allow authenticated users (admin) to modify data
CREATE POLICY "Admin write access for portfolio" ON public.portfolio_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for site_info" ON public.site_info FOR ALL USING (auth.role() = 'authenticated');
