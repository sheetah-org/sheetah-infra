create or replace function requesting_user_id()
returns text 
language sql stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$;

-- TODO: create "vault" in storage and apply policies
