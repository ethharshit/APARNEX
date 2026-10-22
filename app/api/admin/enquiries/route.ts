import {isAdmin,runtime,json,sameOrigin,sendNotification} from '@/lib/server';
import {getAdmin} from '@/lib/auth';
import {updateSchema} from '@/lib/validation';
import {enquiryQuery,PAGE_SIZE} from '@/lib/enquiry-query';
import {z} from 'zod';
export async function GET(request:Request){
 if(!await isAdmin())return json({error:'Your session has expired or access is not authorised. Please sign in again.'},401);
 try{
  const {where,args,offset}=enquiryQuery(request),db=runtime().DB;
  const rows=await db.prepare(`SELECT * FROM enquiries ${where} ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?`).bind(...args,PAGE_SIZE,offset).all();
  const count=await db.prepare(`SELECT CAST(COUNT(*) AS INTEGER) AS total FROM enquiries ${where}`).bind(...args).first();
  const summary=await db.prepare('SELECT status,CAST(COUNT(*) AS INTEGER) AS count FROM enquiries GROUP BY status').all();
  return json({rows:rows.results,total:count?.total||0,pageSize:PAGE_SIZE,summary:summary.results,emailConfigured:!!(runtime().RESEND_API_KEY&&runtime().ENQUIRY_FROM_EMAIL&&runtime().ENQUIRY_TO_EMAIL)});
 }catch{return json({error:'Unable to load enquiries. Please try again or contact the website owner.'},503);}
}
export async function PATCH(request:Request){
 const staff=await getAdmin();if(!staff)return json({error:'Staff session required. Sign in again.'},401);
 if(!sameOrigin(request))return json({error:'Request origin not allowed.'},403);
 try{
  const raw=await request.text();if(raw.length>14000)return json({error:'Request too large.'},413);
  const data=updateSchema.safeParse(JSON.parse(raw));if(!data.success)return json({error:'Invalid update.'},400);
  const d=data.data,result=await runtime().DB.prepare('UPDATE enquiries SET status=?,notes=?,updated_at=?,updated_by=? WHERE id=? AND updated_at=? RETURNING *').bind(d.status,d.notes,new Date().toISOString(),staff.email,d.id,d.expectedUpdatedAt).first();
  return result?json({ok:true,row:result}):json({error:'This enquiry changed or no longer exists. Refresh it before saving.'},409);
 }catch{return json({error:'Update failed. Your edits are still on screen; please retry.'},503);}
}
export async function DELETE(request:Request){if(!await isAdmin()||!sameOrigin(request))return json({error:'Not authorised.'},403);try{const p=z.union([z.object({id:z.string().uuid()}),z.object({closedBefore:z.string().regex(/^\d{4}-\d{2}-\d{2}$/)})]).safeParse(await request.json());if(!p.success)return json({error:'Invalid deletion request.'},400);let result;if('id' in p.data){result=await runtime().DB.prepare('DELETE FROM enquiries WHERE id=?').bind(p.data.id).run()}else{if(p.data.closedBefore>new Date().toISOString().slice(0,10))return json({error:'Choose a past date.'},400);result=await runtime().DB.prepare("DELETE FROM enquiries WHERE status='Closed' AND updated_at < ?").bind(p.data.closedBefore).run()}return json({ok:true,deleted:result.meta.changes})}catch{return json({error:'Deletion failed.'},503)}}
export async function POST(request:Request){if(!await isAdmin()||!sameOrigin(request))return json({error:'Not authorised.'},403);try{const p=z.object({id:z.string().uuid()}).safeParse(await request.json());if(!p.success)return json({error:'Invalid enquiry.'},400);const row=await runtime().DB.prepare('SELECT id,email,full_name,subject,notification FROM enquiries WHERE id=?').bind(p.data.id).first<{id:string,email:string,full_name:string,subject:string,notification:string}>();if(!row)return json({error:'Enquiry not found.'},404);if(row.notification==='sent')return json({ok:true,notification:'sent'});const notification=await sendNotification({email:row.email,fullName:row.full_name,subject:row.subject},row.id);await runtime().DB.prepare('UPDATE enquiries SET notification=? WHERE id=?').bind(notification,row.id).run();return json({ok:notification==='sent',notification},notification==='sent'?200:503)}catch{return json({error:'Notification retry failed.'},503)}}
