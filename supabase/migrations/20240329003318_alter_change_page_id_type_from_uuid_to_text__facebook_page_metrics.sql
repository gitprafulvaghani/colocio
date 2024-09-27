ALTER TABLE facebook_page_metrics
ALTER COLUMN page_id type text USING page_id::text;

