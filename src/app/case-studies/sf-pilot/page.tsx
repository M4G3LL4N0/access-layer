import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function SfPilotCaseStudyPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>
        CASE STUDY
      </div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        SF Pilot
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 920 }}>
        The pilot is about proving operational impact: faster entry, fewer disputes,
        and clean audit trails across real access points.
      </p>

      <div style={{
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 12
      }}>

        <Card
          title="Operational problem"
          body="Shared codes, manual verification, and weak audit proof."
        />

        <Card
          title="AXW intervention"
          body="Policy-driven tokens and edge verification."
        />

        <Card
          title="Outcome"
          body="Cleaner entry flows, lower dispute risk, stronger accountability."
        />

        <Card
          title="Expansion logic"
          body="Once one venue proves ROI, expansion becomes software deployment."
        />

      </div>

    </MarketingShell>
  );
}

function Card({title,body}:{title:string,body:string}) {
  return (
    <div style={{
      border:"1px solid #eee",
      borderRadius:16,
      padding:14,
      background:"white"
    }}>
      <div style={{fontWeight:950,fontSize:15}}>
        {title}
      </div>

      <div style={{marginTop:8,color:"#666",fontSize:13,lineHeight:1.55}}>
        {body}
      </div>
    </div>
  )
}
