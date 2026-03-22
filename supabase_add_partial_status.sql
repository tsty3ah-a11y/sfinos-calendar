-- Add 'partial' as allowed visit status
-- Run this in Supabase SQL Editor

-- If status uses a CHECK constraint, drop and recreate it:
ALTER TABLE visits DROP CONSTRAINT IF EXISTS visits_status_check;
ALTER TABLE visits ADD CONSTRAINT visits_status_check CHECK (status IN ('completed', 'partial'));

-- If status uses a Postgres enum type, add the value:
DO $$
BEGIN
  ALTER TYPE visit_status ADD VALUE IF NOT EXISTS 'partial';
EXCEPTION
  WHEN invalid_parameter_value THEN NULL;  -- already exists
  WHEN undefined_object THEN NULL;          -- not an enum, handled by CHECK above
END $$;
