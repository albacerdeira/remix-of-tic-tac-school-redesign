import { useEffect } from 'react';

export const useAutoCloseLovableBadge = () => {
  useEffect(() => {
    const closeLovableBadge = () => {
      const selectors = [
        'div[data-testid="lovable-banner"] button',
        '.lovable-banner button',
        '[data-lovable-banner] button',
        'div[class*="lovable"] button[aria-label*="close"]',
        'div[class*="banner"] button[aria-label*="close"]',
        'button[aria-label="Close"]',
        'iframe + div button',
        'div[style*="z-index"] button'
      ];
      
      for (const selector of selectors) {
        const closeButton = document.querySelector(selector);
        if (closeButton && closeButton instanceof HTMLElement) {
          closeButton.click();
          return true;
        }
      }
      return false;
    };

    // Tenta fechar imediatamente
    closeLovableBadge();
    
    // Tenta novamente após intervalos
    const timers = [
      setTimeout(closeLovableBadge, 500),
      setTimeout(closeLovableBadge, 1000),
      setTimeout(closeLovableBadge, 2000),
      setTimeout(closeLovableBadge, 3000)
    ];

    // Observa mudanças no DOM para fechar o banner quando aparecer
    const observer = new MutationObserver(() => {
      closeLovableBadge();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      observer.disconnect();
    };
  }, []);
};
