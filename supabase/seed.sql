-- Disable RLS for 'anon' role
-- https://github.com/orgs/supabase/discussions/4547
ALTER DEFAULT PRIVILEGES 
IN SCHEMA public 
REVOKE ALL ON TABLES 
FROM anon;

ALTER DEFAULT PRIVILEGES 
IN SCHEMA public 
REVOKE ALL ON FUNCTIONS 
FROM anon;

ALTER DEFAULT PRIVILEGES 
IN SCHEMA public 
REVOKE ALL ON SEQUENCES 
FROM anon;

REVOKE SELECT 
ON ALL TABLES 
IN SCHEMA public 
FROM anon;

REVOKE USAGE 
ON ALL SEQUENCES 
IN SCHEMA public 
FROM anon;

REVOKE EXECUTE 
ON ALL FUNCTIONS 
IN SCHEMA public 
FROM anon;

-- Create function that retrieves the JWT claims from the JWT token (used in Storage RLS)
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT 
LANGUAGE SQL STABLE
AS $$
SELECT nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$;

-- Seed 'vault' bucket with RLS policies
INSERT INTO storage.buckets(id, name, public) VALUES ('vault', 'vault', TRUE);

CREATE POLICY "Give users access to own folder - SELECT"
ON storage.objects 
FOR SELECT 
USING (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Give users access to own folder - INSERT"
ON storage.objects 
FOR INSERT 
WITH CHECK (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Give users access to own folder - UPDATE"
ON storage.objects 
FOR UPDATE 
USING (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Give users access to own folder - DELETE"
ON storage.objects 
FOR DELETE 
USING (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);
