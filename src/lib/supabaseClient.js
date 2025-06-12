import { createClient } from '@supabase/supabase-js'

// Primary URL - use HTTP to avoid SSL certificate issues
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io'

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI'

// Debug logging
console.log('🔍 Supabase Config:')
console.log('URL:', supabaseUrl)
console.log('Environment:', import.meta.env.NODE_ENV)
console.log('Mode:', import.meta.env.MODE)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'skillsprint-web'
    }
  }
})

// Test connection on load
setTimeout(async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('❌ Supabase connection error:', error.message)
    } else {
      console.log('✅ Supabase connected successfully')
    }
  } catch (err) {
    console.error('❌ Supabase connection failed:', err.message)
  }
}, 1000)