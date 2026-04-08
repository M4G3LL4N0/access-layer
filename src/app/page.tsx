export default function Page() {
  return (
    <div className="bg-gradient-to-b from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]">
      <div className="min-h-[100vh] flex flex-col justify-center py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-8xl font-bold tracking-tighter mb-12 leading-[1.05]">
            <span className="block">Access Infrastructure</span>
            <span className="block text-blue-600 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              For The Physical World
            </span>
          </h1>
          <p className="text-2xl text-gray-600 mb-16 max-w-3xl leading-relaxed">
            Programmable access control, policy enforcement, and coordination systems
            for venues, operators, and developers.
          </p>
          <div className="flex gap-6">
            <a
              href="/demo"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Request Demo
            </a>
            <a
              href="/developers"
              className="px-8 py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-lg"
            >
              Developer Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
