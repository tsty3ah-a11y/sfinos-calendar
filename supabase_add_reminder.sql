-- Run this if you already created the appointments table without reminder_minutes
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reminder_minutes SMALLINT DEFAULT 30;
