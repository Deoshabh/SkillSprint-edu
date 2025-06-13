-- Enhanced fix for authentication and RLS policies
-- Run this in your Supabase SQL Editor

-- 1. Drop existing policies to start fresh
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- 2. Drop and recreate the trigger function with better security
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Create improved function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  -- Insert profile with all necessary fields
  INSERT INTO public.profiles (
    id, 
    email, 
    name, 
    onboarding_completed,
    selected_track,
    daily_goal,
    current_level,
    total_points,
    study_streak,
    total_study_time,
    badges,
    preferences,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    false,
    NULL,
    60,
    1,
    0,
    0,
    0,
    '[]'::jsonb,
    '{}'::jsonb,
    NOW(),
    NOW()
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, that's fine
    RETURN NEW;
  WHEN others THEN
    -- Log error but don't fail user creation
    RAISE WARNING 'Could not create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- 4. Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- 5. Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 6. Create comprehensive RLS policies for profiles
CREATE POLICY "Enable read access for users to their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable insert access for users to their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update access for users to their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 7. Enable RLS on other tables
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 8. User progress policies
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;

CREATE POLICY "Enable read access for users to their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for users to their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for users to their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 9. Quiz results policies
DROP POLICY IF EXISTS "Users can view own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Users can insert own quiz results" ON public.quiz_results;

CREATE POLICY "Enable read access for users to their own quiz results" ON public.quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for users to their own quiz results" ON public.quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 10. Settings policies (admin only for now, but allow read for all)
DROP POLICY IF EXISTS "Only admins can manage settings" ON public.settings;

CREATE POLICY "Enable read access for all users to settings" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Enable write access for admins only" ON public.settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.email = 'admin@skillsprint.io'
    )
  );

-- 11. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.user_progress TO anon, authenticated;
GRANT ALL ON public.quiz_results TO anon, authenticated;
GRANT SELECT ON public.settings TO anon, authenticated;
GRANT ALL ON public.settings TO authenticated;

-- 12. Create an admin user (optional, run this if you want an admin account)
-- You can uncomment and modify this section:
/*
-- First create the admin user through Supabase Auth (sign up normally)
-- Then run this to make them admin:
UPDATE public.profiles 
SET email = 'admin@skillsprint.io' 
WHERE email = 'your-actual-admin-email@domain.com';
*/
