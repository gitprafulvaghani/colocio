CREATE TABLE public.audiences (
  id UUID NOT NULL DEFAULT gen_random_uuid (),
  euid UUID NULL,
  name text NULL,
  gender text NULL,
  age jsonb NULL,
  location jsonb NULL,
  method jsonb NULL,
  pain_points jsonb NULL,
  interests jsonb NULL,
  text text NULL,
  lifetime_value int NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT entities_audience_pkey PRIMARY KEY (id),
  CONSTRAINT entities_audience_euid_fkey FOREIGN key (euid) REFERENCES entities (euid)
) tablespace pg_default;

-- TODO: How big can this table get? More than a 1000 rows? RLS can
-- drastically impact performance because it runs a where query on every
-- row. If so we should consider writing a function.
-- ALTER TABLE "audiences" ENABLE ROW LEVEL SECURITY;
-- TODO: Will need to change this to a better, more accurate policy.
CREATE POLICY "Enable all actions for authenticated users only" ON "audiences" AS PERMISSIVE FOR ALL TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Full Access" ON "public"."audiences" AS PERMISSIVE FOR ALL TO public;

