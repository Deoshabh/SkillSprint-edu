-- Minimal Schema for Quick Testing
-- Run this if you can't access the full Supabase dashboard

-- Basic profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    selected_track TEXT,
    daily_goal INTEGER DEFAULT 60,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Allow public access for testing (remove in production)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON public.profiles FOR ALL USING (true);
