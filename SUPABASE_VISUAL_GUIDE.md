# 🎯 Visual Supabase Setup Guide

## Step 1: Access Your Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Click **"Sign in"** (top right)
3. You should see your project dashboard

## Step 2: Run the Database Migration

### 🔍 Find the SQL Editor
1. In your project dashboard, look at the **left sidebar**
2. Click on **"SQL Editor"** (it has a `</>` icon)

### 📝 Create New Query
1. Click the **"New Query"** button (usually green/blue button)
2. You'll see an empty SQL editor

### 📋 Copy and Paste the SQL
1. Go back to the `SUPABASE_SETUP.md` file I created
2. Copy ALL the SQL code (starts with `/*` and ends with `;`)
3. Paste it into the SQL editor
4. Click **"Run"** button (usually at bottom right)

### ✅ Success Message
You should see: **"Success. No rows returned"**

## Step 3: Get Your Environment Variables

### 🔧 Find API Settings
1. In the left sidebar, click **"Settings"** (gear icon at bottom)
2. Click **"API"** in the settings menu

### 📋 Copy Your Credentials
You'll see two important values:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: Long string starting with `eyJ...`

### 💾 Add to Your Project
1. In your project, find the `.env` file (in root folder)
2. Add these lines:
```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-long-anon-key-here
```

## Step 4: Test Everything

### 🔄 Restart Development Server
In your terminal, stop the server (Ctrl+C) and run:
```bash
npm run dev
```

### 🧪 Test the Forms
1. Go to your website
2. Try the **"Δωρεάν Συμβουλευτική"** form
3. Fill it out and submit
4. You should see a success message

### 📊 Check Database
1. Back in Supabase, click **"Table Editor"** in sidebar
2. You should see tables: `consultation_requests` and `package_selections`
3. Click on them to see your form submissions!

## 🆘 Need Help?
If you get stuck at any step, just tell me:
1. Which step you're on
2. What you see on your screen
3. Any error messages

I'll help you through it! 🚀