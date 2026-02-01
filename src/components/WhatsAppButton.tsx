import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { trackClick } from "@/hooks/useClickTracking";

const WhatsAppButton = () => {
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const minBottom = 24;

      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top + minBottom;
        setBottomOffset(Math.max(overlap, minBottom));
      } else {
        setBottomOffset(minBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    trackClick('whatsapp');
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
      className="fixed right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
};

export default WhatsAppButton;
