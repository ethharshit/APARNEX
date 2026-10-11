import {cookies} from 'next/headers';
import {SESSION_COOKIE} from '@/lib/auth';
import {json,sameOrigin} from '@/lib/server';
export async function POST(request:Request){if(!sameOrigin(request))return json({error:'Not allowed.'},403);const jar=await cookies();const token=jar.get(SESSION_COOKIE)?.value;jar.delete(SESSION_COOKIE);if(token&&process.env.SUPABASE_URL&&process.env.SUPABASE_ANON_KEY){try{await fetch(process.env.SUPABASE_URL+'/auth/v1/logout',{method:'POST',headers:{apikey:process.env.SUPABASE_ANON_KEY,Authorization:'Bearer '+token},signal:AbortSignal.timeout(5000)})}catch{}}return json({ok:true})}
