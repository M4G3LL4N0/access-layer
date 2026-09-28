export function ProcessFlowSection() {
  const steps = [
    {
      title: "Define the policy",
      body: "Who may enter, which gate, which window, and what ends the grant.",
    },
    {
      title: "Issue a signed pass",
      body: "A credential for a person or vehicle. Not a code the whole line can share.",
    },
    {
      title: "Check it at the edge",
      body: "The door, lot, or kiosk accepts or refuses from the policy, then records the scan.",
    },
    {
      title: "Keep the proof",
      body: "The grant, denial, and revocation stay as an event trail the operator can show.",
    },
  ]
  return (
    <section id="access-flow" aria-label="Access decision flow" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#0d5f46]">The decision, not a demo label</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[#07110f]">
        A pass moves through four checks.
      </h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-[#07110f]/10 bg-[#f6f4ef] p-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1f7a5b] text-sm font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="mt-4 font-medium text-[#07110f]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#52615d]">{step.body}</p>
          </li>
        ))}
      </ol>
      <aside className="mt-8 rounded-2xl border border-dashed border-[#07110f]/20 bg-white p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#52615d]">Illustration · not a live credential</p>
        <h3 className="mt-2 text-lg font-semibold text-[#07110f]">What a pass would carry</h3>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-[#07110f]">Holder</dt>
            <dd className="mt-1 text-[#52615d]">A person or a vehicle. Not a code the whole line can share.</dd>
          </div>
          <div>
            <dt className="font-medium text-[#07110f]">Gate</dt>
            <dd className="mt-1 text-[#52615d]">One door, lot, or kiosk named by the policy.</dd>
          </div>
          <div>
            <dt className="font-medium text-[#07110f]">Window</dt>
            <dd className="mt-1 text-[#52615d]">When the grant starts and when it ends.</dd>
          </div>
          <div>
            <dt className="font-medium text-[#07110f]">Decision</dt>
            <dd className="mt-1 text-[#52615d]">Accept, refuse, or revoke, kept as an event.</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-6 text-[#52615d]">
          This page does not sign, issue, or check a credential. There is no published customer roster and no operating metric behind the sequence.
        </p>
      </aside>
    </section>
  )
}
