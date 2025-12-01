import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-foreground/95 backdrop-blur-sm border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-background/90 text-sm text-center sm:text-left">
          Utilizamos cookies para melhorar sua experiência e analisar nosso
          tráfego. Ao continuar navegando, você concorda com nossa{" "}
          <Link
            to="/politica-de-privacidade"
            className="text-secondary underline hover:text-secondary-light transition-colors"
          >
            política de privacidade
          </Link>
          .
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/politica-de-privacidade"
            className="text-background/70 text-sm hover:text-background transition-colors whitespace-nowrap"
          >
            Ler Política de Privacidade
          </Link>
          <Button
            onClick={handleAccept}
            className="bg-secondary text-secondary-foreground hover:bg-secondary-light whitespace-nowrap"
          >
            Aceitar e Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
