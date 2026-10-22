import {database} from '@/lib/database';
export async function rateLimit(request:Request,scope:string,maximum:number,windowMs:number,identity=''){
 const bucket=Math.floor(Date.now()/windowMs),ip=request.headers.get('x-nf-client-connection-ip')||'unknown';
 const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${scope}:${ip}:${identity}:${bucket}`));
 const key=Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
 const row=await database.prepare('INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=rate_limits.count+1 RETURNING count').bind(key,(bucket+2)*windowMs).first<{count:number}>();
 await database.prepare('DELETE FROM rate_limits WHERE expires_at < ?').bind(Date.now()).run();
 return !!row&&row.count<=maximum;
}
