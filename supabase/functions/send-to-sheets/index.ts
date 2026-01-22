import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SheetData {
  timestamp: string;
  type: "contact" | "enrollment" | "whatsapp";
  name: string;
  phone: string;
  email?: string;
  courseFor?: string;
  childAge?: number;
  pageUrl?: string;
  gclid?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL not configured");
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const data: SheetData = await req.json();
    
    console.log("Sending to Google Sheets:", data);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: data.timestamp || new Date().toISOString(),
        type: data.type,
        name: data.name,
        phone: data.phone,
        email: data.email || "",
        courseFor: data.courseFor || "",
        childAge: data.childAge || "",
        pageUrl: data.pageUrl || "",
        gclid: data.gclid || "",
      }),
    });

    const responseText = await response.text();
    console.log("Google Sheets response:", responseText);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending to sheets:", error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
