import { TransformOptions } from "https://esm.sh/v135/@supabase/storage-js@2.5.5/dist/module/index.js";

import { getClaims } from "../_shared/claims.ts";
import { getAdminSupabaseClient } from "../_shared/supabase-client.ts";
import { verifyJwt } from "../_shared/claims.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

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

  const url = new URL(req.url);
  const filePath = url.searchParams.get("path");

  if (!filePath) {
    return new Response("File path is missing", { status: 400 });
  }

  const claims = getClaims(req)!;
  const [fileFolder] = filePath.split("/");

  if (claims.sub !== fileFolder && claims.o?.id !== fileFolder) {
    return new Response(null, { status: 403 });
  }

  const adminSupabaseClient = getAdminSupabaseClient();

  // TODO: Retrieve the file from our DB (filter by virtual_name) to check if user has permissions (required for more granular access)

  // TODO: Transforms might not work properly locally: https://github.com/supabase/supabase/issues/21645
  // We used signed URL because this returns the appropriate headers, unlike the download method.
  // The signed URL has a very short life-span (30s) so it expires after we return the result.
  // TODO: Pass bucket as a query param?
  const { data: signedUrlData, error: signedUrlError } =
    await adminSupabaseClient.storage.from("storage")
      .createSignedUrl(filePath, 120, {
        transform: {
          format: "origin",
          quality: url.searchParams.get("q")
            ? parseInt(url.searchParams.get("q")!)
            : undefined,
          width: url.searchParams.get("w")
            ? parseInt(url.searchParams.get("w")!)
            : undefined,
          height: url.searchParams.get("h")
            ? parseInt(url.searchParams.get("h")!)
            : undefined,
          resize: url.searchParams.get("resize")
            ? url.searchParams.get("resize") as TransformOptions["resize"]
            : undefined,
        },
      });

  if (signedUrlError) {
    throw signedUrlError;
  }

  return fetch(signedUrlData.signedUrl);
});
