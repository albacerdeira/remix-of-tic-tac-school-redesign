import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "(11) 94776-4601",
      href: "tel:+5511947764601",
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
      value: "Rua Maria Rosa d'Elboux Bortoloti, 230\nSão Luiz - CEP: 13304-160\nItu - SP",
      href: "https://maps.google.com/?q=Rua+Maria+Rosa+d'Elboux+Bortoloti,+230,+Itu,+SP",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/tic.tac_school/",
      color: "hover:text-pink-600",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/tictacbygleice",
      color: "hover:text-blue-600",
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
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{info.label}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                </div>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <a href={info.href} target="_blank" rel="noopener noreferrer">
                    Contatar
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Professora Gleice</h3>
          <p className="text-muted-foreground mb-6">
            Fale conosco sobre suas necessidades, temos sempre uma turma que lhe atenderá.
          </p>
          
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                size="lg"
                className={`${social.color} transition-colors`}
              >
                <a 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
