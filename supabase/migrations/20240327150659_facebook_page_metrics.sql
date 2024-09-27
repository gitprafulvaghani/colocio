CREATE TABLE public.facebook_page_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid (),
  page_id UUID NOT NULL,
  page_views integer DEFAULT 0,
  page_likes integer DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
) tablespace pg_default;

