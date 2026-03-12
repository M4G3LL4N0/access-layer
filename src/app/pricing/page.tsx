import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function PricingPage() {
  return (
    <MarketingShell>
      <h1 style={{fontSize:48,fontWeight:950,letterSpacing:-1.2}}>Pricing</h1>

      <p style={{color:"#444",maxWidth:780}}>
        Owner controls + analytics + compliance-grade logs.
        This is the monetization layer for Access ↔ Space.
      </p>

      <div style={{display:"flex",gap:12,marginTop:12}}>
        <Button href="/demo">Demo</Button>
        <Button href="/investors">Investors</Button>
        <Button href="/directory">Directory</Button>
      </div>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
        gap:20,
        marginTop:30
      }}>

        <Card
          title="Starter"
          price="$49/mo"
          bullets={[
            "Rules: hours, cooldown, daily limits",
            "Basic analytics: requests & passes",
            "Signage QR + staff verify flow",
            "Single venue"
          ]}
          button="Start Starter"
        />

        <Card
          title="Pro"
          price="$199/mo"
          bullets={[
            "Everything in Starter",
            "Multi-venue & staff roles",
            "Audit logs + export",
            "Owner onboarding & invites"
          ]}
          button="Start Pro"
        />

        <Card
          title="Enterprise"
          price="Custom"
          bullets={[
            "SSO / SAML",
            "Compliance & SLA",
            "Custom integrations",
            "Fleet rollout / chain deployments"
          ]}
          button="Talk to us"
        />

      </div>

      <div style={{
        marginTop:30,
        borderRadius:20,
        padding:24,
        background:"#0b0b14",
        color:"#fff"
      }}>
        <h2 style={{fontSize:24,fontWeight:900}}>What you're buying</h2>

        <p style={{color:"#ddd",marginTop:8}}>
          A neutral access layer: rule engine + issuance + verification + logs + analytics.
          Long-term this becomes infrastructure for multi-category access networks
          (public + private spaces).
        </p>

        <div style={{display:"flex",gap:12,marginTop:14}}>
          <Button href="/verifier">Verifier</Button>
          <Button href="/metrics">Metrics</Button>
          <Button href="/case-studies/sf-pilot">SF Report</Button>
        </div>
      </div>

    </MarketingShell>
  )
}

function Card({title,price,bullets,button}:{title:string,price:string,bullets:string[],button:string}){

return(

<div style={{
background:"#0b0b14",
borderRadius:20,
padding:24,
color:"#fff"
}}>

<div style={{fontWeight:900,fontSize:20}}>
{title}
</div>

<div style={{fontSize:36,fontWeight:900,marginTop:8}}>
{price}
</div>

<ul style={{marginTop:16,lineHeight:1.7,color:"#ddd"}}>
{bullets.map((b,i)=>(
<li key={i}>{b}</li>
))}
</ul>

<button style={{
marginTop:18,
width:"100%",
padding:"12px 14px",
borderRadius:999,
border:"1px solid #333",
background:"#000",
color:"#fff",
fontWeight:900
}}>
{button}
</button>

</div>

)

}

function Button({href,children}:{href:string,children:React.ReactNode}){

return(

<a
href={href}
style={{
padding:"10px 14px",
borderRadius:999,
background:"#000",
color:"#fff",
fontWeight:900,
textDecoration:"none"
}}
>
{children}
</a>

)

}
