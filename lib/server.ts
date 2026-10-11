import {database} from '@/lib/database';
import {getAdmin} from '@/lib/auth';
export function runtime(){return {DB:database,RESEND_API_KEY:process.env.RESEND_API_KEY,ENQUIRY_FROM_EMAIL:process.env.ENQUIRY_FROM_EMAIL,ENQUIRY_TO_EMAIL:process.env.ENQUIRY_TO_EMAIL,SEND_CUSTOMER_CONFIRMATION:process.env.SEND_CUSTOMER_CONFIRMATION}}
export function json(value:unknown,status=200){return Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
export function sameOrigin(request:Request){
 const origin=request.headers.get('origin');
 if(!origin)return false;
 // Use the configured public origin: reverse proxies can reconstruct request.url with an internal host.
 const configured=process.env.APP_ORIGIN||process.env.NEXT_PUBLIC_SITE_URL;
 try{return origin===new URL(configured||request.url).origin}catch{return false}
}
export async function isAdmin(){return !!await getAdmin()}
export async function sendNotification(data:{email:string,fullName:string,subject:string},id:string){const e=runtime();if(!e.RESEND_API_KEY||!e.ENQUIRY_TO_EMAIL||!e.ENQUIRY_FROM_EMAIL)return 'unconfigured';try{const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${e.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`enquiry-staff-${id}`},body:JSON.stringify({from:e.ENQUIRY_FROM_EMAIL,to:[e.ENQUIRY_TO_EMAIL],subject:'New APARNEX business enquiry',text:`A new enquiry has been received. Reference: ${id}. Sign in to your APARNEX staff dashboard to review it.`}),signal:AbortSignal.timeout(8000)});if(!res.ok)return 'failed';if(e.SEND_CUSTOMER_CONFIRMATION==='true'){const confirmation=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${e.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`enquiry-customer-${id}`},body:JSON.stringify({from:e.ENQUIRY_FROM_EMAIL,to:[data.email],subject:'Your enquiry to APARNEX PHARMA LLP',text:`Thank you for contacting APARNEX PHARMA LLP. Your enquiry has been received successfully. Our team will review your message and respond as soon as possible. Reference: ${id}`}),signal:AbortSignal.timeout(8000)});if(!confirmation.ok)return 'customer-failed'}return 'sent'}catch{return 'failed'}}
