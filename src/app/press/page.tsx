export default function PressPage() {
  const Block = ({
    title,
    children,
  }: {
    title: string;
    children: any;
  }) => (
    <section
      style={{
        border: "1px solid rgba(0,0,0,.12)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
      }}
    >
      <div style={{ fontWeight: 1000, marginBottom: 8 }}>{title}</div>
      <div style={{ opacity: 0.9, lineHeight: 1.7 }}>{children}</div>
    </section>
  );

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 1000 }}>
        AXW — One-Pager
      </h1>
      <p style={{ margin: "0 0 18px", opacity: 0.8, lineHeight: 1.6 }}>
        AXW (Access × World) is the coordination layer between access and space:
        policy-defined permissions → time-bounded passes → verification → audit logs.
        Built to integrate without publishing sensitive codes.
      </p>

      <Block title="What it is">
        A programmable access layer for real-world and digital spaces:
        issue time-bounded, scoped passes with rate limits and audit logs.
      </Block>

      <Block title="Why now">
        Spaces are underutilized, operations are messy, and access is often implemented as shared secrets.
        We’re replacing “shared codes” with policy-based access primitives.
      </Block>

      <Block title="Wedge">
        Start with SF pilots (workspaces / venues) and expand into multi-site ops,
        property management, and integrations (controllers, booking, enterprise workflows).
      </Block>

      <Block title="What’s live today">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li><a href="/venues">Venue directory</a> (pilot list + map)</li>
          <li>Venue page → Request access → Pass token</li>
          <li><a href="/verify">Staff verify</a> (validate token)</li>
          <li><a href="/investors/model">Interactive model</a> (scenario sliders)</li>
        </ul>
      </Block>

      <Block title="Business model">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Owner subscription: policies, analytics, verification, integrations</li>
          <li>Optional paid access for non-patrons (venue-configurable)</li>
          <li>Enterprise + multi-site contracts (ops + audit requirements)</li>
        </ul>
      </Block>

      <Block title="The ask">
        Pilot partners + operator intros in SF, and early design partners for integrations.
      </Block>

      <div style={{ marginTop: 18, opacity: 0.8 }}>
        Quick links:{" "}
        <a href="/demo">/demo</a>{" "}
        · <a href="/investors">/investors</a>{" "}
        · <a href="/investors/model">/investors/model</a>{" "}
        · <a href="/onboarding">/onboarding</a>{" "}
        · <a href="/contact">/contact</a>
      </div>
    </main>
  );
}
