import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { trackClick } from "@/hooks/useClickTracking";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Tic Tac <span className="text-secondary">School</span>
            </h3>
            <p className="text-primary-foreground/80">
              Escola de inglês com turmas pequenas e metodologia diferenciada.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('quemsomos')}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Quem Somos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('cursos')}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Nossos Cursos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Contato
                </button>
              </li>
              <li>
                <Link 
                  to="/politica-de-privacidade"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/tic.tac_school/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors"
                aria-label="Instagram"
                onClick={() => trackClick('instagram')}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/tictacbygleice"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors"
                aria-label="Facebook"
                onClick={() => trackClick('facebook')}
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Tic Tac School. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
