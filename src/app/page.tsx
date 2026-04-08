export default function Page() {
  return (
    <div>
      <div className="min-h-[80vh] flex flex-col justify-center py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tight mb-6 leading-tight">
            <span className="block">Access Infrastructure</span>
            <span className="block text-blue-600">For The Physical World</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Programmable access control, policy enforcement, and coordination systems
            for venues, operators, and developers.
          </p>
          <div className="flex gap-4">
            <a
              href="/demo"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Request Demo
            </a>
            <a
              href="/developers"
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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
