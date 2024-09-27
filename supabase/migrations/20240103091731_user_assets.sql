CREATE TABLE public.user_assets (
  UUID UUID NOT NULL,
  asset_id text NOT NULL,
  auid UUID NOT NULL DEFAULT gen_random_uuid (),
  type text NOT NULL,
  data jsonb NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT user_assets_pkey PRIMARY KEY (UUID, asset_id),
  CONSTRAINT auid_unique UNIQUE (auid),
  CONSTRAINT user_assets_uuid_fkey FOREIGN key (UUID) REFERENCES auth.users (id) ON DELETE cascade
) tablespace pg_default;

ALTER TABLE "user_assets" ENABLE ROW LEVEL SECURITY;

-- It is important to note how these policies affect the operations that can be performed on the table.
CREATE POLICY "Enable read access for all users" ON "user_assets" AS PERMISSIVE FOR
SELECT
  TO public USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "user_assets" AS PERMISSIVE FOR INSERT TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Enable all actions for users based on user_id" ON "user_assets" FOR ALL USING (auth.uid () = UUID)
WITH
  CHECK (auth.uid () = UUID);

