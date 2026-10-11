import {runtime} from '@/lib/server';
import {businessContentSchema,defaultBusinessContent} from '@/lib/business-content';
export async function getBusinessContent(){try{const row=await runtime().DB.prepare('SELECT value FROM content_settings WHERE key=?').bind('business').first<{value:string}>();if(row){const data=businessContentSchema.safeParse(JSON.parse(row.value));if(data.success)return data.data}}catch{}return defaultBusinessContent}
