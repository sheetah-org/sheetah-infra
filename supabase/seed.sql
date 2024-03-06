CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT 
LANGUAGE SQL stable
AS $$
  SELECT nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$;

INSERT INTO storage.buckets(id, name, public) VALUES ('vault', 'vault', TRUE);

CREATE POLICY "Give users access to own folder - SELECT"
ON storage.objects FOR SELECT USING (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Give users access to own folder - INSERT"
ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Give users access to own folder - UPDATE"
ON storage.objects FOR UPDATE USING (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Give users access to own folder - DELETE"
ON storage.objects FOR DELETE USING (
    bucket_id = 'vault'
    AND requesting_user_id()::text = (storage.foldername(name))[1]
);
