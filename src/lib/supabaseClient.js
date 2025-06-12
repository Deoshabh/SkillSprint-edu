import { createClient } from '@supabase/supabase-js'

// Try different URLs based on environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
  // Fallback options - try these in order
  'http://147.79.66.75:8000' || // Direct IP with port
  'https://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io' || // sslip.io domain
  'https://skwiwaxzjgopxtqzghmc.supabase.co' // Original fallback

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrd2l3YXh6amdvcHh0cXpnaG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjMzMTUsImV4cCI6MjA2NTMzOTMxNX0.JGL9KNwI_xIrgHpRG9WukddYwOuMi2LtgshkqsGRhZE'

// Debug logging
console.log('🔍 Supabase Config:')
console.log('URL:', supabaseUrl)
console.log('Environment:', import.meta.env.NODE_ENV)
console.log('All env vars:', import.meta.env)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection error:', error)
  } else {
    console.log('✅ Supabase connected successfully')
  }
})