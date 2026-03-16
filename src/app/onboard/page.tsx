"use client";

import { useState } from "react";
import MarketingShell from "@/components/MarketingShell";

export default function Onboard(){

const [venue,setVenue]=useState("")
const [city,setCity]=useState("")
const [status,setStatus]=useState("")

async function createVenue(e:any){

e.preventDefault()

const res=await fetch("/api/venues/create",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify({name:venue,city})
})

const json=await res.json()

if(json.ok){
setStatus("Venue created")
}else{
setStatus("Error")
}

}

return(

<MarketingShell>

<h1 style={{fontSize:46,fontWeight:900}}>Create Venue</h1>

<form onSubmit={createVenue}
style={{marginTop:20,display:"grid",gap:12,maxWidth:400}}>

<input
placeholder="Venue Name"
value={venue}
onChange={e=>setVenue(e.target.value)}
/>

<input
placeholder="City"
value={city}
onChange={e=>setCity(e.target.value)}
/>

<button
style={{
background:"black",
color:"white",
padding:10,
borderRadius:999
}}
>
Create Venue
</button>

</form>

<p style={{marginTop:12}}>{status}</p>

</MarketingShell>

)

}
