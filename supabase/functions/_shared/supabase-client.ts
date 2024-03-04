import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

// TODO: Probably have to generate different ANON_KEY and SERVICE_KEY as we use a custom JWT secret

export const getSupabaseClient = (req: Request) =>
  createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    },
  );

export const getAdminSupabaseClient = () =>
  createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );
