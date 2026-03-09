import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting (resets on function cold start)
const submissions = new Map<string, number[]>();
const MAX_SUBMISSIONS = 5;
const TIME_WINDOW = 3600000; // 1 hour in milliseconds

function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const userSubmissions = submissions.get(ip) || [];
  const recentSubmissions = userSubmissions.filter((time) => now - time < TIME_WINDOW);
  
  if (recentSubmissions.length >= MAX_SUBMISSIONS) {
    return { allowed: false, remaining: 0 };
  }
  
  recentSubmissions.push(now);
  submissions.set(ip, recentSubmissions);
  return { allowed: true, remaining: MAX_SUBMISSIONS - recentSubmissions.length };
}

function validateContactInput(data: any): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== "string") return { valid: false, error: "Nome é obrigatório" };
  if (data.name.trim().length < 2 || data.name.trim().length > 100) return { valid: false, error: "Nome deve ter entre 2 e 100 caracteres" };
  if (!data.phone || typeof data.phone !== "string") return { valid: false, error: "Telefone é obrigatório" };
  if (data.phone.trim().length < 10 || data.phone.trim().length > 20) return { valid: false, error: "Telefone inválido" };
  if (!data.email || typeof data.email !== "string") return { valid: false, error: "Email é obrigatório" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim()) || data.email.length > 255) return { valid: false, error: "Email inválido" };
  return { valid: true };
}

function validateEnrollmentInput(data: any): { valid: boolean; error?: string } {
  if (!data.fullName || typeof data.fullName !== "string") return { valid: false, error: "Nome completo é obrigatório" };
  if (data.fullName.trim().length < 3 || data.fullName.trim().length > 100) return { valid: false, error: "Nome deve ter entre 3 e 100 caracteres" };
  if (!data.whatsapp || typeof data.whatsapp !== "string") return { valid: false, error: "WhatsApp é obrigatório" };
  if (data.whatsapp.trim().length < 10 || data.whatsapp.trim().length > 20) return { valid: false, error: "WhatsApp inválido" };
  if (data.email && typeof data.email === "string" && data.email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim()) || data.email.length > 255) return { valid: false, error: "Email inválido" };
  }
  if (!data.courseFor || !["adult", "child"].includes(data.courseFor)) return { valid: false, error: "Selecione para quem é o curso" };
  if (data.courseFor === "child") {
    if (data.childAge === undefined || data.childAge === null) return { valid: false, error: "Idade da criança é obrigatória" };
    const age = Number(data.childAge);
    if (isNaN(age) || age < 3 || age > 17) return { valid: false, error: "Idade deve estar entre 3 e 17 anos" };
  }
  return { valid: true };
}

// Sanitize marketing string fields
function sanitizeStr(val: unknown, maxLen = 500): string | null {
  if (typeof val !== "string" || !val.trim()) return null;
  return val.trim().slice(0, maxLen);
}

interface ContactData {
  type: "contact" | "whatsapp_chat";
  name: string;
  phone: string;
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
}

interface EnrollmentData {
  type: "enrollment";
  fullName: string;
  whatsapp: string;
  email?: string;
  courseFor: "adult" | "child";
  childAge?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
}

type SubmissionData = ContactData | EnrollmentData;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIP(req);
    console.log(`Submission request from IP: ${clientIP}`);
    
    const { allowed, remaining } = checkRateLimit(clientIP);
    if (!allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Limite de envios atingido. Tente novamente mais tarde.", code: "RATE_LIMIT_EXCEEDED" }),
        { status: 429, headers: { "Content-Type": "application/json", "X-RateLimit-Remaining": "0", ...corsHeaders } }
      );
    }

    const data: SubmissionData = await req.json();
    console.log("Received submission:", { type: data.type });

    let validation: { valid: boolean; error?: string };
    if (data.type === "contact" || data.type === "whatsapp_chat") {
      validation = validateContactInput(data);
    } else if (data.type === "enrollment") {
      validation = validateEnrollmentInput(data);
    } else {
      validation = { valid: false, error: "Tipo de submissão inválido" };
    }

    if (!validation.valid) {
      console.log("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error, code: "VALIDATION_ERROR" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const marketingFields = {
      utm_source: sanitizeStr(data.utm_source, 200),
      utm_medium: sanitizeStr(data.utm_medium, 200),
      utm_campaign: sanitizeStr(data.utm_campaign, 200),
      referrer: sanitizeStr(data.referrer, 500),
    };

    if (data.type === "contact" || data.type === "whatsapp_chat") {
      const contactData = data as ContactData;
      const { error } = await supabase.from("contacts").insert({
        name: contactData.name.trim(),
        phone: contactData.phone.trim(),
        email: contactData.email.trim(),
        ...marketingFields,
      });
      if (error) { console.error("Database error:", error); throw new Error("Erro ao salvar dados"); }
    } else if (data.type === "enrollment") {
      const enrollmentData = data as EnrollmentData;
      const { error } = await supabase.from("enrollment_inquiries").insert({
        full_name: enrollmentData.fullName.trim(),
        whatsapp: enrollmentData.whatsapp.trim(),
        email: enrollmentData.email?.trim() || null,
        course_for: enrollmentData.courseFor,
        child_age: enrollmentData.courseFor === "child" ? enrollmentData.childAge : null,
        ...marketingFields,
      });
      if (error) { console.error("Database error:", error); throw new Error("Erro ao salvar dados"); }
    }

    console.log("Submission saved successfully");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      sendEmailNotification(data, RESEND_API_KEY).catch((err) => {
        console.error("Email notification failed:", err);
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Dados salvos com sucesso", remaining }),
      { status: 200, headers: { "Content-Type": "application/json", "X-RateLimit-Remaining": String(remaining), ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao processar solicitação" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

async function sendEmailNotification(data: SubmissionData, apiKey: string) {
  let subject: string;
  let htmlContent: string;

  if (data.type === "contact" || data.type === "whatsapp_chat") {
    const contactData = data as ContactData;
    const typeLabel = data.type === "whatsapp_chat" ? "Chat WhatsApp" : "Contato";
    subject = `🎓 Novo ${typeLabel} - ${contactData.name}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">📞 Novo ${typeLabel} Recebido</h1>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nome:</strong> ${contactData.name}</p>
          <p style="margin: 10px 0;"><strong>Telefone:</strong> ${contactData.phone}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${contactData.email}</p>
          ${data.utm_source ? `<p style="margin: 10px 0;"><strong>Origem:</strong> ${data.utm_source} / ${data.utm_medium || '-'} / ${data.utm_campaign || '-'}</p>` : ''}
          ${data.referrer ? `<p style="margin: 10px 0;"><strong>Referrer:</strong> ${data.referrer}</p>` : ''}
        </div>
        <p style="color: #6b7280; font-size: 12px;">Este contato foi recebido através do site Tic Tac English School.</p>
      </div>`;
  } else {
    const enrollmentData = data as EnrollmentData;
    subject = `📚 Nova Matrícula - ${enrollmentData.fullName}`;
    const courseType = enrollmentData.courseFor === "adult" ? "Adulto" : "Criança";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">📚 Nova Solicitação de Matrícula</h1>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nome:</strong> ${enrollmentData.fullName}</p>
          <p style="margin: 10px 0;"><strong>WhatsApp:</strong> ${enrollmentData.whatsapp}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${enrollmentData.email || "Não informado"}</p>
          <p style="margin: 10px 0;"><strong>Curso para:</strong> ${courseType}</p>
          ${enrollmentData.childAge ? `<p style="margin: 10px 0;"><strong>Idade da criança:</strong> ${enrollmentData.childAge} anos</p>` : ""}
          ${data.utm_source ? `<p style="margin: 10px 0;"><strong>Origem:</strong> ${data.utm_source} / ${data.utm_medium || '-'} / ${data.utm_campaign || '-'}</p>` : ''}
          ${data.referrer ? `<p style="margin: 10px 0;"><strong>Referrer:</strong> ${data.referrer}</p>` : ''}
        </div>
        <p style="color: #6b7280; font-size: 12px;">Esta solicitação foi recebida através do site Tic Tac English School.</p>
      </div>`;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: "Tic Tac English <onboarding@resend.dev>",
      to: ["school.tictac@gmail.com"],
      subject,
      html: htmlContent,
    }),
  });
}

serve(handler);
