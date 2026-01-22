import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackClick } from "@/hooks/useClickTracking";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  phone: z
    .string()
    .trim()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(20, "Telefone deve ter no máximo 20 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface WhatsAppChatBubbleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bottomOffset: number;
}

const WhatsAppChatBubble = ({ open, onOpenChange, bottomOffset }: WhatsAppChatBubbleProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const sendToSheets = async (formData: ContactFormData) => {
    try {
      await supabase.functions.invoke("send-to-sheets", {
        body: {
          timestamp: new Date().toISOString(),
          type: "contact",
          name: formData.name,
          phone: formData.phone,
          email: "",
          pageUrl: window.location.href,
        },
      });
    } catch (error) {
      console.error("Error sending to sheets:", error);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    // Prevent popup blockers: open the tab synchronously before any await.
    const popup = window.open("about:blank", "_blank");
    setIsSubmitting(true);

    try {
      const { data: response, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          type: "whatsapp_chat",
          name: data.name,
          phone: data.phone,
          email: `${data.phone}@whatsapp.lead`,
        },
      });

      if (error) {
        throw new Error(error.message || "Erro ao salvar dados");
      }

      if (response?.code === "RATE_LIMIT_EXCEEDED") {
        if (popup && !popup.closed) popup.close();
        toast({
          title: "Limite atingido",
          description: "Você já enviou muitos contatos. Tente novamente mais tarde.",
          variant: "destructive",
        });
        return;
      }

      if (response?.code === "VALIDATION_ERROR") {
        if (popup && !popup.closed) popup.close();
        toast({
          title: "Erro de validação",
          description: response.error || "Verifique os dados informados.",
          variant: "destructive",
        });
        return;
      }

      sendToSheets(data);

      trackClick('form_contact');
      trackClick('whatsapp_chat_form');
      
      if (typeof (window as any).gtagSendContactEvent === 'function') {
        (window as any).gtagSendContactEvent('form_submit');
      }

      const whatsappNumber = "5511916396965";
      const message = encodeURIComponent("Quero me matricular");
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      if (typeof (window as any).gtagReportConversionContact1 === 'function') {
        (window as any).gtagReportConversionContact1(whatsappUrl);
      }

      if (popup) {
        popup.location.href = whatsappUrl;
        popup.focus();
      } else {
        // Fallback when popups are blocked
        window.location.href = whatsappUrl;
      }
      
      reset();
      onOpenChange(false);

      toast({
        title: "Sucesso!",
        description: "Redirecionando para o WhatsApp...",
      });
    } catch (error) {
      if (popup && !popup.closed) popup.close();
      if (import.meta.env.DEV) {
        console.error("Error saving contact:", error);
      }
      toast({
        title: "Erro",
        description: "Não foi possível salvar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed right-6 z-50 w-80 animate-scale-in origin-bottom-right"
      style={{ bottom: `${bottomOffset + 70}px` }}
    >
      {/* Chat bubble container */}
      <div className="bg-background border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">👋</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Tic Tac School</p>
              <p className="text-xs text-white/80">Responde em minutos</p>
            </div>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat area */}
        <div className="p-4 bg-muted/30">
          {/* Message bubble */}
          <div className="bg-background rounded-lg rounded-tl-none p-3 shadow-sm max-w-[90%] mb-4">
            <p className="text-sm text-foreground">
              Olá! 👋 Para iniciar a conversa, por favor informe seu nome e telefone.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Input
                placeholder="Seu nome"
                className="bg-background border-border"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="(11) 99999-9999"
                className="bg-background border-border"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Iniciar Conversa
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Arrow pointing to button */}
      <div className="absolute -bottom-2 right-5 w-4 h-4 bg-background border-r border-b border-border transform rotate-45" />
    </div>
  );
};

export default WhatsAppChatBubble;
