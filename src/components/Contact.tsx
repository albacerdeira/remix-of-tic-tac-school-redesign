import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import gestoraImage from "@/assets/gestora-gleice.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  fullName: z.string().trim().min(3, "Nome completo é obrigatório").max(100),
  whatsapp: z.string().trim().min(10, "WhatsApp com DDD é obrigatório").max(15),
  email: z.string().trim().email("E-mail inválido").max(255).optional().or(z.literal("")),
  courseFor: z.enum(["adult", "child"], {
    required_error: "Selecione para quem é o curso",
  }),
  childAge: z.number().min(3).max(17).optional(),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAgeInput, setShowAgeInput] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const courseFor = watch("courseFor");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Use rate-limited edge function
      const { data: response, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          type: "enrollment",
          fullName: data.fullName,
          whatsapp: data.whatsapp,
          email: data.email || undefined,
          courseFor: data.courseFor,
          childAge: data.courseFor === "child" ? data.childAge : undefined,
        },
      });

      if (error) {
        throw new Error(error.message || "Erro ao salvar dados");
      }

      if (response?.code === "RATE_LIMIT_EXCEEDED") {
        toast({
          title: "Limite atingido",
          description: "Você já enviou muitas solicitações. Tente novamente mais tarde.",
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

      // Dispara evento de conversão do Google Ads
      if (typeof (window as any).gtagSendContactEvent === 'function') {
        (window as any).gtagSendContactEvent();
      }

      toast({
        title: "Enviado com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      // Redirect to WhatsApp
      const whatsappMessage = encodeURIComponent(
        `Olá! Gostaria de me matricular. Meu nome é ${data.fullName}.`
      );
      window.open(
        `https://api.whatsapp.com/send?phone=5511916396965&text=${whatsappMessage}`,
        "_blank"
      );

      reset();
      setShowAgeInput(false);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error:", error);
      }
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "(11) 91639-6965",
      href: "tel:+5511916396965",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contato@tictacschool.com.br",
      href: "mailto:contato@tictacschool.com.br",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Rua Bahia, 362\nItu - SP\nCEP: 13301-430",
      href: "https://maps.google.com/?q=Rua+Bahia,+362,+Itu,+SP",
    },
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Venha conhecer, será um prazer recebê-lo e fazer parte desse sonho!
          </p>
        </div>

        {/* Enrollment Form */}
        <Card className="p-8 max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Faça sua Matrícula
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Nome Completo *</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Seu nome completo"
                className="mt-2"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp (com DDD) *</Label>
              <Input
                id="whatsapp"
                {...register("whatsapp")}
                placeholder="(11) 99999-9999"
                className="mt-2"
              />
              {errors.whatsapp && (
                <p className="text-sm text-destructive mt-1">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">E-mail (opcional)</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="seu@email.com"
                className="mt-2"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label>Para quem é o curso de inglês? *</Label>
              <RadioGroup
                onValueChange={(value) => {
                  setShowAgeInput(value === "child");
                }}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="adult"
                    id="adult"
                    {...register("courseFor")}
                  />
                  <Label htmlFor="adult" className="cursor-pointer font-normal">
                    Para mim (Adulto)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="child"
                    id="child"
                    {...register("courseFor")}
                  />
                  <Label htmlFor="child" className="cursor-pointer font-normal">
                    Para meu filho/filha (Criança/Teen)
                  </Label>
                </div>
              </RadioGroup>
              {errors.courseFor && (
                <p className="text-sm text-destructive mt-1">
                  {errors.courseFor.message}
                </p>
              )}
            </div>

            {(showAgeInput || courseFor === "child") && (
              <div>
                <Label htmlFor="childAge">Idade da criança/teen *</Label>
                <Input
                  id="childAge"
                  type="number"
                  {...register("childAge", { valueAsNumber: true })}
                  placeholder="Ex: 8"
                  min="3"
                  max="17"
                  className="mt-2"
                />
                {errors.childAge && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.childAge.message}
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Matrícula"}
            </Button>
          </form>
        </Card>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <info.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {info.label}
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {info.value}
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a 
                    href={info.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      // Dispara evento de conversão do Google Ads
                      if (typeof (window as any).gtagSendContactEvent === 'function') {
                        (window as any).gtagSendContactEvent();
                      }
                    }}
                  >
                    Contatar
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Manager Section */}
        <Card className="p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20" />
              <img
                src={gestoraImage}
                alt="Gestora Gleice - Tic Tac School"
                className="relative rounded-2xl w-full h-[400px] object-cover shadow-xl"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">
                Conheça Nossa Gestora
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Com mais de 10 anos de experiência na Vagalume, referência em
                ensino de inglês na região, e vivência internacional, nossa
                gestora traz uma nova perspectiva para o aprendizado do idioma.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Na Tic Tac School, combinamos metodologia comprovada com inovação
                e paixão pelo ensino, criando um ambiente onde cada aluno alcança
                seu máximo potencial.
              </p>

              <div className="pt-4">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="hover:text-pink-600 transition-colors"
                >
                  <a
                    href="https://www.instagram.com/tic.tac_school/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram da Tic Tac School"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    Siga-nos no Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
