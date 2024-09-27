CREATE TABLE public.ads (
  id UUID NOT NULL DEFAULT gen_random_uuid (),
  euid UUID NULL,
  cuid UUID NULL,
  platform public.social_platforms NULL,
  ad_id text NULL,
  data jsonb NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT ads_pkey PRIMARY KEY (id),
  CONSTRAINT ads_euid_fkey FOREIGN key (euid) REFERENCES entities (euid) ON DELETE cascade,
  CONSTRAINT ads_cuid_fkey FOREIGN key (cuid) REFERENCES campaigns (cuid) ON DELETE cascade
) tablespace pg_default;

