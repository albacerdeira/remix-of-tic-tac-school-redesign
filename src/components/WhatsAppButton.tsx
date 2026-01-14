import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const buttonHeight = 56; // 14 * 4 = 56px (w-14)
      const minBottom = 24; // 6 * 4 = 24px (bottom-6)

      // If footer is visible in viewport
      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top + minBottom;
        setBottomOffset(Math.max(overlap, minBottom));
      } else {
        setBottomOffset(minBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    if (typeof (window as any).gtagSendContactEvent === 'function') {
      (window as any).gtagSendContactEvent('whatsapp_click');
    }
  };

  return (
    <a
      href="https://api.whatsapp.com/send?phone=5511916396965&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Tic%20Tac%20School!"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      style={{ bottom: `${bottomOffset}px` }}
      className="fixed right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
