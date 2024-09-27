ALTER TABLE public.user_profile
ADD CONSTRAINT user_profile_active_entity_fkey FOREIGN key (active_entity) REFERENCES entities (euid)

