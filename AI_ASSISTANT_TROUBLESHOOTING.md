# 🚨 AI Assistant Troubleshooting Guide

## Current Issue: "I'm having trouble connecting right now"

This error means the Gemini API key is not properly configured in Supabase.

## 🔧 **Step-by-Step Fix:**

### **1. Add API Key to Supabase Environment Variables**

**CRITICAL**: You must add the API key to Supabase Edge Functions environment variables:

1. **Go to your Supabase Dashboard**
2. **Click on "Edge Functions"** in the left sidebar
3. **Click on "Settings"** or look for **"Environment Variables"**
4. **Add New Variable**:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyAKYyimiM3CL0wFAB6w2T3YiTs4heMViFg`
5. **Save the variable**

### **2. Verify the Edge Function is Deployed**

1. **Go to Edge Functions** in your Supabase dashboard
2. **Look for "ai-assistant"** function
3. **If it's not there**, the function needs to be deployed

### **3. Test the API Key Manually**

You can test if the API key works by running this in your terminal:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAKYyimiM3CL0wFAB6w2T3YiTs4heMViFg" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Hello, test message"
          }
        ]
      }
    ]
  }'
```

### **4. Check Edge Function Logs**

1. **Go to Edge Functions** → **ai-assistant** → **Logs**
2. **Look for error messages** like:
   - "GEMINI_API_KEY not found"
   - "Failed to fetch"
   - Any other errors

### **5. Alternative: Manual Deployment**

If the function isn't automatically deployed, you might need to:

1. **Use Supabase CLI** (if available)
2. **Or manually create the function** in the Supabase dashboard

## 🔍 **Common Issues:**

### **Issue 1: Environment Variable Not Set**
- **Solution**: Add `GEMINI_API_KEY` to Supabase Edge Functions environment variables

### **Issue 2: Function Not Deployed**
- **Solution**: The edge function needs to be deployed to Supabase

### **Issue 3: API Key Invalid**
- **Solution**: Verify the API key works with the curl command above

### **Issue 4: CORS Errors**
- **Solution**: The function includes proper CORS headers

## 📞 **If Still Not Working:**

1. **Check browser console** for any JavaScript errors
2. **Check network tab** to see if the request is reaching the function
3. **Verify Supabase URL** and **anon key** are correct in your `.env` file

## 🎯 **Expected Behavior When Working:**

- Click the purple chat button
- See "PixelPro AI" with "Online" status
- Type a message and get intelligent responses
- Responses should be in Greek or English based on language selection

The AI assistant should respond with helpful information about PixelPro's services, packages, and pricing!
