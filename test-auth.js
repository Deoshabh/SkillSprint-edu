// Test authentication flow
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io'
const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAuth() {
  console.log('🔍 Testing authentication...')
  
  // Check current session
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('❌ Session error:', error.message)
    } else if (session) {
      console.log('✅ Already logged in as:', session.user.email)
      
      // Test profile fetch
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (profileError) {
        console.error('❌ Profile fetch error:', profileError.message)
        console.log('🔧 Creating profile...')
        
        // Try to create profile
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            onboarding_completed: false
          })
        
        if (createError) {
          console.error('❌ Profile creation error:', createError.message)
        } else {
          console.log('✅ Profile created successfully')
        }
      } else {
        console.log('✅ Profile exists:', profile)
      }
    } else {
      console.log('ℹ️ No active session')
    }
  } catch (err) {
    console.error('❌ Session check failed:', err.message)
  }

  // Test signup
  console.log('\n🧪 Testing signup with test account...')
  const testEmail = `test-${Date.now()}@skillsprint.io`
  const testPassword = 'TestPassword123!'
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test User'
        }
      }
    })
    
    if (error) {
      console.error('❌ Signup error:', error.message)
    } else {
      console.log('✅ Signup successful for:', testEmail)
      console.log('User ID:', data.user?.id)
      console.log('Email confirmed:', !!data.user?.email_confirmed_at)
      
      // Try to create profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            name: 'Test User',
            onboarding_completed: false
          })
        
        if (profileError) {
          console.error('❌ Profile creation error:', profileError.message)
        } else {
          console.log('✅ Profile created for test user')
        }
      }
    }
  } catch (err) {
    console.error('❌ Signup test failed:', err.message)
  }
}

testAuth()
