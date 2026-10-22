"use client";
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {SocialLinks} from '@/components/social-links';
import {BrandLogo} from '@/components/brand-logo';
import {nav,site} from '@/lib/content';

export function Header() {
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const header=useRef<HTMLElement>(null);
  useEffect(()=>setOpen(false),[pathname]);
  useEffect(()=>{
    if(!open)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);document.getElementById('menu-toggle')?.focus();}};
    const outside=(event:PointerEvent)=>{if(!header.current?.contains(event.target as Node))setOpen(false);};
    const resize=()=>{if(window.innerWidth>1000)setOpen(false);};
    document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);window.addEventListener('resize',resize);
    return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',resize);};
  },[open]);
  return <header className="header" ref={header}><a href="/" className="logo" aria-label="APARNEX PHARMA LLP home"><BrandLogo priority/></a><button id="menu-toggle" className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'Close ×':'Menu ☰'}</button><nav id="navigation" aria-label="Main navigation" className={open?'open':''} onClick={()=>setOpen(false)} onBlur={event=>{if(!header.current?.contains(event.relatedTarget as Node))setOpen(false);}}>{nav.map(([name,url])=><a key={url} href={url} aria-current={pathname===url?'page':undefined} className={name==='Enquiry'?'nav-cta':''}>{name}{name==='Enquiry'&&<span aria-hidden="true">↗</span>}</a>)}</nav></header>;
}
export function Intro() {
  const [show,setShow]=useState(false);
  useEffect(()=>{
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    try {if(!sessionStorage.getItem('aparnex-intro')&&!motion.matches){setShow(true);sessionStorage.setItem('aparnex-intro','1');}}catch{}
    const dismiss=()=>setShow(false);
    const timer=window.setTimeout(dismiss,2000);
    document.addEventListener('pointerdown',dismiss,{once:true});document.addEventListener('keydown',dismiss,{once:true});motion.addEventListener('change',dismiss);
    return()=>{clearTimeout(timer);document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',dismiss);motion.removeEventListener('change',dismiss);};
  },[]);
  return show?<div className="intro" aria-hidden="true" onAnimationEnd={event=>{if(event.target===event.currentTarget)setShow(false);}}><div className="intro-card"><BrandLogo priority/></div><p>APARNEX PHARMA LLP</p></div>:null;
}
export function Footer(){return <footer><div className="footer-top"><div><a className="logo footer-logo" href="/" aria-label="APARNEX PHARMA LLP home"><BrandLogo/></a><p>A considered approach.<br/>A healthcare-focused future.</p></div><div><span className="eyebrow">EXPLORE</span>{nav.map(([name,url])=><a key={url} href={url}>{name}</a>)}</div><div><span className="eyebrow">START A CONVERSATION</span><address className="footer-contact"><p>{site.address}</p><a href={'tel:'+site.phoneHref}>{site.phone}</a><a href={'mailto:'+site.email}>{site.email}</a></address><SocialLinks/></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} APARNEX PHARMA LLP</span><span><a href="/privacy">Privacy & information</a><a href="/admin">Staff access ↗</a></span></div><p className="draft-note">Company positioning is draft content pending approval. Business activities and people profiles will be published when confirmed. No medical advice is provided.</p></footer>}
