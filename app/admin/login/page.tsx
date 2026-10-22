import StaffLogin from '@/components/staff-login';
import {authConfigured} from '@/lib/auth';
export const dynamic='force-dynamic';
export const metadata={title:'Staff Sign In',robots:{index:false,follow:false}};
export default function Login(){return <section className="section access-panel"><span className="eyebrow">APARNEX / STAFF ACCESS</span><h1>Welcome back.</h1><p>Sign in with your authorised company staff account.</p>{authConfigured()?<StaffLogin/>:<p>Staff sign-in is currently unavailable. Please contact the website owner.</p>}</section>}
