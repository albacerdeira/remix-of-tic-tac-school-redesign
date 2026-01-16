import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoTicTac from "@/assets/logo-tic-tac.png";

const ThankYou = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <Link to="/" className="inline-block mb-4">
          <img 
            src={logoTicTac} 
            alt="Tic Tac Idiomas" 
            className="h-16 mx-auto"
          />
        </Link>
        
        <div className="bg-card rounded-2xl shadow-xl p-8 space-y-6 border">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Obrigado pelo seu contato!
          </h1>
          
          <p className="text-muted-foreground">
            Recebemos sua mensagem e entraremos em contato em breve. 
            Nossa equipe está ansiosa para ajudá-lo(a) a começar sua jornada no aprendizado de idiomas!
          </p>
          
          <div className="pt-4">
            <Button asChild className="w-full">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao site
              </Link>
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Dúvidas? Entre em contato pelo WhatsApp: (11) 91639-6965
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
