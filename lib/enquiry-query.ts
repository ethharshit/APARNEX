import {statuses} from '@/lib/validation';
export const PAGE_SIZE=50;
export function enquiryQuery(request:Request){
 const url=new URL(request.url),q=(url.searchParams.get('q')||'').trim().slice(0,100);
 const raw=url.searchParams.get('status')||'';const status=statuses.includes(raw as typeof statuses[number])?raw:'';
 const offset=Math.min(10000000,Math.max(0,Number.parseInt(url.searchParams.get('offset')||'0',10)||0));
 const where="WHERE (? = '' OR status=?) AND (full_name ILIKE ? OR email ILIKE ? OR phone ILIKE ? OR product ILIKE ? OR subject ILIKE ? OR company ILIKE ?)";
 return {where,args:[status,status,...Array(6).fill('%'+q+'%')],offset};
}
