import {Pool} from 'pg';
let pool:Pool|undefined;
export function getPool(){if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL is not configured');return pool??=new Pool({connectionString:process.env.DATABASE_URL,max:2,idleTimeoutMillis:10000,connectionTimeoutMillis:8000})}
// All statements are internal constant SQL; user values are always bound parameters.
export const database={prepare(sql:string){let values:unknown[]=[];let index=0;const query=sql.replace(/\?/g,()=>'$'+(++index));return {bind(...args:unknown[]){values=args;return this},async first<T=Record<string,unknown>>():Promise<T|null>{return (await getPool().query(query,values)).rows[0] as T||null},async all(){return {results:(await getPool().query(query,values)).rows as Record<string,unknown>[]}},async run(){const r=await getPool().query(query,values);return {meta:{changes:r.rowCount||0}}}}}};
