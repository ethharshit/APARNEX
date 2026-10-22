import {RecoveryRequest} from '@/components/staff-recovery';
export const metadata={title:'Staff Password Recovery',robots:{index:false,follow:false}};
export default function Recovery(){return <section className="section access-panel"><span className="eyebrow">PRIVATE STAFF ACCESS</span><h1>Recover your account.</h1><p>Request a password recovery link for your authorised staff account.</p><RecoveryRequest/></section>}
