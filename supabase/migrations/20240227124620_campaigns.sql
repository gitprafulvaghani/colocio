CREATE TABLE public.campaigns (
  cuid UUID NOT NULL DEFAULT gen_random_uuid (),
  euid UUID NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT campaigns_pkey PRIMARY KEY (cuid),
  CONSTRAINT campaigns_euid_fkey FOREIGN key (euid) REFERENCES entities (euid) ON DELETE cascade
) tablespace pg_default;

