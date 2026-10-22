export const instagramUrl = 'https://www.instagram.com/aparnexpharma/';
// Add the confirmed company LinkedIn URL here. Hidden until valid.
const configuredLinkedInUrl: string = '';
export const linkedInUrl = (() => { try { const u = new URL(configuredLinkedInUrl); return u.protocol === 'https:' && (u.hostname === 'www.linkedin.com' || u.hostname === 'linkedin.com') && u.pathname.startsWith('/company/') && u.pathname.length > 9 ? u.href : null; } catch { return null; } })();
export function whatsappUrl(product?: string) { return 'https://wa.me/917700022235?text=' + encodeURIComponent(product ? `Hello APARNEX PHARMA, I would like to enquire about ${product}. Please share availability and details.` : 'Hello APARNEX PHARMA, I would like to enquire about your products and services'); }
