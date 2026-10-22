"use client";
import {useState} from 'react';
import {Icon} from '@/components/icons';
export default function StaffLogout(){const [error,setError]=useState(''),[busy,setBusy]=useState(false);return <div><button className="text-link" disabled={busy} onClick={async()=>{setBusy(true);try{const response=await fetch('/api/auth/logout',{method:'POST'});if(!response.ok)throw new Error();location.assign('/admin/login');}catch{setError('Sign-out was not confirmed. Please retry.');setBusy(false);}}}>{busy?'Signing out…':'Sign out'} <Icon name="arrow"/></button>{error&&<p role="alert">{error}</p>}</div>}
