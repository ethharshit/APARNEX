import {PasswordReset} from '@/components/staff-recovery';
export const metadata={title:'Reset Staff Password',robots:{index:false,follow:false},referrer:'no-referrer' as const};
export default function Reset(){return <section className="section access-panel"><span className="eyebrow">PRIVATE STAFF ACCESS</span><h1>Set a new password.</h1><PasswordReset/></section>}
