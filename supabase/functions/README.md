## Setup

1. Create an `.env` (for local development) from the `.env.example` template file and fill in the custom env vars
  - Function automatically load env vars from the '.env' file located inside the `functions` folder

## To invoke a function locally

1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
2. Make an HTTP request:

curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/function-name' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
