import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[]
  language?: 'el' | 'en'
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    const { message, conversationHistory = [], language = 'el' }: ChatRequest = await req.json()

    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // Get Gemini API key from environment or use fallback
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')

    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY environment variable not found')
      return new Response(
        JSON.stringify({ error: "AI service configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // Create system prompt based on language
    const systemPrompt = language === 'en' 
      ? `You are PixelPro Solutions' AI assistant. You help potential clients with questions about our digital services including website development, e-commerce, branding, digital marketing, mobile apps, and content creation. 

Our packages:
- Starter (€699/month): Basic website, hosting, SEO, 1 social platform, 8 posts/month, 1 ad campaign
- Growth (€1299/month): Custom website, enhanced SEO, 2 social platforms, 16 posts/month, Meta & Google ads
- Dominance (€2299/month): Premium website/light e-shop, 4 social platforms, 30 posts/month, full marketing strategy

We serve Greek and international businesses from our London and Greece offices. Be helpful, professional, and encourage users to book a free consultation. Keep responses concise and actionable.`
      : `Είσαι ο AI βοηθός της PixelPro Solutions. Βοηθάς πιθανούς πελάτες με ερωτήσεις για τις ψηφιακές μας υπηρεσίες όπως κατασκευή ιστοσελίδων, e-commerce, branding, ψηφιακό μάρκετινγκ, mobile apps και δημιουργία περιεχομένου.

Τα πακέτα μας:
- Starter (€699/μήνα): Βασικός ιστότοπος, φιλοξενία, SEO, 1 social platform, 8 posts/μήνα, 1 καμπάνια
- Growth (€1299/μήνα): Προσαρμοσμένος ιστότοπος, ενισχυμένο SEO, 2 social platforms, 16 posts/μήνα, Meta & Google ads
- Dominance (€2299/μήνα): Premium ιστότοπος/light e-shop, 4 social platforms, 30 posts/μήνα, πλήρης στρατηγική

Εξυπηρετούμε ελληνικές και διεθνείς επιχειρήσεις από τα γραφεία μας στο Λονδίνο και την Ελλάδα. Να είσαι εξυπηρετικός, επαγγελματικός και να ενθαρρύνεις τους χρήστες να κλείσουν δωρεάν συμβουλευτική. Κράτα τις απαντήσεις συνοπτικές και πρακτικές.`

    // Build conversation context
    const conversationContext = conversationHistory
      .slice(-6) // Keep last 6 messages for context
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n')

    const fullPrompt = `${systemPrompt}

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ''}
User: ${message}

Please respond as PixelPro's AI assistant:`

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    )

    if (!geminiResponse.ok) {
      console.error('Gemini API error:', await geminiResponse.text())
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    const geminiData = await geminiResponse.json()
    
    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      return new Response(
        JSON.stringify({ error: "No response generated" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    const aiResponse = geminiData.candidates[0].content.parts[0].text

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        timestamp: Date.now()
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )

  } catch (error) {
    console.error('AI Assistant error:', error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }
})