// Test Supabase Connection
// Add this to your browser console to test directly

const testSupabaseAuth = async () => {
  const supabaseUrl = 'http://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io';
  const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI';
  
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      })
    });
    
    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (!response.ok) {
      console.error('Error details:', result);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Call the test function
testSupabaseAuth();
