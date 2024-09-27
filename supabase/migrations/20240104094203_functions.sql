CREATE
OR REPLACE FUNCTION filter_user_assets_gpt () RETURNS TABLE (UUID UUID, asset_id TEXT, type TEXT, data JSONB) AS $$
BEGIN
  RETURN QUERY 
  SELECT
    ua.uuid,
    ua.asset_id,
    ua.type,
    -- This strips out the values we don't want to send to ChatGPT.
    jsonb_strip_nulls(ua.data - 'code' - 'access_token' - 'profile_picture_url' - 'profile_picture_uri' - 'follows_count' - 'followers_count') as data
  FROM user_assets ua;
END; $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION filter_user_assets_gpt_test()
-- RETURNS SETOF user_assets AS $$
--  SELECT
--  ua.uuid,
--     ua.asset_id,
--     ua.type,
--     -- This strips out the values we don't want to send to ChatGPT.
--     jsonb_strip_nulls(ua.data - 'code' - 'access_token' - 'profile_picture_url' - 'profile_picture_uri' - 'follows_count' - 'followers_count') as data
--   FROM user_assets ua;
--   $$ LANGUAGE;
-- create function list_stored_countries() returns setof countries as $$
--   select * from countries;
-- $$ language ;

