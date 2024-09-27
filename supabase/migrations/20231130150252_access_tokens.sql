CREATE TABLE public.access_tokens (
  UUID UUID NOT NULL,
  provider text NOT NULL,
  type text NOT NULL,
  access_token text NOT NULL,
  expires_at text NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  CONSTRAINT access_tokens_pkey PRIMARY KEY (UUID),
  CONSTRAINT access_tokens_id_provider_key UNIQUE (UUID, provider),
  CONSTRAINT access_tokens_uuid_fkey FOREIGN key (UUID) REFERENCES auth.users (id) ON DELETE cascade
) tablespace pg_default;

ALTER TABLE "access_tokens" ENABLE ROW LEVEL SECURITY;

-- NOTE: It is important to understand how these policies affect
-- the operations that can be performed on the table.
CREATE POLICY "Enable read access for all users" ON "access_tokens" AS PERMISSIVE FOR
SELECT
  TO public USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "access_tokens" AS PERMISSIVE FOR INSERT TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Enable all actions for users based on user_id" ON "access_tokens" FOR ALL USING (auth.uid () = UUID)
WITH
  CHECK (auth.uid () = UUID);
