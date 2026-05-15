-- Run this in Supabase SQL editor to add the new features

-- 1. Add link to portfolio_items
ALTER TABLE public.portfolio_items ADD COLUMN IF NOT EXISTS link text;

-- 2. Add resume_url to site_info
ALTER TABLE public.site_info ADD COLUMN IF NOT EXISTS resume_url text;

-- 3. Setup Storage for uploads (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true) ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');
