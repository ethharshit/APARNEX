import {site} from '@/lib/content';
export default function robots(){return {rules:{userAgent:'*',...(process.env.SITE_INDEXABLE==='true'?{allow:'/',disallow:['/admin','/api/']}:{disallow:'/'})},sitemap:site.origin+'/sitemap.xml'}}
