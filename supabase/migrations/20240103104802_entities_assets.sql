CREATE TABLE public.entities_assets (
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  auid UUID NOT NULL,
  euid UUID NOT NULL,
  CONSTRAINT entities_assets_pkey PRIMARY KEY (auid, euid),
  CONSTRAINT entities_assets_auid_fkey FOREIGN key (auid) REFERENCES user_assets (auid) ON DELETE cascade,
  CONSTRAINT entities_assets_euid_fkey FOREIGN key (euid) REFERENCES entities (euid)
) tablespace pg_default;

ALTER TABLE "public"."entities_assets" enable ROW level security;

CREATE POLICY "Enable all operations for asset owner" ON "public"."entities_assets" AS permissive FOR ALL TO authenticated USING (
  (
    EXISTS (
      SELECT
        1
      FROM
        user_assets
      WHERE
        (
          (user_assets.auid = entities_assets.auid)
          AND (user_assets.uuid = auth.uid ())
        )
    )
  )
)
WITH
  CHECK (TRUE);

