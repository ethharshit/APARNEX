import {site} from '@/lib/content';
export default function sitemap(){return ['','/about','/our-people','/contact','/enquiry','/privacy'].map(path=>({url:site.origin+path,lastModified:new Date('2026-10-11')}))}
