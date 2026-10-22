import type {ReactNode} from 'react';
import {Icon} from '@/components/icons';
import {whatsappUrl} from '@/lib/social';
export function Arrow(){return <Icon name="arrow"/>}
export function CTA(){return <section className="cta section"><div><span className="eyebrow">LET’S CONNECT</span><h2>Let’s explore how we can work together.</h2><p>Have a product enquiry or business requirement? Connect with APARNEX PHARMA LLP to discuss your needs.</p></div><div className="cta-actions"><a href="/enquiry" className="button">Send an Enquiry <Arrow/></a><a href={whatsappUrl()} className="button light" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <Arrow/></a></div></section>}
export function PageIntro({label,title,children}:{label:string,title:ReactNode,children:ReactNode}){return <section className="page-intro section"><div className="eyebrow">APARNEX / {label}</div><h1>{title}</h1><p>{children}</p></section>}
