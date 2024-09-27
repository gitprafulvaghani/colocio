ALTER TABLE entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all actions for matching profile" ON entities FOR ALL TO authenticated USING (
  EXISTS (
    SELECT
      1
    FROM
      entities_profile
    WHERE
      entities_profile.euid = entities.euid
      AND entities_profile.uuid = auth.uid ()
  )
)
WITH
  CHECK (
    EXISTS (
      SELECT
        1
      FROM
        entities_profile
      WHERE
        entities_profile.euid = entities.euid
        AND entities_profile.uuid = auth.uid ()
    )
  );

