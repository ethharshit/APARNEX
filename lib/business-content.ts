import {z} from 'zod';
export const businessContentSchema=z.object({intro:z.string().trim().min(10).max(600),areas:z.array(z.object({title:z.string().trim().min(2).max(80),description:z.string().trim().max(200)})).max(6),approved:z.boolean()});
export type BusinessContent=z.infer<typeof businessContentSchema>;
export const defaultBusinessContent:BusinessContent={intro:'Tell us about your product enquiry or business requirement. We aim to provide clear information and make the next steps straightforward.',areas:[],approved:true};
