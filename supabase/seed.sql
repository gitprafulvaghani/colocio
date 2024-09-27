DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@colocio.ai') THEN
        INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
        VALUES ('00000000-0000-0000-0000-000000000000', 'e74bc3f0-abab-4865-873f-3dd65dab2908', 'authenticated', 'authenticated', 'demo@colocio.ai', crypt('12341234', gen_salt('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', '');

        INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
        VALUES (uuid_generate_v4(), 'e74bc3f0-abab-4865-873f-3dd65dab2908', '{"sub":"e74bc3f0-abab-4865-873f-3dd65dab2908","email":"demo@colocio.ai"}', 'email', current_timestamp, current_timestamp, current_timestamp);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo1@colocio.ai') THEN
        INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
        VALUES ('00000000-0000-0000-0000-000000000000', '77816a0a-5c9b-47d5-82d9-1607d9c8b8af', 'authenticated', 'authenticated', 'demo1@colocio.ai', crypt('12341234', gen_salt('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', '');

        INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
        VALUES (uuid_generate_v4(), '77816a0a-5c9b-47d5-82d9-1607d9c8b8af', '{"sub":"77816a0a-5c9b-47d5-82d9-1607d9c8b8af","email":"demo1@colocio.ai"}', 'email', current_timestamp, current_timestamp, current_timestamp);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo2@colocio.ai') THEN
        INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
        VALUES ('00000000-0000-0000-0000-000000000000', 'c0cfb47c-10ec-49ee-942c-cb03cb93c5aa', 'authenticated', 'authenticated', 'demo2@colocio.ai', crypt('12341234', gen_salt('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', '');

        INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
        VALUES (uuid_generate_v4(), 'c0cfb47c-10ec-49ee-942c-cb03cb93c5aa', '{"sub":"c0cfb47c-10ec-49ee-942c-cb03cb93c5aa","email":"demo2@colocio.ai"}', 'email', current_timestamp, current_timestamp, current_timestamp);
    END IF;
END $$;

INSERT INTO
  entities (euid, name, elevator_pitch)
VALUES
  (
    'a7bd0ff8-da95-4128-8565-d4f59a598c88',
    'Awesome Company',
    'An company that is awesome'
  ),
  (
    '2ec5cce0-52b6-4e87-b5be-de7f027e2530',
    'More Awesome Entity',
    'An entity that is even more awesome'
  ),
  (
    '2b8a1cb3-188f-45a4-94bf-b29985bf9245',
    'Random Entity',
    'An entity that is random'
  );

INSERT INTO
  access_tokens (UUID, provider, type, access_token)
VALUES
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    'facebook',
    'user',
    'EAATyloueTgYBO47AEMOskgkWcEKWuWYWEpx7ccZASzlr0G9xZB6P4F9O8kHKg0vvjgKF9l86SrLcJFTkzmTOiMiQxBapyFKTM9fqDJAxZB31rz1iPcCSKwjASSWGYYRcNZBwjJZBFs8SzqzuR8d43vZBZAdKH09HlzZAbpFclZAK7yNcyRe9b7PzZAlTU2rIrOROugMZCO5uQVc'
  ),
  (
    '77816a0a-5c9b-47d5-82d9-1607d9c8b8af',
    'facebook',
    'user',
    'EAATyloueTgYBO7i1tt8OVAfw5MhGVkz2AXJoVMRgSg5uCl2ekcOwCUo3XTZCZCrp6tEBGMjEAJeN3TPyvREngrZALbjPJC4INdZBIKm8yyxB1mMZB1OGJkM3xPTiZAM0p6HSSXi23A8ZC4fwzsZCxyDTBFdq9bLBwolmOuJmBnluBZB2Bzp66sBLxvQZDZD`'
  ),
  (
    'c0cfb47c-10ec-49ee-942c-cb03cb93c5aa',
    'facebook',
    'user',
    'EAATyloueTgYBOwthnh1Bp6JC7BNEwQPnZAy06hZBDKORyQEi1PhiKZBdpsSsmZAA756WKd8rZCl7Ki4wRlJsdZBDZB2BJYLyMv1NgHVCRehBa2mCtcmCBwEtjwmaWUr7BXcycRKQ2F2wAYWx1dSoJ2IaxTgz9ZBaKJE6hR9qMdJSahmgSqjGvZBSeU7BpHxA9JmdgDrtbwSzmCx2Ji9Wg'
  );

INSERT INTO
  user_profile (UUID, active_entity)
VALUES
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    'a7bd0ff8-da95-4128-8565-d4f59a598c88'
  );

INSERT INTO
  entities_profile (UUID, euid, permission_level)
VALUES
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    'a7bd0ff8-da95-4128-8565-d4f59a598c88',
    'owner'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '2ec5cce0-52b6-4e87-b5be-de7f027e2530',
    'owner'
  );

-- ADVANCED SEED
INSERT INTO
  public.entities (
    name,
    elevator_pitch,
    tz,
    detailed_offering,
    phone,
    email,
    website,
    currency,
    euid,
    categories,
    service_areas,
    addresses,
    social_medias,
    competitors
  )
VALUES
  (
    'Cool Company',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    45,
    '8b3eaa28-6b4f-4166-a1b8-ff315cc3dc74',
    '{"categories":[]}',
    '{"service_areas":[]}',
    '{"addresses":[]}',
    '{"social_medias":[]}',
    '{"competitors":[]}'
  );

INSERT INTO
  "public"."audiences" (
    "id",
    "euid",
    "name",
    "gender",
    "age",
    "location",
    "method",
    "pain_points",
    "interests",
    "text",
    "lifetime_value",
    "created_at"
  )
VALUES
  (
    '1b36b58b-997b-40e4-b966-24da6989c4dc',
    '8b3eaa28-6b4f-4166-a1b8-ff315cc3dc74',
    'ABC',
    'All',
    '{"max": 33, "min": 13}',
    '{"locations": []}',
    '{"methods": []}',
    '{"painPoints": []}',
    '{"interests": []}',
    NULL,
    NULL,
    '2024-03-25 17:47:31.63615+00'
  );

INSERT INTO
  "public"."entities_profile" ("uuid", "euid", "permission_level")
VALUES
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '8b3eaa28-6b4f-4166-a1b8-ff315cc3dc74',
    'owner'
  );

INSERT INTO
  "public"."user_assets" (
    "uuid",
    "asset_id",
    "auid",
    "type",
    "data",
    "created_at",
    "updated_at"
  )
VALUES
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    'act_1338359276753508',
    '01517857-00e4-4508-9f73-3a92988da99b',
    'facebook_ad_account',
    '{"name": "Pareto''s Ad Account", "owner": "607930781508916", "business": {"id": "607930781508916", "name": "Pareto Marketing Automation"}, "currency": "ZAR", "user_tasks": ["DRAFT", "ANALYZE", "ADVERTISE", "MANAGE"], "timezone_id": 141, "created_time": "2023-08-28T20:36:13+0200", "account_status": 1, "end_advertiser": "607930781508916", "is_prepay_account": false, "end_advertiser_name": "Pareto Marketing Automation", "funding_source_details": {"id": "6539828716134153", "type": 1, "coupon": {"amount": 9, "currency": "ZAR", "expiration": "2024-09-20T11:09:24+0000", "display_amount": "ZAR0.09"}, "coupons": [{"amount": 9, "currency": "ZAR", "expiration": "2024-09-20T11:09:24+0000", "display_amount": "ZAR0.09"}], "display_string": "VISA *3458"}}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    'act_731678382053685',
    '81d1bdec-e334-498b-968c-f8676415f580',
    'facebook_ad_account',
    '{"name": "184170614687925", "owner": "607930781508916", "business": {"id": "607930781508916", "name": "Pareto Marketing Automation"}, "currency": "ZAR", "user_tasks": ["DRAFT", "ANALYZE", "ADVERTISE", "MANAGE"], "timezone_id": 141, "created_time": "2023-08-26T03:21:54+0200", "account_status": 1, "is_prepay_account": false, "funding_source_details": {"id": "6467849476665574", "type": 1, "display_string": "VISA *3631"}}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    'act_184170614687925',
    '7db4abb9-b1c6-4968-b29d-3fc01ab9a8fe',
    'facebook_ad_account',
    '{"name": "Travis Meadows", "owner": "122104218626029948", "currency": "ZAR", "user_tasks": ["DRAFT", "ANALYZE", "ADVERTISE", "MANAGE"], "timezone_id": 141, "created_time": "2024-02-26T14:22:11+0200", "account_status": 1, "is_prepay_account": false}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '182978528231776',
    '3d196c35-efd9-4804-b562-d57fbfb1569e',
    'facebook_page',
    '{"name": "Ninja Puppy - Marketing as a Service", "about": "Ninja Puppy assumes the role of the marketing person or department in your company.", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Consulting agency", "access_token": "EAATyloueTgYBOZCjIT25fS6V8Xvnv1XMgGomZBrUGziR1gqpFsouBkY2sU7kT3gb4ncFBpzw3H357L2ynny7WiRvTSQdn8GKdgzk6XQpLJrO5wZCbReDMYJT0rZAjVd8DeZCcqhqPEPtsjyGjslmhJL3fX7Gkdj39NSZAw5isCUeAl9gyc5GZAmpUqw2ZBZCg6jn3wMYGIwym2cE4ZCZBgZD", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/406492496_122141516690029948_4150597460625936681_n.jpg?stp=c40.0.100.100a_dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tfwGM_d_BQ8AX-Mxye0&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfAgwJmxa5JbgmYHS72pq4wu660ox_n-SOcOGXAQhfbsMA&oe=66070854"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '186050124587014',
    '4b538559-c8d6-4dd2-8671-fe4249298178',
    'facebook_page',
    '{"name": "Premium Giveaways ", "about": "Experience the thrill of winning high-value prizes. We do giveaways every 45 days", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Gift shop", "access_token": "EAATyloueTgYBO1ErfXXZCpCxZBIWZBKrv87ZCNiU0IiYgAp7qu0f8iqhTwZBaFXhACUoHDvt3mo4W2o1fzAyrEp7SybcuwdMTRqCA3FZBIXFdVTZAvVLz5kNb51hmeonetzVCFRftWqShGBZBfBfDIXbfYA8MzHm2sS0hLHV5stW9LsQU0NNeQBBhcEj1xjBuMOQW6XrD9laZC2nMwYUZD", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/403870484_122139572642029948_6392002514693299198_n.jpg?stp=dst-jpg_p100x100&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7Gvpw2xt9roAX_mwj5k&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfBFKEwt3Lmig7WZKQ7roi_jTJSCvFNLD9ABdtz3JXFr7g&oe=66072717"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '171611616037183',
    '07ba8f86-d8da-4ea2-937a-5a7982b939c8',
    'facebook_page',
    '{"name": "Grapevine.Global", "about": "We connect the connectors & align the magic makers in a closed network ", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Professional networking", "access_token": "EAATyloueTgYBO5OtmynlgvkKQyOvC1MXlM0Ij1JO6oS4UJfimdgdK8EOJYwjBgloqBZA7qByzVV7T7m65nVYMA8cPOfYZCtTeZBAFQRwsYiZCSPaqnUotxyrRxKqq5YhbQGVCI8FmYu8880p3cXmY8uaQGnmL7bDWlwdPgrMxXP3q8NKpENkDOD8Cr3wdSBKGUWVB32vqH21gooZD", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/404387523_122138530316029948_6759501017614066575_n.jpg?stp=c0.0.100.100a_dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Qj74L-lxvY8AX9Lzvzv&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfCGMf_9nRVNd2Uhteyjm25JFeOixNg3my8SxHDGTg6CNw&oe=6606DABC"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '110690242132648',
    '2ad6242a-d331-4c2e-b396-5fffd1b9b022',
    'facebook_page',
    '{"name": "Pareto Marketing Automations", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Internet company", "access_token": "EAATyloueTgYBOzLLjkoh5CjSJ4BzJc4L4rPwGrPisC8Cc5cfYG05AAIuLyXfrdwdJJEGPHk2a5CyuTERUYZBli9aVzDQrDxg4UZBtYt14LIkeLuzcliZAGCM0ywTCatGBVMIZACW3HvYiF7YZAZAwp5HPsfJYbJhDltfFVkINu2cIWStjbSwEZCztfAmSS7MZCedMsQ4KgX1oscdVtMZD", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/369601762_122093666354031574_2863896195214282380_n.png?stp=dst-png_p100x100&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TegAk5Ani1cAX_nuIGe&_nc_ht=scontent-ams4-1.xx&edm=AOf6bZoEAAAA&oh=00_AfAxP1mSxKauE_beLhydvyhb9Y7QVtYKYg8mCp8rF95mnQ&oe=66062342"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '125759393944715',
    'ec2ebc48-c3ea-4209-83fd-7e50c511b532',
    'facebook_page',
    '{"name": "Colocio AI", "about": "In an era saturated with data, Pareto understands every user engagement, click, and impression and tells you what to do with it .", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Marketing agency", "access_token": "EAATyloueTgYBO3bSjKwPSsZCEiUy5QA22si1a4Aei50tEgZAghJyNTfskOUbNPXcITCzzILXCZAgGhMzjfUXVAD1mLSnzwsd0SDZCo4PiG6DbbHkmcEXcogIaMJBzMDIq5fzXGLyVPWo4nnegGcPZBaQFc3quFMmnvUNAFxP4x8zpGsizop3pzIhezSPZC4u1J8MvSYdiOETfzV1sZD", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/381127467_122133039356008261_6967118522398766123_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wn6eQs4Q0mIAX-f-tyK&_nc_ht=scontent-ams4-1.xx&edm=AOf6bZoEAAAA&oh=00_AfDuwfrw5kSzTlEHiYvV8HkKP6k3LBOJIpHd2cDHle4pbw&oe=6605F6F8"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '110707282046256',
    '9ae2d04a-eda4-4738-9933-6a53a9ed05c1',
    'facebook_page',
    '{"name": "Lake Cycling South Africa", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Sportswear shop", "access_token": "EAATyloueTgYBO71J6DLPuKCxVxzV8mmJFGOismbL71ibXTQwusxNLmd8HGqMSZAC7LtT1S37xieweKgCR5MU2sVbWKpAfWjLMNxAovzoE3SvjHt4VprqwZBWtIeO8W4rlzUmRhdPuCAd9n6VbQfdh0S9BOPSxznPs92j6sZBzYCEpKAxZACHTbuhZA1ZBWrhbD8Por0UrEgRVwDCEZD", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/426070214_269578412822959_9210072242004586850_n.jpg?stp=dst-jpg_p100x100&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=oG0ERtXhSjsAX_GhvCI&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfCkM6D8FmL7q1enZfl5-4BxT6a45a7DzoVsdz-TzZX-Ww&oe=66063E6A"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '114576288310799',
    '5da2a7df-0941-47f1-a3ec-f1a190c67d85',
    'facebook_page',
    '{"name": "Cradle Ultra Trail", "about": "CRADLE ULTRA-TRAIL presented by Hi-Tec South Africa is a trail run experience outside of Joburg!", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE", "VIEW_MONETIZATION_INSIGHTS"], "category": "Sports", "access_token": "EAATyloueTgYBO4AFd32jYSalgCc0sukhPshorwbgyUOMS8KzUoOJrODD4CN0SSTkgUEpEHBwehXZBWn5hH7onZCz9XOnz2ZCxvZAfQx50DJwPTw9TYCkZALpfdQVAB2gVZBsl2kHmDfk9pGaCUVOAPcnk022WffAOK7zWf0MIyBlRF1I1ZAbQu4NYhZBIKDNBAVBTYk3I7Qs3ZBF2oS4ZD", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/350131654_6548558578541675_1419374959341682132_n.jpg?stp=dst-jpg_p100x100&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kJaERlagba4AX_fRsrK&_nc_ht=scontent-ams4-1.xx&edm=AOf6bZoEAAAA&oh=00_AfAJbTZw56i9li2aD2no7qNCJRSBfao4id88Ku_yEV27zA&oe=6606BBFC"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '112103471796536',
    '2486f2a5-58f3-4708-b8d7-d6684a746a6c',
    'facebook_page',
    '{"name": "RatesWise", "about": "We are here to assist with any issues you may have with your CoJ accounts!", "tasks": ["MANAGE_LEADS", "MODERATE", "MESSAGING", "ANALYZE", "ADVERTISE", "CREATE_CONTENT"], "category": "Consulting agency", "access_token": "EAATyloueTgYBO07OPK3eIYepmkPmtN0MSiqc3jfO9in2kryJGHZAFxauLwPNPrpIQGgOYj4APyekZCFZCZCPVrLGmet0BnvcXs8Mf2mfmjUupdd2F7CmpYLBhykKxdXmjfEKmZBlI138WYKth7gyApIQ8O1lS2tavTtbo97pw3HKwVgp6pLogU8SqShru5dBAWxFjmGUKFIKkrZAwZD", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/338192577_746849770279132_8632847464209275477_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZR4GIEacxvAAX8ym-Yc&_nc_ht=scontent-ams4-1.xx&edm=AOf6bZoEAAAA&oh=00_AfAE7iX65FYFEGxVRTnhYs_9KseXSzPQvOnvSZFTK2Nvxw&oe=66065E73"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '521972918165606',
    '675197ca-3b6b-4b27-9544-a7544d1d2183',
    'facebook_page',
    '{"name": "Knysna Extreme Triathlon", "about": "Knysna Extreme Triathlon\nTriathlon in its Purest Form\n2nd November 2024", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE", "VIEW_MONETIZATION_INSIGHTS"], "category": "Sports event", "access_token": "EAATyloueTgYBO0MPZAyZAtxVY7OY4j6USZB8lyUiS9wvzxUsgrXHSnPKmb8x78Y5tTUKRhlCLiLrTOaMeAj7UOVwKcbqsMIyZAL6qSyTxYFyN4ZBgid2Vo59ICzcZAwJfG4bNHctS3Y5MMiylWkLgyPTMg8Ao4NXMxCQDoRQndramWLarVei8cqJa1plTLmulwC1SdmeT9Q6zjrSSq", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/406341922_864849062307328_5175559259200987923_n.jpg?stp=dst-jpg_p100x100&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1cHz48v-kEgAX_BqfMP&_nc_ht=scontent-ams4-1.xx&edm=AOf6bZoEAAAA&oh=00_AfBU87nNvCbcZZ_UckqoBt-mE5LI1lMrOw1pt0gkn9plhA&oe=6605E3FD"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '106752465569971',
    '8ca77712-28eb-43a7-baa6-004f8adbb8f5',
    'facebook_page',
    '{"name": "Rescom Projects", "about": "Trustworthy & Reliable\nAuthentic SABS approved products.\n\nExclusively in Cape Town, South Africa.", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE"], "category": "Property", "access_token": "EAATyloueTgYBO9D9bHb5UPgmxE9edDrHss38VqTF2AmvVRBrKQ6JdkbmegcJfnTyuFTA6Vlo2zaW5QZBQwcdyEdHX7rJxcIbcn7TJrkhi9dk48fiC9CkIc51VuxyN8mWHxppLDioAIjKYVUEugqT0Nzmxe4pkC1XnIcg9t4n1ejV6vXwqQMMZBetDa3hJQgcXMBm6vwLVUpKYZD", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/312805661_1953107181546456_4419397446873763661_n.jpg?stp=dst-jpg_p100x100&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KA16bjshgdgAX92n4x0&_nc_ht=scontent-ams4-1.xx&edm=AOf6bZoEAAAA&oh=00_AfAkKhofXRB4GCqwrxTwq_ZH-Netd_4B0VIczaOuf8qEIg&oe=6606B91F"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '280757359072860',
    '02d006c8-7dff-4808-87ca-943a91ce55d0',
    'facebook_page',
    '{"name": "BBQs and Buffets", "about": "BBQs and Buffets provide High-quality Bbq''s, Buffets, catering, weddings, corporate and private events nationwide.\nE-mail us at info@bqqsandbuffets.co.uk", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Caterer", "access_token": "EAATyloueTgYBO77SG2nuFhOTJmGPWs9m9PZBrdbgfIWQEYafceIOKPCIrrWwyye9VN9O2KZCSnZBu0rBwNeajiBr4BIH4jvJ2y8eNicGPP7ZCJJ2hWFjqRMmXVlCIKbrZAuCn9iyVBslTyNclFUYy1yRnhIVevBQal4xUN9WzUdkuI5ZAAHE0ErpOUgS6n6EDkT8u4tzNKOZATJkkEZD", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/283146851_1376228099525775_1420006433130861172_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=evLH_TviIbQAX9BOfHO&_nc_ht=scontent-ams4-1.xx&edm=AOf6bZoEAAAA&oh=00_AfBFFmqUs0pa3PEG4nxCHsuFhDWiveOLiIdkKNVf8o_Wqg&oe=660662E4"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '111195259213131',
    'db5909e9-13c6-4c7c-afd0-2d47665efe47',
    'facebook_page',
    '{"name": "WannaDo Events", "about": "We create experiences! Wannna join us?!\nwww.wannado.co.za", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE", "VIEW_MONETIZATION_INSIGHTS"], "category": "Sports event", "access_token": "EAATyloueTgYBO6GK5q5WoxHJBx8ZCbhpOEJTruF0qzHAZBfLHsGvZBNpdAWQIZAbOr77lxe63d2sNZBYthuUyeudkQrBgT01DP6ZBbPMHUyN7JCDKR4hlugZCu8gCPQ8HQbtGeZAf16gOyJUCOS6ZCrrApacetGlx5UcJuuHi6u9Om8YBIVWGAaUbI9dburFFpGbK8f0PZCNL9CamIs4IZD", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/347235216_607519307996806_8694505355765756448_n.jpg?stp=dst-jpg_p100x100&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=VxA_wyg_hjEAX8RU-FU&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfA3JRSDCoXSSwUba9qemhpK9vupaI7qoX5AQk7rQz9N_A&oe=6607415E"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '1979353475642019',
    '0487e24d-1ada-4d1a-873b-de5abc6956f8',
    'facebook_page',
    '{"name": "The Campus Run Series", "about": "THE CAMPUS RUN SERIES \nJoin us on a scenic 5KM | 10KM |15KM road run through the Bryanston suburbs.\n4 Races | 4 Seasons | 3 Distances | 2 Routes | 1 Ultimate Medal\n", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE", "VIEW_MONETIZATION_INSIGHTS"], "category": "Sport and recreation", "access_token": "EAATyloueTgYBOxZCP5NvZAvv8VT65pHkWSYTWoMfNkqgbZCOO3ZB0NA5NUJo5wizHUGHehDQCDUDfmqymw0I9zNSZC0gZAiXSVSXuY7svo0jCWQdfVKW6mB30mK1Ne9bme0Mram2pMXUEnR7ORjZCQUjDTWGyZAIJQZA5kPN9UezdwsZBw46Rfw3PN37AF7ZAUyZBy4jCklRxFw8RZBR3S5Qx", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/304615215_484079750393490_857749105357927854_n.png?stp=dst-png_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ujYRYNGse-AAX-lA3IA&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfAKwJn0jFwJJ6VlFEbXVW9QysEph_Cv5-OesXog8d0AMQ&oe=6606E6BC"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '767657446577966',
    '8f2c78ec-f563-4b2f-ba6f-6fc12cce2fb4',
    'facebook_page',
    '{"name": "AfricaBlack Coffee Roastery & Espresso Bar", "about": "Coffee roastery and espresso bar. We serve breakfast and light lunches and takeaways in the area.", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE"], "category": "Coffee shop", "access_token": "EAATyloueTgYBO2PjCYVw7ZAcBOJXmP0p4NyfuhmAfPir5tpoFDwZArZCgZAMhZBdFvZA9U9rEtgxIanjNRfV1RE8adsZBohzU8YaCxvSXLEqGoAzI6rkXMZCwM7qQQZCZCC2y7XTC9DfhddfYcN9HALWaqdYAyuOkqKIDqs6o5szk80R5DiRv4Vc7k65GmPv2Jg3VGVgdfzjJ0S9em8pTW", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/305220417_509810944482825_2852640921258986693_n.png?stp=dst-png_p100x100&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=J5-H4SLpA1wAX8yjm5U&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfDeLukLYxMQj8wnZhVAq9X3EgCF3rfNMPVgGU86EfFgxQ&oe=6606A75A"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '106051460763342',
    'e8ffa2b8-1a72-4722-a069-5ac2b139a173',
    'facebook_page',
    '{"name": "Zombie Survival Dash", "about": "Zombie Infested Obstacle Run ", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE", "MANAGE", "VIEW_MONETIZATION_INSIGHTS"], "category": "Sport and recreation", "access_token": "EAATyloueTgYBOwUatzfGSCOnMpnGaatUKTHSZAmXJCsCSC1tyJHPardppYZAGPieRW5Vdp0i1tupsEVQWVl9KQOIYUrDw1fLOjZCHvZAnmAcgiEm7Gn02TXryNrBSScmnkkBF70y4U5HwzoGJrjD4lKFm7h3m9n8VHx53ZBZC4706KZAYyYPeDonXqb6ZA7BcImGtkhFF6tAm4OzK7cZD", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/291817706_526776195909411_842810113101925530_n.png?stp=dst-png_p100x100&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hEA_-POPZFgAX91AwC4&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfB9jQatFHEt2p-Smw_pd2xISFWoUvXG6RnKaMkpRdsTtg&oe=660604AB"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '649015485170020',
    '45becc68-5762-4a41-b462-f803780b303a',
    'facebook_page',
    '{"name": "Bahri Wedding Venue", "tasks": ["ADVERTISE", "ANALYZE", "CREATE_CONTENT", "MESSAGING", "MODERATE"], "category": "Wedding venue", "access_token": "EAATyloueTgYBO9P3mibJ5trQQMZAVJ03XtmzkBZCOZAGMU9KfdmtZCtnUzQNPYiHXxRuJTxf967sil577l8gZCdRo5NPXJD9eTr9V49FwohHnh05xEFhyXJjkuY4VgWsbWYQ5bL5YEZBunFInOpe0oSvabnNYlkTBOUZBh9yRp72QkpzEnRFnBsC00bH7ZBoyGAjZC5dURKy8EqKU0V5C", "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-1/361268286_778357350654872_90915048728831081_n.jpg?stp=dst-jpg_p100x100&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3kmVHTakCskAX90x_fR&_nc_ht=scontent-ams2-1.xx&edm=AOf6bZoEAAAA&oh=00_AfA2UkvjQF8jgxLZwoEWKTijOXSBetJSDgVZT5Jcz33bjA&oe=66063D88"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '607930781508916',
    '36b51c63-f1e6-4436-b47b-101c0f63cb98',
    'facebook_business_account',
    '{"name": "Pareto Marketing Automation", "vertical": "ADVERTISING", "timezone_id": 141, "primary_page_id": "110690242132648", "two_factor_type": "all_required", "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-1/369601762_122093666354031574_2863896195214282380_n.png?stp=dst-png_p100x100&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TegAk5Ani1cAX_nuIGe&_nc_ht=scontent-ams4-1.xx&edm=AHwItHgEAAAA&oh=00_AfBYhTzk6JXtQxFR5UnO2sGosCChiAEIKv3nAYgjCJK8bg&oe=66062342", "verification_status": "verified"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841462342616124',
    '088b5556-e587-4594-905d-e6de93a0c7f2',
    'instagram_account',
    '{"name": "Colocio AI", "username": "colocio.ai", "biography": "The future in AI driven Marketing Automation", "follows_count": 116, "followers_count": 20, "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t51.2885-15/382619310_279133858343891_7064511725959013991_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7d201b&_nc_ohc=dioUBoma9WUAX8MOaSl&_nc_ht=scontent-ams4-1.xx&edm=AL-3X8kEAAAA&oh=00_AfB-unIzdTQb6aTo6_MOn2gMHTXInwlFVEIkP4DR-amniQ&oe=6605C91C"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841460812514897',
    '1bc1681c-c0df-435d-93f3-6c30f16f573c',
    'instagram_account',
    '{"name": "Lake Cycling South Africa", "username": "lake.cyclingsa", "biography": "The worlds finest cycling shoe on the market", "follows_count": 106, "followers_count": 155, "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t51.2885-15/425962840_401413379131581_8435912372196422639_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7d201b&_nc_ohc=LLqNgda7L-cAX-lfQk1&_nc_ht=scontent-ams4-1.xx&edm=AL-3X8kEAAAA&oh=00_AfBM811sIAQSeGEhNsQ1xifQvHqdN8gCMdpUqwWVwdeBew&oe=6606E907"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841460414991338',
    'bac05c91-acbe-441b-85c1-a2130de926b7',
    'instagram_account',
    '{"name": "Cradle Ultra Trail", "username": "cradleultratrail", "biography": "Exciting News! \nSave the date - 2 March 2024\n6km | 10km | 15km | 25km | 50km\nThe CRADLE ULTRA-TRAIL is a trail runner''s paradise. Just 20mins from JHB", "follows_count": 58, "followers_count": 631, "profile_picture_url": "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/353976921_264129679645127_8801966730422461252_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=JYdrQacXdlwAX_WJL9A&_nc_ht=scontent-ams4-1.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AfCaT9-CNFTlf3VfVeZx0486zyvqLYSC7uNlQoDv1NkQtA&oe=660656A4"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841458338023031',
    '54d65a57-c80f-4d72-b726-450edce7ba07',
    'instagram_account',
    '{"name": "RatesWise SA", "username": "rateswise_sa", "biography": "We are here to assist with any issues you may have with your CoJ accounts!", "follows_count": 281, "followers_count": 109, "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t51.2885-15/338209841_598656831898984_6906851517059990823_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7d201b&_nc_ohc=6A2uu_kFW2wAX9F8RXS&_nc_oc=AdgDseMRd_8khZ55v6WXQ7Bxu00pKK6sHzodEIWkUG3ArKFZNxvoOCx2QsOvS5dQqF0&_nc_ht=scontent-ams4-1.xx&edm=AL-3X8kEAAAA&oh=00_AfCSp8zkvTiD7Q-vpjzCPq7JxoMCgdBIxAuqgAubhFBq2g&oe=6606D790"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841406968352380',
    '1f75b814-4e98-44d8-9d08-762fdefcb0b8',
    'instagram_account',
    '{"name": "Knysna Extreme Triathlon", "username": "knysnaxtri", "biography": "A triathlon experience like no other", "follows_count": 97, "followers_count": 2387, "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t51.2885-15/92216725_2979711838788341_6768021873197318144_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7d201b&_nc_ohc=apBOVRshVX4AX8Fg8u0&_nc_ht=scontent-ams4-1.xx&edm=AL-3X8kEAAAA&oh=00_AfDkpLyRMhOHgQcm56ILQ2LKZmzGXhkHRGDPXsTR6tW2sw&oe=660676CA"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841405951530604',
    '740c4bff-b976-4660-8937-fd27dc516eed',
    'instagram_account',
    '{"name": "Event Caterer Group: BBqs and Buffets", "username": "event_caterer_group", "follows_count": 235, "followers_count": 12512, "profile_picture_url": "https://scontent-ams4-1.xx.fbcdn.net/v/t51.2885-15/282277549_2384956261802907_170980425679364868_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7d201b&_nc_ohc=Iq_AVDng0WwAX9apa56&_nc_ht=scontent-ams4-1.xx&edm=AL-3X8kEAAAA&oh=00_AfCkby3LD3JEKOlSWZDsIASlg6P12BFZB662EDtHuiS-eg&oe=6605B234"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841410876112992',
    '8bdb6c6b-e272-43cf-8751-bdd18710ce9b',
    'instagram_account',
    '{"name": "WannaDo Events", "username": "wannadoevents", "follows_count": 131, "followers_count": 3239, "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t51.2885-15/350434266_496043329335233_6778280249763773182_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7d201b&_nc_ohc=5sIO0ShKbewAX_dHd6Z&_nc_oc=Adiw-ukJ478xyM4f_dOi1v8ygIodXX2m8qazhWDBMQSoTePJB2ru1CysYCo4JEemxmg&_nc_ht=scontent-ams2-1.xx&edm=AL-3X8kEAAAA&oh=00_AfAna0Mt-496m8ctkpGqPiI7ZO25_VESvfNqNqNNnJ2Rxg&oe=6605F639"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '17841400476909824',
    'be4e64f3-df0e-431c-8ee1-209a449109a0',
    'instagram_account',
    '{"name": "Bahri Wedding Venue", "username": "bahriweddingvenue", "biography": "Situated in the the Vredefort Dome World Heritage Site, Bahri Wedding Venue was born out of love ❤️", "follows_count": 235, "followers_count": 1242, "profile_picture_url": "https://scontent-ams2-1.xx.fbcdn.net/v/t51.2885-15/11296915_1631399407099400_841870045_a.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7d201b&_nc_ohc=q7gnNPYnE_UAX_S_N3S&_nc_ht=scontent-ams2-1.xx&edm=AL-3X8kEAAAA&oh=00_AfCj2UgAU0Ng2OUpOvbSnjxCKGXMSJqYYIygAzDPcx1O2A&oe=66069F00"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  ),
  (
    'e74bc3f0-abab-4865-873f-3dd65dab2908',
    '959887315096134',
    '28490f6c-50df-4444-bedd-dc0541ba25c7',
    'facebook_pixel',
    '{"code": "<!-- Facebook Pixel Code -->\n<script nonce=\"iiS1NAIh\">\n!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;\nn.push=n;n.loaded=!0;n.version=''2.0'';n.queue=[];t=b.createElement(e);t.async=!0;\nt.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,\ndocument,''script'',''https://connect.facebook.net/en_US/fbevents.js'');\n\nfbq(''init'', ''959887315096134'');\nfbq(''track'', \"PageView\");</script>\n<noscript><img height=\"1\" width=\"1\" style=\"display:none\"\nsrc=\"https://www.facebook.com/tr?id=959887315096134&ev=PageView&noscript=1\"\n/></noscript>\n<!-- End Facebook Pixel Code -->", "name": "Pareto''s Pixel", "owner_ad_account_id": "1338359276753508"}',
    '2024-03-25 15:04:24.10533+00',
    '2024-03-25 15:04:24.10533+00'
  );

INSERT INTO
  public.entities_assets (auid, euid, created_at)
VALUES
  (
    '2486f2a5-58f3-4708-b8d7-d6684a746a6c',
    '8b3eaa28-6b4f-4166-a1b8-ff315cc3dc74',
    '2024-03-25 17:47:31.664324+00'
  ),
  (
    '54d65a57-c80f-4d72-b726-450edce7ba07',
    '8b3eaa28-6b4f-4166-a1b8-ff315cc3dc74',
    '2024-03-25 17:47:31.672723+00'
  ),
  (
    '7db4abb9-b1c6-4968-b29d-3fc01ab9a8fe',
    '8b3eaa28-6b4f-4166-a1b8-ff315cc3dc74',
    '2024-03-25 17:47:31.681709+00'
  );
