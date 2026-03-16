"use client";

import React,{useState} from "react";

export default function CreateCredential({venues}:{venues:any[]}){

const [venue,setVenue]=useState(venues[0]?.id)
const [user,setUser]=useState("")
const [token,setToken]=useState("")

async function submit(e:any){

e.preventDefault()

const cred=await fetch("/api/credentials/create",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify({venueId:venue,externalUserId:user})
})

const credJson=await cred.json()

const issue=await fetch("/api/issue",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify({credentialId:credJson.credential.id,venueId:venue})
})

const issueJson=await issue.json()

setToken(issueJson.token)

}

return(

<div style={{border:"1px solid #eee",borderRadius:18,padding:16,background:"white"}}>

<div style={{fontWeight:900}}>Create credential + issue token</div>

<form onSubmit={submit} style={{display:"grid",gap:12,marginTop:12}}>

<select value={venue} onChange={e=>setVenue(e.target.value)}>
{venues.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}
</select>

<input
value={user}
onChange={e=>setUser(e.target.value)}
placeholder="external user id"
/>

<button style={{background:"black",color:"white",padding:10,borderRadius:999}}>
Create + Issue
</button>

</form>

{token && (
<div style={{marginTop:12,fontSize:12,wordBreak:"break-all"}}>
{token}
</div>
)}

</div>

)

}
