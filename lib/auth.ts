import {cookies} from 'next/headers';
export const SESSION_COOKIE='aparnex_staff_session';
export function authConfigured(){return !!(process.env.SUPABASE_URL&&process.env.SUPABASE_ANON_KEY&&process.env.ADMIN_EMAILS)}
export function allowedEmail(email:string){return (process.env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase())}
export async function getAdmin(){if(!authConfigured())return null;const token=(await cookies()).get(SESSION_COOKIE)?.value;if(!token)return null;try{const r=await fetch(process.env.SUPABASE_URL+'/auth/v1/user',{headers:{apikey:process.env.SUPABASE_ANON_KEY!,Authorization:'Bearer '+token},cache:'no-store',signal:AbortSignal.timeout(8000)});if(!r.ok)return null;const user=await r.json() as {email?:string};return user.email&&allowedEmail(user.email)?{email:user.email}:null}catch{return null}}
