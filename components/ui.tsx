import type {ReactNode} from 'react';
export function Arrow(){return <span aria-hidden>↗</span>}
export function CTA(){return <section className="cta section"><div><span className="eyebrow">A CONVERSATION CAN BE THE BEGINNING</span><h2>Better possibilities.<br/>Built together.</h2><p>Let's build a meaningful healthcare partnership.</p></div><a href="/enquiry" className="button light">Enquire Now <Arrow/></a></section>}
export function PageIntro({label,title,children}:{label:string,title:ReactNode,children:ReactNode}){return <section className="page-intro section"><div className="eyebrow">APARNEX / {label}</div><h1>{title}</h1><p>{children}</p></section>}
export function Draft({children='Proposed company positioning · Pending approval'}:{children?:ReactNode}){return <span className="draft">{children}</span>}
