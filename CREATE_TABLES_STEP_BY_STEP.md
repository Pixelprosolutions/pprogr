# Create Supabase Tables Step by Step

## ✅ Tables Already Exist! Let's Check What's There

Since you're getting "relation already exists" errors, the tables are there but might not be visible. Let's check:

### Step 1: Check What Tables Exist
1. In **SQL Editor**, run this query to see your tables:

```sql
-- Check if tables exist and their structure
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name IN ('consultation_requests', 'package_selections')
ORDER BY table_name, ordinal_position;
```

### Step 2: Check Row Level Security Policies
```sql
-- Check if RLS policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename IN ('consultation_requests', 'package_selections');
```

### Step 3: Add Missing Policies (if needed)
If the policies are missing, run this:

```sql
-- Only add policies if they don't exist
DO $$
BEGIN
  -- Check and create consultation_requests insert policy
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

  -- Check and create package_selections insert policy
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
```

### Step 4: Refresh Table Editor
1. Go to **Table Editor**
2. **Refresh the page** (F5 or Ctrl+R)
3. The tables should now appear

## Method 1: Using SQL Editor (Recommended)

### Step 1: Go to SQL Editor
1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy and paste this SIMPLE SQL (no complex checks):

```sql
-- Create consultation_requests table
CREATE TABLE consultation_requests (
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
CREATE TABLE package_selections (
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

-- Create policies for public form submissions
CREATE POLICY "Anyone can insert consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can insert package selections"
  ON package_selections
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

4. Click **"Run"**
5. You should see "Success. No rows returned"

### Step 2: Verify Tables Were Created
1. Go to **"Table Editor"** in the left sidebar
2. You should now see:
   - `consultation_requests`
   - `package_selections`

## Method 2: Using Table Editor (If SQL doesn't work)

### Create consultation_requests table:
1. Click **"Create a table"** button
2. Table name: `consultation_requests`
3. Add these columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `name` (text, required)
   - `email` (text, required)
   - `phone` (text, optional)
   - `company` (text, optional)
   - `website` (text, optional)
   - `message` (text, optional)
   - `services` (text[], default: {})
   - `budget` (text, optional)
   - `timeline` (text, optional)
   - `created_at` (timestamptz, default: now())
   - `updated_at` (timestamptz, default: now())

### Create package_selections table:
1. Click **"Create a table"** button
2. Table name: `package_selections`
3. Add these columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `name` (text, required)
   - `email` (text, required)
   - `phone` (text, required)
   - `company` (text, required)
   - `website` (text, optional)
   - `social_media` (jsonb, default: {})
   - `address` (text, optional)
   - `city` (text, optional)
   - `selected_package` (text, required)
   - `additional_services` (text[], default: {})
   - `message` (text, optional)
   - `budget` (text, optional)
   - `timeline` (text, optional)
   - `created_at` (timestamptz, default: now())
   - `updated_at` (timestamptz, default: now())

## After Creating Tables
1. Test the forms on your website
2. Check if data appears in the tables
3. Let me know if you see any errors!