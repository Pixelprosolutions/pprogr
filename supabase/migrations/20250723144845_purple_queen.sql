/*
  # Add missing timeline column to consultation_requests table

  1. Changes
    - Add `timeline` column to `consultation_requests` table
    - Column type: text (optional)
    - Safe migration with IF NOT EXISTS check

  2. Notes
    - This fixes the "Could not find the 'timeline' column" error
    - Column is nullable for backward compatibility
*/

-- Add timeline column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultation_requests' AND column_name = 'timeline'
  ) THEN
    ALTER TABLE consultation_requests ADD COLUMN timeline text;
  END IF;
END $$;