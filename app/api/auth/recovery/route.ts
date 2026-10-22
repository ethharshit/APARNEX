import {allowedEmail,authConfigured} from '@/lib/auth';
import {json,sameOrigin} from '@/lib/server';
import {rateLimit} from '@/lib/rate-limit';
import {z} from 'zod';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Request origin not allowed.'},403);
 if(!authConfigured())return json({error:'Recovery is unavailable. Please contact the website owner.'},503);
 try{
  const raw=await request.text();if(raw.length>1000)return json({error:'Invalid request.'},400);
  const data=z.object({email:z.string().trim().email().max(254)}).safeParse(JSON.parse(raw));if(!data.success)return json({error:'Enter a valid email address.'},400);
  if(!await rateLimit(request,'recovery',3,900000))return json({error:'Too many requests. Please try again later.'},429);
  const origin=new URL(process.env.APP_ORIGIN||process.env.NEXT_PUBLIC_SITE_URL!).origin;
  if(allowedEmail(data.data.email)){
   try{await fetch(process.env.SUPABASE_URL+'/auth/v1/recover?redirect_to='+encodeURIComponent(origin+'/admin/reset-password'),{method:'POST',headers:{apikey:process.env.SUPABASE_ANON_KEY!,'Content-Type':'application/json'},body:JSON.stringify({email:data.data.email}),signal:AbortSignal.timeout(8000)});}catch{/* Same response prevents account enumeration. */}
  }
  return json({message:'If this address belongs to an authorised staff account and recovery is available, you will receive a reset link.'},202);
 }catch{return json({error:'Recovery is unavailable. Please try again later.'},503);}
}
