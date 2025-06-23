import {
  createRemoteJWKSet,
  decodeJwt,
  JWTPayload,
  jwtVerify,
} from "https://deno.land/x/jose@v5.2.2/index.ts";

// TODO: Import from config
const JWKS = createRemoteJWKSet(
  new URL(Deno.env.get("CLERK_JWKS_URL")),
);

export type Claims = JWTPayload & { org_id: string; org_role: string };

export const getJwt = (req: Request) => {
  const bearerToken = req.headers.get("Authorization")!;
  if (!bearerToken) return null;

  return bearerToken.split(" ")[1];
};

export const getClaims = (req: Request) => {
  const jwt = getJwt(req);
  if (!jwt) return null;

  const claims = decodeJwt(jwt);
  return claims as Claims;
};

export const verifyJwt = async (req: Request) => {
  const jwt = getJwt(req);

  try {
    await jwtVerify(jwt ?? "", JWKS);
    return true;
  } catch {
    return false;
  }
};
