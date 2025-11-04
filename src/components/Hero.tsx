import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import logoImage from "@/assets/logo-tic-tac.png";
const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-hero">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Location bar */}
      <div className="w-full bg-primary/10 backdrop-blur-sm py-3 px-4 relative z-20 animate-fade-in">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span className="text-foreground font-medium text-[0.7rem] md:text-xs">Rua Bahia, 362 - Itu, SP - CEP: 13301-430</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2 md:py-6 relative z-10 flex-1 flex items-center">
        <div className="w-full">
          {/* Logo and Title Section - Centered on mobile */}
          <div className="flex flex-col items-center text-center mb-8 md:mb-12 space-y-4 md:space-y-6 animate-slide-in">
            <div className="relative w-full max-w-[200px] md:max-w-[280px] mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 animate-float" />
              <img src={logoImage} alt="Logo Tic Tac School - By Teacher Gleice" className="relative w-full h-auto rounded-2xl shadow-2xl animate-fade-in" />
            </div>
            
            
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl">
              <span className="text-foreground">Transforme seu</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Futuro com Inglês</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl px-4">
              Aprenda inglês de verdade! Turmas exclusivas com apenas 4 alunos, metodologia Worlitz, tecnologia de ponta e um ambiente que torna o aprendizado natural e divertido. Sua fluência começa aqui!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12 px-4">
            <Button variant="hero" size="lg" onClick={() => scrollToSection('contato')} className="group w-full sm:w-auto">
              Não Espere Mais
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection('cursos')} className="w-full sm:w-auto">
              Nossos Cursos
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-4">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">4</p>
              <p className="text-xs md:text-sm text-muted-foreground">Alunos por turma</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
              <p className="text-xs md:text-sm text-muted-foreground">Metodologia Worlitz</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">3+</p>
              <p className="text-xs md:text-sm text-muted-foreground">Programas</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;