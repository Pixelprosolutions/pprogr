# Supabase Setup Guide

## 1. Run Database Migration

### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy and paste the following SQL:

```sql
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
    - Add policies for public form submissions
    - Add policies for service role access
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

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (with IF NOT EXISTS check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_consultation_requests_updated_at'
  ) THEN
    CREATE TRIGGER update_consultation_requests_updated_at
      BEFORE UPDATE ON consultation_requests
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_package_selections_updated_at'
  ) THEN
    CREATE TRIGGER update_package_selections_updated_at
      BEFORE UPDATE ON package_selections
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_selections ENABLE ROW LEVEL SECURITY;

-- Policies for consultation_requests (with IF NOT EXISTS check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'consultation_requests' 
    AND policyname = 'Anyone can insert consultation requests'
  ) THEN
    CREATE POLICY "Anyone can insert consultation requests"
      ON consultation_requests
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'consultation_requests' 
    AND policyname = 'Service role can read all consultation requests'
  ) THEN
    CREATE POLICY "Service role can read all consultation requests"
      ON consultation_requests
      FOR SELECT
      TO service_role
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'consultation_requests' 
    AND policyname = 'Service role can update consultation requests'
  ) THEN
    CREATE POLICY "Service role can update consultation requests"
      ON consultation_requests
      FOR UPDATE
      TO service_role
      USING (true);
  END IF;
END $$;

-- Policies for package_selections (with IF NOT EXISTS check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'package_selections' 
    AND policyname = 'Anyone can insert package selections'
  ) THEN
    CREATE POLICY "Anyone can insert package selections"
      ON package_selections
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'package_selections' 
    AND policyname = 'Service role can read all package selections'
  ) THEN
    CREATE POLICY "Service role can read all package selections"
      ON package_selections
      FOR SELECT
      TO service_role
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'package_selections' 
    AND policyname = 'Service role can update package selections'
  ) THEN
    CREATE POLICY "Service role can update package selections"
      ON package_selections
      FOR UPDATE
      TO service_role
      USING (true);
  END IF;
END $$;
```

5. Click **"Run"** to execute the migration
6. You should see "Success. No rows returned" message

### Option B: Using Migration File
If you prefer to use the migration file system:
1. The migration file is already created at `supabase/migrations/create_forms_tables.sql`
2. If you have Supabase CLI installed locally, you can run: `supabase db push`

## 2. Set Environment Variables

### Check Current Environment Variables
Your environment variables should be set in the `.env` file in your project root.

### Required Variables
You need these two variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

### How to Find These Values
1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** in the settings menu
4. You'll see:
   - **Project URL** (copy this for `VITE_SUPABASE_URL`)
   - **Project API keys** section with **anon/public** key (copy this for `VITE_SUPABASE_ANON_KEY`)

### Set the Variables
Create or update your `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Replace the values with your actual Supabase project URL and anon key.

## 3. Test the Integration

After completing steps 1 and 2:

1. **Restart the development server** (if running):
   ```bash
   npm run dev
   ```

2. **Test the Consultation Form**:
   - Navigate to the consultation page
   - Fill out and submit the form
   - Check if you get a success message

3. **Test the Package Selection Form**:
   - Navigate to the pricing page
   - Select a package and fill out the form
   - Check if you get a success message

4. **Verify Data in Supabase**:
   - Go to your Supabase dashboard
   - Click on **Table Editor** in the left sidebar
   - You should see your new tables: `consultation_requests` and `package_selections`
   - Check if the submitted data appears in these tables

## 4. Troubleshooting

### Common Issues:

**"Missing Supabase environment variables" error:**
- Make sure your `.env` file is in the project root
- Restart the development server after adding environment variables
- Check that variable names start with `VITE_`

**Forms not submitting:**
- Check browser console for errors
- Verify the migration ran successfully
- Ensure RLS policies are set correctly

**Data not appearing in tables:**
- Check if tables were created successfully
- Verify the anon key has the correct permissions
- Check browser network tab for API errors

### Need Help?
If you encounter any issues:
1. Check the browser console for error messages
2. Check the Supabase logs in your dashboard
3. Verify all steps were completed correctly

## 5. Next Steps

Once everything is working:
- You can view form submissions in your Supabase dashboard
- Set up email notifications for new submissions (optional)
- Create admin views to manage submissions (optional)
- Set up automated responses (optional)