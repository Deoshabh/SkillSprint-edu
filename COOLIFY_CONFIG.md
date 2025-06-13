# Coolify deployment configuration for SkillSprint

## Environment Variables to set in Coolify:

# Supabase Configuration
VITE_SUPABASE_URL=http://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI

# Together AI Configuration (for Llama 4 AI Chat)
VITE_TOGETHER_API_KEY=your_together_ai_api_key_here

# Application Environment
NODE_ENV=production

## IMPORTANT SETUP NOTES:
## 1. Sign up at https://api.together.xyz/ to get your Together AI API key
## 2. Replace 'your_together_ai_api_key_here' with your actual API key
## 3. The AI chat will use fallback responses if API key is not configured
## 4. Supabase database tables must be created (run database-schema.sql)

## Deployment Settings:
- Build Pack: Docker
- Port: 8080 (Safe port choice for multiple projects)
- Build Command: Uses Dockerfile
- Health Check: HTTP GET / (port 8080)

## Network Requirements:
- Ensure both SkillSprint and Supabase containers are on the same network
- Allow internal communication between containers
