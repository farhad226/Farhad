-- Run this in your Supabase SQL Editor to create the necessary tables for Analytics and Experience

-- 1. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    company text NOT NULL,
    company_url text,
    role text NOT NULL,
    period text NOT NULL,
    description text NOT NULL,
    created_at bigint DEFAULT (extract(epoch from now()) * 1000)
);

-- Enable RLS
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

-- Policies for Experience
CREATE POLICY "Public read access for experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Admin write access for experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');


-- 2. Page Visits Table (for Analytics)
CREATE TABLE IF NOT EXISTS public.page_visits (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path text NOT NULL,
    referrer text,
    visited_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Policies for Page Visits
CREATE POLICY "Anyone can insert page visits" ON public.page_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read access for page visits" ON public.page_visits FOR SELECT USING (auth.role() = 'authenticated');
