import { supabase } from "@/integrations/supabase/client";

export type LinkType = 
  | 'whatsapp_float' 
  | 'whatsapp_form' 
  | 'whatsapp_chat_form'
  | 'phone' 
  | 'email' 
  | 'location' 
  | 'instagram' 
  | 'facebook'
  | 'matricula_navbar'
  | 'matricula_hero'
  | 'matricula_curso'
  | 'form_contact'
  | 'form_enrollment';

export const trackClick = async (linkType: LinkType) => {
  try {
    await supabase.from('contact_clicks').insert({
      link_type: linkType,
      page_url: window.location.pathname,
      user_agent: navigator.userAgent,
    });
  } catch (error) {
    // Silently fail - don't interrupt user experience
    if (import.meta.env.DEV) {
      console.error('Error tracking click:', error);
    }
  }
};

export const useClickTracking = () => {
  return { trackClick };
};
