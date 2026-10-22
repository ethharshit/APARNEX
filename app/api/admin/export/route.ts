import {isAdmin,runtime,json} from '@/lib/server';
import {csvCell} from '@/lib/validation';
import {enquiryQuery} from '@/lib/enquiry-query';
export async function GET(request:Request){
 if(!await isAdmin())return json({error:'Staff session required. Sign in again.'},401);
 try{
  const {where,args}=enquiryQuery(request),data=await runtime().DB.prepare(`SELECT * FROM enquiries ${where} ORDER BY created_at DESC,id DESC LIMIT 10001`).bind(...args).all();
  if(data.results.length>10000)return json({error:'Export exceeds 10,000 rows. Apply a filter.'},400);
  const columns=['id','created_at','full_name','company','email','phone','city','state','country','type','product','subject','message','status','notes','updated_at','updated_by','consent_at','notification'];
  const csv=[columns.map(csvCell).join(','),...data.results.map(row=>columns.map(column=>csvCell(row[column])).join(','))].join('\r\n');
  return new Response('\uFEFF'+csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="aparnex-enquiries.csv"','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
 }catch{return json({error:'Export failed. Please sign in again or retry.'},503);}
}
