# Coolify deployment configuration for SkillSprint

## Environment Variables to set in Coolify:

# Use HTTP since HTTPS certificate is invalid for sslip.io domain
VITE_SUPABASE_URL=http://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI
NODE_ENV=production

## IMPORTANT: 
## - Using HTTP instead of HTTPS due to invalid SSL certificate
## - Make sure both apps (SkillSprint and Supabase) use the same protocol
## - CORS is configured in Supabase to allow your app domain
## - The anon key above matches your Supabase SERVICE_SUPABASEANON_KEY

## Deployment Settings:
- Build Pack: Docker
- Port: 8080 (Safe port choice for multiple projects)
- Build Command: Uses Dockerfile
- Health Check: HTTP GET / (port 8080)

## Network Requirements:
- Ensure both SkillSprint and Supabase containers are on the same network
- Allow internal communication between containers
