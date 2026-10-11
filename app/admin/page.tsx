import {redirect} from 'next/navigation';
import {getAdmin} from '@/lib/auth';
import AdminDashboard from '@/components/admin-dashboard';
import StaffLogout from '@/components/staff-logout';
export const dynamic='force-dynamic';
export const metadata={title:'Staff Access',robots:{index:false,follow:false}};
export default async function Admin(){if(!await getAdmin())redirect('/admin/login');return <section className="section admin-page"><span className="eyebrow">APARNEX / PRIVATE WORKSPACE</span><h1>Enquiry management.</h1><StaffLogout/><AdminDashboard/></section>}
