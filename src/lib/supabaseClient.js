import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://skwiwaxzjgopxtqzghmc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrd2l3YXh6amdvcHh0cXpnaG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjMzMTUsImV4cCI6MjA2NTMzOTMxNX0.JGL9KNwI_xIrgHpRG9WukddYwOuMi2LtgshkqsGRhZE'

// Debug logging (remove in production)
console.log('Supabase URL:', supabaseUrl)
console.log('Environment:', import.meta.env.NODE_ENV)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})