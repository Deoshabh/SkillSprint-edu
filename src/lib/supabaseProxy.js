// Supabase Proxy for internal network communication
// This allows the frontend to communicate with Supabase through the backend

const INTERNAL_SUPABASE_URL = 'http://supabase-kong:8000';
const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI';

// Proxy authentication requests
export const proxyAuth = {
  async signUp(email, password, options = {}) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, options }),
    });
    return response.json();
  },

  async signIn(email, password) {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async signInWithOAuth(provider, options = {}) {
    const response = await fetch('/api/auth/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider, options }),
    });
    return response.json();
  }
};
