/*
  # Add missing services column to consultation_requests table

  1. Changes
    - Add `services` column (text array) to `consultation_requests` table
    - Set default value to empty array
    - Make column nullable for backward compatibility

  2. Notes
    - This fixes the "Could not find the 'services' column" error
    - Uses IF NOT EXISTS check to prevent errors if column already exists
*/

-- Add services column to consultation_requests table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultation_requests' AND column_name = 'services'
  ) THEN
    ALTER TABLE consultation_requests ADD COLUMN services text[] DEFAULT '{}';
  END IF;
END $$;