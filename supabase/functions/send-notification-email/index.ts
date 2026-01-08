import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationEmailRequest {
  type: "contact" | "enrollment";
  name: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  courseFor?: string;
  childAge?: number | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationEmailRequest = await req.json();
    console.log("Received notification request:", data);

    let subject: string;
    let htmlContent: string;

    if (data.type === "contact") {
      subject = `🎓 Novo Contato - ${data.name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            📞 Novo Contato Recebido
          </h1>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Telefone:</strong> ${data.phone || "Não informado"}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email || "Não informado"}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            Este contato foi recebido através do site Tic Tac English School.
          </p>
        </div>
      `;
    } else {
      subject = `📚 Nova Matrícula - ${data.name}`;
      const courseType = data.courseFor === "adult" ? "Adulto" : "Criança";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            📚 Nova Solicitação de Matrícula
          </h1>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>WhatsApp:</strong> ${data.whatsapp || "Não informado"}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email || "Não informado"}</p>
            <p style="margin: 10px 0;"><strong>Curso para:</strong> ${courseType}</p>
            ${data.childAge ? `<p style="margin: 10px 0;"><strong>Idade da criança:</strong> ${data.childAge} anos</p>` : ""}
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            Esta solicitação foi recebida através do site Tic Tac English School.
          </p>
        </div>
      `;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tic Tac English <onboarding@resend.dev>",
        to: ["school.tictac@gmail.com"],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error(error);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
