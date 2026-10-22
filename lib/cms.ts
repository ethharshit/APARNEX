import {runtime} from '@/lib/server';
import {businessContentSchema,defaultBusinessContent} from '@/lib/business-content';
export async function getBusinessContent(approvedOnly=true){try{const row=await runtime().DB.prepare('SELECT value FROM content_settings WHERE key=?').bind('business').first<{value:string}>();if(row){const data=businessContentSchema.safeParse(JSON.parse(row.value));if(data.success&&(!approvedOnly||data.data.approved))return data.data}}catch{/* Use the finished default copy when content storage is unavailable. */}return defaultBusinessContent}
