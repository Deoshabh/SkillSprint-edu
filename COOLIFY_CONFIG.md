# Coolify deployment configuration for SkillSprint

## Environment Variables to set in Coolify:

# IMPORTANT: Use HTTPS for browser access (not HTTP)
VITE_SUPABASE_URL=https://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI
NODE_ENV=production

## Deployment Settings:
- Build Pack: Docker
- Port: 8080 (Safe port choice for multiple projects)
- Build Command: Uses Dockerfile
- Health Check: HTTP GET / (port 8080)

## Network Requirements:
- Ensure both SkillSprint and Supabase containers are on the same network
- Allow internal communication between containers
