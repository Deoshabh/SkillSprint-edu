// Quick test to verify authentication is working
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function quickAuthTest() {
  console.log('🧪 Quick Authentication Test')
  console.log('Using Supabase URL:', supabaseUrl)
  
  const testEmail = `quicktest-${Date.now()}@test.com`
  const testPassword = 'TestPassword123!'
  
  try {
    // Test signup
    console.log('\n1. Testing signup...')
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Quick Test User'
        }
      }
    })
    
    if (signupError) {
      console.error('❌ Signup failed:', signupError.message)
      return
    }
    
    console.log('✅ Signup successful!')
    console.log('User ID:', signupData.user?.id)
    
    // Wait a moment for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Test profile fetch
    console.log('\n2. Testing profile fetch...')
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', signupData.user.id)
      .single()
    
    if (profileError) {
      console.error('❌ Profile fetch failed:', profileError.message)
      
      // Try to create profile manually
      console.log('🔧 Attempting manual profile creation...')
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: signupData.user.id,
          email: signupData.user.email,
          name: 'Quick Test User',
          onboarding_completed: false
        })
      
      if (createError) {
        console.error('❌ Manual profile creation failed:', createError.message)
      } else {
        console.log('✅ Manual profile creation successful!')
      }
    } else {
      console.log('✅ Profile exists:', profile)
    }
    
    // Test login
    console.log('\n3. Testing login...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    })
    
    if (loginError) {
      console.error('❌ Login failed:', loginError.message)
    } else {
      console.log('✅ Login successful!')
      
      // Test session
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session user:', session?.user?.email)
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

quickAuthTest()
