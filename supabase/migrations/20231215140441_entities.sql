CREATE TABLE public.entities (
  euid UUID NOT NULL DEFAULT gen_random_uuid (),
  name text NOT NULL,
  elevator_pitch text NULL,
  tz text NULL,
  detailed_offering text NULL,
  categories jsonb NULL DEFAULT '{"categories": []}'::jsonb,
  service_areas jsonb NULL DEFAULT '{"service_areas": []}'::jsonb,
  phone text NULL,
  email text NULL,
  addresses jsonb NULL DEFAULT '{"addresses": []}'::jsonb,
  website text NULL,
  social_medias jsonb NULL DEFAULT '{"social_medias": []}'::jsonb,
  competitors jsonb NULL DEFAULT '{"competitors": []}'::jsonb,
  currency integer NULL,
  CONSTRAINT entity_pkey PRIMARY KEY (euid)
) tablespace pg_default;

ALTER TABLE "entities" ENABLE ROW LEVEL SECURITY;

-- It is important to note how these policies affect the operations that can be
-- performed on the table.
CREATE POLICY "Enable read access for all users" ON "entities" AS PERMISSIVE FOR
SELECT
  TO public USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "entities" AS PERMISSIVE FOR INSERT TO authenticated
WITH
  CHECK (TRUE);
