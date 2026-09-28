import Link from "next/link";

export const metadata = {
  title: "Customers — AccessXWorld",
  description: "AccessXWorld does not publish a customer roster. This is a pilot brief.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#0d5f46]">Pilot</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#07110f]">No customer roster is published.</h1>
      <p className="mt-4 text-base leading-7 text-[#52615d]">
        AccessXWorld is a pilot brief for signed access: a policy, a pass for one holder, a check at a gate, and a record of the decision. This page is not a list of deployments, logos, or case studies.
      </p>
      <p className="mt-4 text-sm leading-6 text-[#52615d]">
        The homepage illustration shows the fields a pass would carry. It does not issue a live credential.
      </p>
      <Link href="/#access-flow" className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-[#0d5f46] underline-offset-4 hover:underline">
        Read the access flow
      </Link>
    </main>
  );
}
