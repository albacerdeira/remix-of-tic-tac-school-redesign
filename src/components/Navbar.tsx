import { Button } from "@/components/ui/button";
import { Menu, Star } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { label: "Início", id: "hero" },
    { label: "Quem Somos", id: "quemsomos" },
    { label: "Cursos", id: "cursos" },
    { label: "O que dizem nossos alunos", id: "avaliacoes" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold"
            >
              <span className="text-primary">Tic Tac</span>
              <span className="text-secondary"> School</span>
            </button>
            
            {/* Google Reviews Badge */}
            <a
              href="https://www.google.com/search?q=Tic+Tac+School&stick=H4sIAAAAAAAA_-NgU1I1qLA0SU4zSbM0SUkyTjGzNDO2MqgwtTBNMzE1sDQwMU1MtjBIXsTKF5KZrBCSmKwQnJyRn58DAHKGQTI6AAAA&hl=pt-BR"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
            >
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-semibold text-primary">5.0</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="hero"
              onClick={() => scrollToSection('contato')}
            >
              Matricule-se
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4">
              <Button 
                variant="hero"
                className="w-full"
                onClick={() => scrollToSection('contato')}
              >
                Matricule-se
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
