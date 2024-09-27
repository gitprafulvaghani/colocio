INSERT INTO
  storage.buckets (id, name)
VALUES
  ('offerings', 'offerings')
ON CONFLICT DO nothing;

DROP POLICY IF EXISTS "Full Access w63qy5_0" ON storage.objects;

CREATE POLICY "Full Access w63qy5_0" ON storage.objects FOR
SELECT
  TO anon USING (bucket_id = 'offerings');

DROP POLICY IF EXISTS "Full Access w63qy5_1" ON storage.objects;

CREATE POLICY "Full Access w63qy5_1" ON storage.objects FOR INSERT TO anon
WITH
  CHECK (bucket_id = 'offerings');

DROP POLICY IF EXISTS "Full Access w63qy5_2" ON storage.objects;

CREATE POLICY "Full Access w63qy5_2" ON storage.objects FOR DELETE TO anon USING (bucket_id = 'offerings');

DROP POLICY IF EXISTS "Full Access w63qy5_3" ON storage.objects;

CREATE POLICY "Full Access w63qy5_3" ON storage.objects
FOR UPDATE
  TO anon USING (bucket_id = 'offerings');
