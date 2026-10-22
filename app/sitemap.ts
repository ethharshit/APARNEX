import {site} from '@/lib/content';
export default function sitemap(){return ['','/about','/our-people','/contact','/enquiry','/privacy'].map(path=>({url:site.origin+path}))}
