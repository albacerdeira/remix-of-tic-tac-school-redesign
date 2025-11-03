import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import gestoraImage from "@/assets/gestora-gleice.jpg";

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
      value: "Rua Bahia, 362\nItu - SP\nCEP: 13.300-000",
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
              <h3 className="text-3xl font-bold text-foreground">Conheça Nossa Gestora</h3>
              <p className="text-muted-foreground leading-relaxed">
                Com mais de 10 anos de experiência na Vagalume, referência em ensino de inglês na região, 
                e vivência internacional, nossa gestora traz uma nova perspectiva para o aprendizado do idioma.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Na Tic Tac School, combinamos metodologia comprovada com inovação e paixão pelo ensino, 
                criando um ambiente onde cada aluno alcança seu máximo potencial.
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
                    aria-label="Instagram"
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
