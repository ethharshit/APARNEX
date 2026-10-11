'use client';
export default function StaffLogout(){return <button className="text-link" onClick={async()=>{const r=await fetch('/api/auth/logout',{method:'POST'});if(r.ok)location.assign('/admin/login')}}>Sign out ↗</button>}
