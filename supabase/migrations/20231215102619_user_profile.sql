CREATE TABLE public.user_profile (
  UUID UUID NOT NULL,
  profile_name text NULL,
  active_entity UUID NULL,
  onboarding_status public.onboarding_status NOT NULL DEFAULT 'not_started'::onboarding_status,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT user_profile_pkey PRIMARY KEY (UUID),
  CONSTRAINT user_profile_uuid_fkey FOREIGN key (UUID) REFERENCES auth.users (id) ON DELETE cascade
  -- constraint user_profile_active_entity_fkey foreign key (active_entity) references entities (id_entity)
) tablespace pg_default;

ALTER TABLE "user_profile" ENABLE ROW LEVEL SECURITY;

-- It is important to note how these policies affect the operations that can be performed on the table.
CREATE POLICY "Enable read access for all users" ON "user_profile" AS PERMISSIVE FOR
SELECT
  TO public USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "user_profile" AS PERMISSIVE FOR INSERT TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Enable all actions for users based on user_id" ON "user_profile" FOR ALL USING (auth.uid () = UUID)
WITH
  CHECK (auth.uid () = UUID);
