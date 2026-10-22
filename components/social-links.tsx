"use client";
import {useEffect, useState} from 'react';
import {instagramUrl, linkedInUrl, whatsappUrl} from '@/lib/social';

export function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.59 5.96L.03 24l6.28-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.43-8.42ZM12.04 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98 1-3.64-.23-.38a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.82 9.82 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.46-4.44 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/></svg>;
}
function InstagramIcon() { return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>; }
export function SocialLinks() {
  return <div className="social-links">
    <a className="social-action whatsapp-contact" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp at +91 7700022235 (opens in a new tab)"><WhatsAppIcon/><span className="social-copy"><span>Chat on WhatsApp</span><span className="social-number">+91 7700022235</span></span></a>
    <a className="social-action" href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="APARNEX PHARMA on Instagram (opens in a new tab)"><InstagramIcon/><span>Instagram <span aria-hidden="true">↗</span></span></a>
    {linkedInUrl && <a className="social-action" href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="APARNEX PHARMA on LinkedIn (opens in a new tab)"><span className="social-monogram" aria-hidden="true">in</span><span>LinkedIn ↗</span></a>}
    <a className="social-action" href="/enquiry"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg><span>Connect with us <span aria-hidden="true">↗</span></span></a>
  </div>;
}
export function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const update = () => setHidden(!!document.querySelector('.header nav.open, dialog[open], [aria-modal="true"]') || !!document.activeElement?.matches('input,textarea,select'));
    const observer = new MutationObserver(update);
    observer.observe(document.body, {subtree: true, attributes: true, attributeFilter: ['class', 'open', 'aria-modal']});
    document.addEventListener('focusin', update); document.addEventListener('focusout', update); update();
    return () => {observer.disconnect(); document.removeEventListener('focusin', update); document.removeEventListener('focusout', update);};
  }, []);
  return <a className="floating-whatsapp" hidden={hidden} href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with APARNEX PHARMA on WhatsApp (opens in a new tab)"><WhatsAppIcon/></a>;
}
