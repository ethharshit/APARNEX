'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {BrandLogo} from '@/components/brand-logo';
import {Icon} from '@/components/icons';
import {WhatsAppIcon} from '@/components/social-links';
import {whatsappUrl} from '@/lib/social';
export default function WhatsAppHelp(){
 const path=usePathname(); const staff=path==='/admin'||path.startsWith('/admin/');
 const [open,setOpen]=useState(false),[blocked,setBlocked]=useState(false);
 const root=useRef<HTMLDivElement>(null),toggle=useRef<HTMLButtonElement>(null),close=useRef<HTMLButtonElement>(null);
 function dismiss(restore=false){setOpen(false);if(restore)toggle.current?.focus();}
 useEffect(()=>{setOpen(false);},[path]);
 useEffect(()=>{
  let width=56,frame=0;
  const update=()=>{
   const element=root.current;if(!element)return;
   const box=element.getBoundingClientRect();if(box.width)width=box.width;
   const style=getComputedStyle(element),right=Number.parseFloat(style.right)||22,bottom=Number.parseFloat(style.bottom)||22;
   const corner={left:innerWidth-right-width,right:innerWidth-right,top:innerHeight-bottom-56,bottom:innerHeight-bottom};
   const collision=Array.from(document.querySelectorAll('main button,main input,main textarea,main select,main a.button,footer a')).some(control=>{const rect=control.getBoundingClientRect();return rect.width>0&&rect.height>0&&rect.left<corner.right&&rect.right>corner.left&&rect.top<corner.bottom&&rect.bottom>corner.top;});
   const busy=collision||!!document.querySelector('.header nav.open,dialog[open],[aria-modal="true"]')||(!element.contains(document.activeElement)&&!!document.activeElement?.matches('input,textarea,select'));
   setBlocked(busy);if(busy)setOpen(false);
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);};
  const focus=()=>queueMicrotask(update),observer=new MutationObserver(update);
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class','open','aria-modal']});document.addEventListener('focusin',focus);document.addEventListener('focusout',focus);window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);update();
  return()=>{observer.disconnect();cancelAnimationFrame(frame);document.removeEventListener('focusin',focus);document.removeEventListener('focusout',focus);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.visualViewport?.removeEventListener('resize',schedule);};
 },[]);
 useEffect(()=>{if(!open)return;close.current?.focus();const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.preventDefault();dismiss(true);}};const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))dismiss();};document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};},[open]);
 if(staff)return null;
 return <div ref={root} className="whatsapp-widget" hidden={blocked}>
  {open&&<section id="whatsapp-help-panel" className="whatsapp-panel" role="dialog" aria-modal="false" aria-labelledby="whatsapp-help-title"><div className="whatsapp-panel-top"><BrandLogo/><button ref={close} className="icon-button" type="button" aria-label="Close help panel" onClick={()=>dismiss(true)}><Icon name="close"/></button></div><p className="eyebrow">APARNEX PHARMA LLP</p><h2 id="whatsapp-help-title">How can we help you?</h2><p>Hello! Have a product enquiry or want to connect with our team? Start a conversation with us on WhatsApp.</p><a className="button whatsapp-chat" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> Chat on WhatsApp</a><a className="whatsapp-number" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +91 7700022235 (opens in a new tab)">+91 7700022235</a><p className="small">Opens WhatsApp to message our team.</p></section>}
  <button className="floating-whatsapp" type="button" ref={toggle} aria-expanded={open} aria-controls="whatsapp-help-panel" aria-label={open?'Close WhatsApp help':'Open WhatsApp help'} onClick={()=>setOpen(!open)}><span className="whatsapp-label">How can we help you?</span><span className="whatsapp-toggle-icon">{open?<Icon name="close"/>:<WhatsAppIcon/>}</span></button>
 </div>;
}
