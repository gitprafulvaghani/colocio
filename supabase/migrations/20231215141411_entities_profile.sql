CREATE TABLE public.entities_profile (
  UUID UUID NOT NULL,
  euid UUID NOT NULL,
  permission_level text NULL,
  CONSTRAINT entities_profile_pkey PRIMARY KEY (UUID, euid),
  CONSTRAINT entities_profile_euid_fkey FOREIGN key (euid) REFERENCES entities (euid) ON DELETE cascade,
  CONSTRAINT entities_profile_uuid_fkey FOREIGN key (UUID) REFERENCES user_profile (UUID) ON DELETE cascade
) tablespace pg_default;

ALTER TABLE "entities_profile" ENABLE ROW LEVEL SECURITY;

-- It is important to note how these policies affect the operations that can be performed on the table.
CREATE POLICY "Enable read access for all users" ON "entities_profile" AS PERMISSIVE FOR
SELECT
  TO public USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "entities_profile" AS PERMISSIVE FOR INSERT TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Enable all actions for users based on user_id" ON "entities_profile" FOR ALL USING (auth.uid () = UUID)
WITH
  CHECK (auth.uid () = UUID);

