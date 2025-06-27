## Prerequisites

- Install Supabase CLI (The local infra was tested using v2.26.9)

## Setup

1. Create an `.env` (for local development) from the `.env.example` template file and fill in the custom env vars
2. Run `docker compose up -d`. The compose file is for containers outside of Supabase's infrastructure. 
3. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)