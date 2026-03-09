-- ============================================
-- APPOINTMENTS TABLE
-- ============================================

CREATE TABLE appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID REFERENCES clients(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME,
  duration_minutes SMALLINT DEFAULT 30,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointments_date   ON appointments (appointment_date);
CREATE INDEX idx_appointments_client ON appointments (client_id);

-- RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all"  ON appointments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "auth_all"  ON appointments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Auto-update updated_at
CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
