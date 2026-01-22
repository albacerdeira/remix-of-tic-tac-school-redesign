import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
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

  const getGclid = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('gclid') || localStorage.getItem('gclid') || '';
  };

  const sendToSheets = async (formData: ContactFormData) => {
    try {
      await supabase.functions.invoke("send-to-sheets", {
        body: {
          timestamp: new Date().toISOString(),
          type: "contact",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          pageUrl: window.location.href,
          gclid: getGclid(),
        },
      });
    } catch (error) {
      console.error("Error sending to sheets:", error);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Use rate-limited edge function
      const { data: response, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          type: "contact",
          name: data.name,
          phone: data.phone,
          email: data.email,
        },
      });

      if (error) {
        throw new Error(error.message || "Erro ao salvar dados");
      }

      if (response?.code === "RATE_LIMIT_EXCEEDED") {
        toast({
          title: "Limite atingido",
          description: "Você já enviou muitos contatos. Tente novamente mais tarde.",
          variant: "destructive",
        });
        return;
      }

      if (response?.code === "VALIDATION_ERROR") {
        toast({
          title: "Erro de validação",
          description: response.error || "Verifique os dados informados.",
          variant: "destructive",
        });
        return;
      }

      // Send to Google Sheets (non-blocking)
      sendToSheets(data);

      // Track form submission
      trackClick('form_contact');
      trackClick('whatsapp_form');
      
      // Dispara evento de conversão do Google Ads
      if (typeof (window as any).gtagSendContactEvent === 'function') {
        (window as any).gtagSendContactEvent('form_submit');
      }

      // Redirect to WhatsApp com evento de conversão
      const whatsappNumber = "5511916396965";
      const message = encodeURIComponent("Quero me matricular");
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      // Dispara evento conversion_event_contact_1 antes de abrir WhatsApp
      if (typeof (window as any).gtagReportConversionContact1 === 'function') {
        (window as any).gtagReportConversionContact1(whatsappUrl);
      } else {
        window.open(whatsappUrl, "_blank");
      }
      
      // Reset form and close dialog
      reset();
      onOpenChange(false);

      toast({
        title: "Sucesso!",
        description: "Seus dados foram salvos. Redirecionando para o WhatsApp...",
      });
    } catch (error) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entre em Contato</DialogTitle>
          <DialogDescription>
            Preencha seus dados para entrar em contato conosco via WhatsApp
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Entrar em Contato"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
