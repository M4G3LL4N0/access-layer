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
    </section>
  )
}
