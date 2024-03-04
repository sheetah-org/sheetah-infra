import { getClaims } from "../_shared/claims.ts";
import { getAdminSupabaseClient } from "../_shared/supabase-client.ts";
import { verifyJwt } from "../_shared/claims.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

// TODO: In order to make this work as a static asset, we need to either directly pass a cookie and stop Supabase from verifying the Authorization header
// or put another function (e.g. Cloudflare worker) in front of this. The cloudflare worker will then extract the cookie and pass it as an authorization header to this function
Deno.serve(async (req) => {
  // We verify Clerk's JWT since it's difficult to pass Supabase's JWT through the front-end when serving static files
  const isJwtValid = await verifyJwt(req);
  if (!isJwtValid) {
    return new Response(null, { status: 403 });
  }

  // This is needed when invoking function frm the browser
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const claims = getClaims(req)!;

  // TODO: Extract filename from query params ?file=name.jpg
  const url = new URL(req.url);
  const fileName = url.searchParams.get("name");

  if (!fileName) {
    // TODO: Throw
  }

  const adminSupabaseClient = getAdminSupabaseClient();

  // TODO: Get user
  // TODO: Check if user has permissions

  // TODO: Pass options
  // We used signed URL because this returns the appropriate headers, unlike the download method.
  // The signed URL has a very short life-span (30s) so it expires after we return the result.
  const { data: signedUrlData, error: signedUrlError } =
    await adminSupabaseClient.storage.from("vault")
      .createSignedUrl(`${claims.sub}/${fileName}`, 30);

  if (signedUrlError) {
    throw signedUrlError;
  }

  return fetch(signedUrlData.signedUrl);

  // TODO: Use adminSupabaseClient to get file after restrictions have been applied
  // const { data, error } = await adminSupabaseClient.storage.from("vault")
  //   .download(`${claims.sub}/${fileName}`);

  // if (error) throw error;

  // return new Response(data.stream(), { headers: corsHeaders });
});
