import {Pool} from 'pg';
import {readFile,readdir} from 'node:fs/promises';
if(!process.env.DATABASE_URL)throw new Error('Set DATABASE_URL before running migrations.');
const pool=new Pool({connectionString:process.env.DATABASE_URL,max:1});
const c=await pool.connect();
try{await c.query('BEGIN');await c.query('SELECT pg_advisory_xact_lock(1700022235)');await c.query('CREATE TABLE IF NOT EXISTS aparnex_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');for(const file of (await readdir(new URL('../database/migrations/',import.meta.url))).filter(x=>x.endsWith('.sql')).sort()){const r=await c.query('SELECT name FROM aparnex_migrations WHERE name=$1',[file]);if(r.rows.length)continue;await c.query(await readFile(new URL('../database/migrations/'+file,import.meta.url),'utf8'));await c.query('INSERT INTO aparnex_migrations (name) VALUES ($1)',[file]);console.log('Applied '+file)}await c.query('COMMIT')}catch(e){await c.query('ROLLBACK');throw e}finally{c.release();await pool.end()}
