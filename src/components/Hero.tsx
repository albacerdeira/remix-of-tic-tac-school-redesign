import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-primary font-semibold text-sm">Escola de Inglês</p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-foreground">Tic Tac</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">School</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Venha aprender inglês com a gente! Turmas com apenas 4 alunos, jogos, vídeos e dramatizações que ajudam a vivenciar o idioma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => scrollToSection('contato')}
                className="group"
              >
                Não Espere Mais
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('cursos')}
              >
                Nossos Cursos
              </Button>
            </div>
            
            <div className="flex gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold text-primary">4</p>
                <p className="text-sm text-muted-foreground">Alunos por turma</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Metodologia Worlitz</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">3+</p>
                <p className="text-sm text-muted-foreground">Programas</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-float" />
            <img 
              src={heroImage} 
              alt="Alunos felizes aprendendo inglês na Tic Tac School"
              className="relative rounded-3xl shadow-2xl w-full animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
