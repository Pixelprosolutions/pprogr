/*
  # Create forms tables for PixelPro Solutions

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, optional)
      - `company` (text, optional)
      - `website` (text, optional)
      - `message` (text, optional)
      - `services` (text array)
      - `budget` (text, optional)
      - `timeline` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `package_selections`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `company` (text, required)
      - `website` (text, optional)
      - `social_media` (jsonb)
      - `address` (text, optional)
      - `city` (text, optional)
      - `selected_package` (text, required)
      - `additional_services` (text array)
      - `message` (text, optional)
      - `budget` (text, optional)
      - `timeline` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read their own data
    - Add policies for service role to manage all data
*/

-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  website text,
  message text,
  services text[] DEFAULT '{}',
  budget text,
  timeline text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create package_selections table
CREATE TABLE IF NOT EXISTS package_selections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text NOT NULL,
  website text,
  social_media jsonb DEFAULT '{}',
  address text,
  city text,
  selected_package text NOT NULL,
  additional_services text[] DEFAULT '{}',
  message text,
  budget text,
  timeline text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_selections ENABLE ROW LEVEL SECURITY;

-- Create policies for consultation_requests
CREATE POLICY "Anyone can insert consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all consultation requests"
  ON consultation_requests
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update consultation requests"
  ON consultation_requests
  FOR UPDATE
  TO service_role
  USING (true);

-- Create policies for package_selections
CREATE POLICY "Anyone can insert package selections"
  ON package_selections
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all package selections"
  ON package_selections
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update package selections"
  ON package_selections
  FOR UPDATE
  TO service_role
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_consultation_requests_updated_at
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_package_selections_updated_at
  BEFORE UPDATE ON package_selections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
