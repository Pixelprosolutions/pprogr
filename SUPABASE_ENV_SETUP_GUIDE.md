# 🔧 How to Add Environment Variable to Supabase (Step-by-Step)

## 📍 **Step 1: Access Your Supabase Dashboard**

1. **Open your web browser**
2. **Go to**: [supabase.com](https://supabase.com)
3. **Click "Sign in"** (top right corner)
4. **Select your PixelPro project** from the dashboard

---

## 📍 **Step 2: Navigate to Edge Functions**

1. **Look at the LEFT SIDEBAR** in your Supabase dashboard
2. **Find and click "Edge Functions"** (it has a `⚡` lightning bolt icon)
3. **You should see a list of functions** (including "ai-assistant" if it's deployed)

---

## 📍 **Step 3: Access Environment Variables**

**Option A: Through Edge Functions Settings**
1. **In the Edge Functions page**, look for a **"Settings"** button or tab
2. **Click on "Settings"**
3. **Look for "Environment Variables"** section

**Option B: Through Project Settings**
1. **Click the "Settings" gear icon** at the bottom of the left sidebar
2. **Click "Edge Functions"** in the settings menu
3. **Look for "Environment Variables"** section

---

## 📍 **Step 4: Add the Environment Variable**

1. **Click "Add Variable"** or **"New Variable"** button
2. **Fill in the form**:
   - **Variable Name**: `GEMINI_API_KEY`
   - **Variable Value**: `AIzaSyAKYyimiM3CL0wFAB6w2T3YiTs4heMViFg`
3. **Click "Save"** or **"Add Variable"**

---

## 📍 **Step 5: Verify the Variable**

After saving, you should see:
- ✅ **Variable Name**: `GEMINI_API_KEY`
- ✅ **Value**: `AIzaSy...` (partially hidden for security)
- ✅ **Status**: Active/Enabled

---

## 📍 **Step 6: Test the AI Assistant**

1. **Wait 1-2 minutes** for changes to take effect
2. **Go back to your website**
3. **Click the purple chat button** (bottom-right corner)
4. **Type a message** like "What services do you offer?"
5. **You should get an intelligent response!**

---

## 🚨 **If You Can't Find Environment Variables:**

### **Alternative Method: Through Project API Settings**

1. **Go to Settings** (gear icon in sidebar)
2. **Click "API"** in the settings menu
3. **Look for "Environment Variables"** or **"Edge Function Variables"**

### **If Still Not Found:**

The environment variables section might be in:
- **Settings → Edge Functions → Environment Variables**
- **Settings → API → Environment Variables**
- **Edge Functions → Configuration → Environment Variables**

---

## 🎯 **What You're Looking For:**

You need to find a section that looks like this:

```
Environment Variables
┌─────────────────┬──────────────────────────────┐
│ Variable Name   │ Value                        │
├─────────────────┼──────────────────────────────┤
│ GEMINI_API_KEY  │ AIzaSy... (hidden)          │
└─────────────────┴──────────────────────────────┘
[Add Variable] [Edit] [Delete]
```

---

## 📞 **Need More Help?**

If you're still having trouble finding the environment variables section:

1. **Take a screenshot** of your Supabase dashboard
2. **Look for any "Settings", "Configuration", or "Variables" sections**
3. **The key is to find where Edge Function environment variables are managed**

Once you add the `GEMINI_API_KEY` variable, the AI assistant will work perfectly! 🤖✨
