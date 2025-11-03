import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5511947764601&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Tic%20Tac%20School!&fbclid=PAZXh0bgNhZW0CMTEAAafGEX7-YArYHbW8wG9Si6thlXsT5RWyMEg88b0A5DD_WOsM09o_wczTFHyPJg_aem_4JbIRU39JdZAPFcPU98nrw"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
