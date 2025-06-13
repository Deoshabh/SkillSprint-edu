// Debug script to check if database tables exist
import { createClient } from '@supabase/supabase-js'

// Use your Supabase URL and key
const supabaseUrl = 'http://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io'
const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkDatabase() {
  console.log('🔍 Checking database tables...')
  
  // Test connection
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('❌ Connection error:', error.message)
      return
    }
    console.log('✅ Connected to Supabase')
  } catch (err) {
    console.error('❌ Connection failed:', err.message)
    return
  }

  // Check if profiles table exists
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Profiles table error:', error.message)
      console.log('🚨 PROFILES TABLE MISSING! Run the database-schema.sql in Supabase')
    } else {
      console.log('✅ Profiles table exists')
    }
  } catch (err) {
    console.error('❌ Profiles table check failed:', err.message)
  }

  // Check if user_progress table exists
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ User_progress table error:', error.message)
    } else {
      console.log('✅ User_progress table exists')
    }
  } catch (err) {
    console.error('❌ User_progress table check failed:', err.message)
  }

  // Check if quiz_results table exists
  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Quiz_results table error:', error.message)
    } else {
      console.log('✅ Quiz_results table exists')
    }
  } catch (err) {
    console.error('❌ Quiz_results table check failed:', err.message)
  }

  console.log('\n📝 If tables are missing, run this in your Supabase SQL Editor:')
  console.log('👉 Copy the content from database-schema.sql and run it')
}

checkDatabase()
