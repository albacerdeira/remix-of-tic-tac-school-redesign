import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { trackClick } from "@/hooks/useClickTracking";

const WhatsAppButton = () => {
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const updatePosition = () => {
      
      const windowHeight = window.innerHeight;
      const footer = document.querySelector('footer');
      const cookieBanner = document.getElementById('cookie-banner');

      let base = 24;

      // Always sit above the cookie banner on all screen sizes
      if (cookieBanner) {
        const bannerHeight = cookieBanner.getBoundingClientRect().height;
        base = bannerHeight + 16;
      }

      // If footer is in view, push above it too
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < windowHeight) {
          const footerOverlap = windowHeight - footerRect.top + 16;
          base = Math.max(base, footerOverlap);
        }
      }

      setBottomOffset(base);
    };

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    const interval = setInterval(updatePosition, 500);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      clearInterval(interval);
    };
  }, []);

  const handleWhatsAppClick = () => {
    trackClick('whatsapp_float');
    if (typeof (window as any).gtagSendContactEvent === 'function') {
      (window as any).gtagSendContactEvent('whatsapp_click');
    }
    
    const whatsappNumber = "5511916396965";
    const message = encodeURIComponent("Quero me matricular");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    if (typeof (window as any).gtagReportConversionContact1 === 'function') {
      (window as any).gtagReportConversionContact1(whatsappUrl);
    }
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      style={{ bottom: `${bottomOffset}px` }}

      className="fixed right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 md:bottom-6"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
};

export default WhatsAppButton;
