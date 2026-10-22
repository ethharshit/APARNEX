import {enquirySchema} from '@/lib/validation';
import {runtime,json,sameOrigin,sendNotification} from '@/lib/server';
import {rateLimit} from '@/lib/rate-limit';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Request origin not allowed.'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'JSON required.'},415);
 try{
  const raw=await request.text();if(raw.length>18000)return json({error:'Your submission is too large.'},413);
  let payload;try{payload=JSON.parse(raw);}catch{return json({error:'Invalid request.'},400);}
  const result=enquirySchema.safeParse(payload);if(!result.success)return json({error:'Please check the highlighted fields.',fields:result.error.flatten().fieldErrors},400);
  const d=result.data,db=runtime().DB;
  // A retry of a previously stored UUID succeeds without sending another notification.
  const previous=await db.prepare('SELECT id FROM enquiries WHERE idempotency_key=?').bind(d.idempotencyKey).first<{id:string}>();
  if(previous)return json({ok:true,reference:previous.id},200);
  if(!await rateLimit(request,'enquiry',5,3600000))return json({error:'Too many enquiries. Please try again in an hour.'},429);
  const id=crypto.randomUUID(),now=new Date().toISOString();
  const saved=await db.prepare("INSERT INTO enquiries (id,idempotency_key,full_name,company,email,phone,city,state,country,type,subject,message,product,consent_at,status,notes,notification,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,'New','','unconfigured',?,?) ON CONFLICT(idempotency_key) DO NOTHING RETURNING id").bind(id,d.idempotencyKey,d.fullName,d.company,d.email,d.phone,d.city,d.state,d.country,d.type,d.subject,d.message,d.product,now,now,now).first<{id:string}>();
  const stored=saved||await db.prepare('SELECT id FROM enquiries WHERE idempotency_key=?').bind(d.idempotencyKey).first<{id:string}>();
  if(!stored)return json({error:'We could not confirm storage. Please retry.'},503);
  if(saved){try{const notification=await sendNotification(d,id);await db.prepare('UPDATE enquiries SET notification=? WHERE id=?').bind(notification,id).run();}catch{/* Storage is confirmed; notification retries remain staff-only. */}}
  return json({ok:true,reference:stored.id},201);
 }catch{return json({error:'We could not confirm your submission. Please retry; your enquiry will not be duplicated.'},503);}
}
