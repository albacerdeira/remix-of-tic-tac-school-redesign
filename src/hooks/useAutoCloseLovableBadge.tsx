import { useEffect } from 'react';

export const useAutoCloseLovableBadge = () => {
  useEffect(() => {
    const closeLovableBadge = () => {
      const selectors = [
        'div[data-testid="lovable-banner"] button',
        '.lovable-banner button',
        '[data-lovable-banner] button',
        'div[class*="lovable"] button[aria-label*="close"]',
        'div[class*="banner"] button[aria-label*="close"]'
      ];
      
      for (const selector of selectors) {
        const closeButton = document.querySelector(selector);
        if (closeButton && closeButton instanceof HTMLElement) {
          closeButton.click();
          return;
        }
      }
    };

    closeLovableBadge();
    const timer = setTimeout(closeLovableBadge, 1000);
    return () => clearTimeout(timer);
  }, []);
};
