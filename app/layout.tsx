import {FloatingWhatsApp} from '@/components/social-links';
import type {Metadata} from 'next';
import './globals.css';
import {Header,Footer,Intro} from '@/components/shell';
import {site} from '@/lib/content';
export const metadata:Metadata={metadataBase:new URL(site.origin),title:{default:'APARNEX PHARMA LLP | A healthcare-focused future',template:'%s | APARNEX PHARMA LLP'},description:'Meet APARNEX PHARMA LLP and start a conversation about healthcare and business partnerships.',openGraph:{type:'website',siteName:site.name,images:[{url:'/aparnex-logo.jpeg',width:1600,height:800,alt:site.name}]},robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/><Intro/><main id="main">{children}</main><Footer/><FloatingWhatsApp/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:site.name,url:site.origin,logo:site.origin+'/aparnex-logo.jpeg',email:site.email,telephone:site.phoneHref,address:{'@type':'PostalAddress',streetAddress:'SCO 37P, 3rd Floor, Sector 04',addressLocality:'Panchkula',addressRegion:'Haryana',postalCode:'134112',addressCountry:'IN'}})}}/></body></html>}
