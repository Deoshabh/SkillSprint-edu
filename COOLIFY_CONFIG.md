# Coolify deployment configuration for SkillSprint

## Environment Variables to set in Coolify:

# Option 1: If Supabase has a public domain (Recommended)
# VITE_SUPABASE_URL=https://your-supabase-domain.com
# 
# Option 2: If using localhost (for testing)
# VITE_SUPABASE_URL=http://localhost:8000
#
# Option 3: Use Coolify generated domain for Supabase
VITE_SUPABASE_URL=https://supabasekong-pss4owso0cgw0g4so04go0s0.147.79.66.75.sslip.io
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0OTc1OTQ4MCwiZXhwIjo0OTA1NDMzMDgwLCJyb2xlIjoiYW5vbiJ9.3si-ne2VP_5IAjl5tN3tJKwDVcV7t9Nv5eilN3811XI
NODE_ENV=production

## IMPORTANT: 
## Your Supabase container MUST be publicly accessible for the browser to connect.
## Either:
## 1. Set up a public domain for your Supabase service in Coolify
## 2. Use the IP address with proper port forwarding
## 3. Configure reverse proxy

## Deployment Settings:
- Build Pack: Docker
- Port: 8080 (Safe port choice for multiple projects)
- Build Command: Uses Dockerfile
- Health Check: HTTP GET / (port 8080)

## Network Requirements:
- Ensure both SkillSprint and Supabase containers are on the same network
- Allow internal communication between containers
