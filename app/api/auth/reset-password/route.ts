import {adminFromToken} from '@/lib/auth';
import {json,sameOrigin} from '@/lib/server';
import {rateLimit} from '@/lib/rate-limit';
import {z} from 'zod';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Request origin not allowed.'},403);
 try{
  const raw=await request.text();if(raw.length>6000)return json({error:'Invalid request.'},400);
  const data=z.object({accessToken:z.string().min(20).max(5000),password:z.string().min(12).max(256)}).safeParse(JSON.parse(raw));if(!data.success)return json({error:'Use the recovery link and a password of at least 12 characters.'},400);
  if(!await adminFromToken(data.data.accessToken))return json({error:'This recovery session is expired or not authorised. Request a new link.'},401);
  if(!await rateLimit(request,'password-update',6,900000))return json({error:'Too many attempts. Please try again later.'},429);
  const response=await fetch(process.env.SUPABASE_URL+'/auth/v1/user',{method:'PUT',headers:{apikey:process.env.SUPABASE_ANON_KEY!,Authorization:'Bearer '+data.data.accessToken,'Content-Type':'application/json'},body:JSON.stringify({password:data.data.password}),signal:AbortSignal.timeout(8000)});
  if(!response.ok)return json({error:'Password update was not confirmed. Request a new link or contact the website owner.'},400);
  return json({ok:true});
 }catch{return json({error:'Password update is unavailable. Please try again.'},503);}
}
