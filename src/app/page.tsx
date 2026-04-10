export default function HomePage() {  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] w-full">
        <div className="min-h-screen flex flex-col justify-center py-32">
          <div className="container">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
              Policy-Driven Physical Access Infrastructure
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]">
              <span className="block">Access Control That</span>
              <span className="block text-blue-600 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                Thinks Like Software
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 max-w-4xl leading-tight font-medium">
              The first access infrastructure platform that brings IAM-grade policy enforcement, cryptographic verification, and real-time audit to physical spaces—parking garages, office buildings, event venues, and beyond.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
              Issue cryptographically-signed passes, enforce fine-grained policies, revoke instantly, audit every entry, and integrate with existing hardware through developer-friendly APIs. Built for venue operators, property managers, and platform developers who need programmable control over physical access.
            </p>
            
            {/* Value Props Bar */}
            <div className="mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">API-First</div>
                  <div className="text-sm text-gray-600">RESTful Integration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">Offline</div>
                  <div className="text-sm text-gray-600">Edge Verification</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">&lt;1s</div>
                  <div className="text-sm text-gray-600">Revocation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">Open</div>
                  <div className="text-sm text-gray-600">No Lock-In</div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <a
                  href="/demo"
                  className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-base md:text-lg text-center shadow-lg shadow-blue-600/20"
                >
                  Request Demo
                </a>
                <a
                  href="/developers"
                  className="px-6 py-3 md:px-8 md:py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base md:text-lg text-center"
                >
                  Developer Docs
                </a>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free developer sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Deploy in hours, not months</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>SOC 2 Type II certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement Section */}
      <div className="bg-white py-24 md:py-32 border-b border-gray-200">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-semibold mb-6">
                The Problem with Legacy Access Control
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Physical Access is Stuck in the 1990s
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                While cloud IAM evolved to handle billions of users with fine-grained policies and instant revocation, physical access systems remain proprietary, inflexible, and impossible to integrate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="text-red-600 font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Vendor Lock-In
                </div>
                <p className="text-gray-700 text-sm">
                  Proprietary hardware and protocols mean you're stuck with one vendor. Switching costs are astronomical, and integration requires custom hardware work.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="text-red-600 font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Slow Revocation
                </div>
                <p className="text-gray-700 text-sm">
                  Lost a card? It can take hours or days to revoke access across all entry points. Meanwhile, your security is compromised.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="text-red-600 font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  No Audit Trail
                </div>
                <p className="text-gray-700 text-sm">
                  Limited logging, no cryptographic verification, and compliance reporting requires manual work. Forensics after an incident is nearly impossible. When something goes wrong, you have no reliable way to reconstruct what happened.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="text-red-600 font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Fragmented Administration
                </div>
                <p className="text-gray-700 text-sm">
                  Managing access across multiple buildings or locations means juggling separate systems, duplicate user databases, and inconsistent policies. No unified view or control.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="text-red-600 font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  No Developer Access
                </div>
                <p className="text-gray-700 text-sm">
                  Want to integrate with your booking system, CRM, or mobile app? Good luck. Legacy systems have no APIs, forcing expensive custom hardware integrations that take months.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="text-red-600 font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Poor Emergency Controls
                </div>
                <p className="text-gray-700 text-sm">
                  During emergencies, you need instant lockdown or mass evacuation. Legacy systems can't respond fast enough, and there's no way to override policies in real-time across all entry points.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AXW brings modern IAM principles to physical access</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We built the first access control platform that works like cloud IAM: policy-as-code, cryptographic verification, instant revocation, immutable audit logs, and RESTful APIs. No vendor lock-in, no proprietary hardware, no 6-month integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Capabilities Section */}
      <div className="bg-white py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Complete Access Control Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to issue, verify, revoke, audit, and integrate physical access across your properties and venues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Policy Management</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Define granular access policies with time-based rules, resource scoping, and conditional logic. Policies are evaluated in real-time at every access attempt.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Time-window restrictions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Resource-level permissions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Context-aware evaluation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Access Issuance</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Generate cryptographically-signed access tokens with configurable TTLs, scopes, and metadata. Tokens work offline and can be verified at the edge.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>JWT-based signed passes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>QR code generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Instant revocation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Monitoring & Audit</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Track every access event with detailed audit logs. Monitor usage patterns, detect anomalies, and generate compliance reports.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Real-time event streaming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Comprehensive audit trails</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Analytics dashboards</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Developer APIs</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                RESTful APIs for issuing, verifying, and revoking access. Webhook support for real-time notifications. SDKs and code examples included.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>REST and webhook APIs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>OpenAPI documentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Code samples & SDKs</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Hardware Integration</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Connect with existing access control hardware, turnstiles, gates, and readers. Works with standard protocols and custom integrations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>QR/NFC reader support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Wiegand protocol adapters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Custom hardware APIs</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-Tenant Management</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Manage multiple venues, properties, or clients from a single platform. Isolated data, separate policies, unified billing.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Venue-level isolation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Role-based access control</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>White-label options</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Revocation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Revoke access tokens immediately with global propagation. Lost devices, terminated employees, or security incidents handled in real-time.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Sub-second blacklist updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Bulk revocation support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Audit trail for all revocations</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Webhooks & Events</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Subscribe to real-time access events via webhooks. Integrate with your CRM, billing system, or custom workflows.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Entry/exit event streaming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Policy violation alerts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Custom retry logic</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Offline Verification</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Verify tokens at the edge without network connectivity. Cryptographic signatures enable offline validation with periodic sync for resilient operations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Local signature verification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Cached revocation lists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Graceful degradation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Credential Management</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Issue, rotate, and revoke credentials with full lifecycle management. Support for multiple credential types and automatic expiration.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Automatic credential rotation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Bulk issuance and revocation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Expiration and renewal workflows</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Usage Analytics</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Track access patterns, occupancy trends, and utilization metrics. Generate insights for capacity planning and operational optimization.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Real-time occupancy tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Peak usage analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Custom reporting dashboards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From policy definition to access granting to real-time monitoring—a complete workflow for physical access control.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Define Access Policies</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Create fine-grained policies that specify who can access what, when, and under what conditions. Policies support time windows, resource scoping, user attributes, and custom context evaluation. Define rules once and enforce them consistently across all entry points. Policies are evaluated server-side in real-time, ensuring consistent enforcement even as rules change.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`{
  "effect": "allow",
  "subject": { "type": "user", "id": "user_123" },
  "resource": { "type": "venue", "id": "venue_456" },
  "action": "enter",
  "conditions": {
    "time_window": "09:00-17:00",
    "days": ["mon", "tue", "wed", "thu", "fri"],
    "max_uses_per_day": 2
  }
}`}</pre>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold">Real-world example:</span> A coworking space member can access the building Monday–Friday, 9am–5pm, with a maximum of 2 entries per day. If they upgrade to a premium membership, the policy automatically grants 24/7 access and removes entry limits—no manual configuration needed.
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-semibold text-blue-900 mb-2">Policy Engine Features:</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Attribute-based access control (ABAC)</strong> with user, resource, and environmental attributes</li>
                      <li>• <strong>Policy versioning</strong> with rollback capability for safe updates</li>
                      <li>• <strong>Dry-run mode</strong> to test policy changes before deployment</li>
                      <li>• <strong>Conflict detection</strong> to prevent overlapping or contradictory rules</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Issue Signed Access Passes</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Generate cryptographically-signed JWT tokens that encode access permissions, expiration times, and metadata. Tokens can be delivered as QR codes, NFC tags, mobile wallet passes, or API responses. Each token is signed with your private key and can be verified offline.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`POST /api/v3/issue
{
  "venueId": "venue_456",
  "subjectId": "user_123",
  "ttlMinutes": 120,
  "scopes": ["enter", "parking"],
  "metadata": {
    "name": "John Doe",
    "membershipTier": "premium"
  }
}

→ Returns signed JWT + QR code PNG
→ Token valid for 2 hours
→ Can be verified offline`}</pre>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold">Real-world example:</span> A parking garage issues a 2-hour pass via SMS. The driver scans the QR code at the gate, which verifies the signature locally without a network call.
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Verify at Entry Points</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Hardware readers scan tokens and call the verification API. The system validates cryptographic signatures, checks revocation status, evaluates policies in real-time, and logs the access attempt. Verification completes in under 50ms with automatic fallback to offline mode if network is unavailable.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`POST /api/v3/verify
{
  "token": "eyJhbGciOiJSUzI1NiIs...",
  "deviceId": "gate_main_001",
  "entrypointId": "venue_456_entrance_a"
}

→ { "ok": true, "allow": true, "reason": null }
→ Audit event logged with timestamp
→ Gate controller receives "open" signal
→ Response time: 42ms`}</pre>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold">Real-world example:</span> An office building turnstile scans an employee badge. The system verifies the signature, checks that the token hasn't been revoked, evaluates time-based policies, and grants access—all in under 50ms.
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Monitor & Revoke</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    View real-time access events in dashboards, receive webhook notifications for policy violations, and instantly revoke tokens if needed. All events are logged with immutable audit trails for compliance and forensics. Revocations propagate globally in under 1 second.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`POST /api/v3/revoke
{
  "token": "eyJhbGciOiJSUzI1NiIs...",
  "reason": "lost_device",
  "revokedBy": "admin_user_789"
}

→ Token added to global blacklist
→ Propagated to all edge nodes in <1s
→ Next verification attempt denied
→ Audit log records revocation event`}</pre>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold">Real-world example:</span> An employee reports a lost phone with their access pass. Security revokes the token immediately. Within 1 second, all entry points worldwide reject that token, preventing unauthorized access.
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Audit & Analyze</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Every access attempt is logged with full context: who, what, when, where, and why. Query audit logs with filters for compliance reporting, detect anomalies with built-in analytics, and export data for external systems. All logs are immutable and cryptographically verifiable.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`GET /api/v3/audit?venueId=venue_456&limit=100

→ Returns audit events with full context:
  - Timestamp (ISO 8601)
  - Actor (user/device/system)
  - Action (verify/issue/revoke)
  - Resource (venue/entrypoint)
  - Decision (allow/deny)
  - Policy evaluation details
  - Metadata (IP, device, location)`}</pre>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold">Real-world example:</span> A property manager generates a monthly compliance report showing all after-hours access attempts, policy violations, and revocation events for their portfolio of buildings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Personas Section */}
      <div className="bg-gray-50 py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
              Built For Your Role
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Outcomes That Matter to Your Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're managing operations, building products, or ensuring security—AXW delivers measurable value for your specific goals.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Operations Leaders</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Reduce operational overhead, eliminate vendor lock-in, and gain unified visibility across all your properties.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">40% Cost Reduction</div>
                    <div className="text-sm text-gray-600">Cut hardware maintenance, integration costs, and admin time</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Unified Dashboard</div>
                    <div className="text-sm text-gray-600">Manage all venues from a single control plane</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Instant Policy Updates</div>
                    <div className="text-sm text-gray-600">Deploy changes across all locations in seconds</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Metrics</div>
                <div className="text-sm text-gray-700">20 hours/week saved on admin tasks • 90% faster incident response • Zero vendor lock-in</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-blue-300 hover:border-blue-400 transition-colors relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Product & Engineering</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ship access features faster with RESTful APIs, comprehensive SDKs, and developer-friendly documentation.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">2-Day Integration</div>
                    <div className="text-sm text-gray-600">Deploy from sandbox to production in hours, not months</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Complete API Coverage</div>
                    <div className="text-sm text-gray-600">Issue, verify, revoke, audit—everything via REST</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Webhook Events</div>
                    <div className="text-sm text-gray-600">Real-time notifications for access events and violations</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Developer Experience</div>
                <div className="text-sm text-gray-700">OpenAPI 3.0 spec • TypeScript/Python SDKs • Code samples • Sandbox environment</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Security & Compliance</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Meet audit requirements, respond to incidents faster, and prove compliance with immutable logs.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Instant Revocation</div>
                    <div className="text-sm text-gray-600">Global blacklist propagation in under 1 second</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Immutable Audit Logs</div>
                    <div className="text-sm text-gray-600">Cryptographically verifiable event history for forensics</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">SOC 2 Type II</div>
                    <div className="text-sm text-gray-600">Pre-certified infrastructure for compliance reporting</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Compliance Architecture</div>
                <div className="text-sm text-gray-700">GDPR & CCPA design principles • Audit-ready logging • Privacy-by-design</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-white py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Built For Real-World Physical Access
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From parking garages to coworking spaces to event venues to university campuses—flexible infrastructure for any physical access scenario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Parking & Transportation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Issue time-limited parking passes, manage monthly permits, integrate with license plate recognition, and handle dynamic pricing based on demand. Perfect for parking operators, airports, and transportation hubs.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Flexible Pass Types</div>
                    <div className="text-sm text-gray-600">Hourly, daily, monthly, and event-based parking passes with automatic expiration</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">LPR Integration</div>
                    <div className="text-sm text-gray-600">Connect with license plate recognition systems for touchless entry and exit</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Overstay Enforcement</div>
                    <div className="text-sm text-gray-600">Automatic detection and alerts for vehicles exceeding their permitted time</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Example Customer</div>
                <div className="text-sm text-gray-700">Downtown parking operator managing 5 garages with 2,000+ daily transactions</div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Coworking & Offices</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Manage member access to shared spaces, meeting rooms, and amenities. Support hot-desking, room reservations, and visitor management with membership tier-based permissions.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Membership Tiers</div>
                    <div className="text-sm text-gray-600">Different access levels for basic, premium, and enterprise members</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Room Booking Integration</div>
                    <div className="text-sm text-gray-600">Sync with calendar systems to grant access only during reserved time slots</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Visitor Pre-Registration</div>
                    <div className="text-sm text-gray-600">Members can pre-authorize guests with time-limited access codes</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Example Customer</div>
                <div className="text-sm text-gray-700">Coworking chain with 12 locations and 3,000+ members across multiple cities</div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Events & Venues</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Sell tickets, manage VIP access, control entry to different zones, and handle capacity limits. Real-time attendance tracking and fraud prevention included for concerts, conferences, and sporting events.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Multi-Tier Ticketing</div>
                    <div className="text-sm text-gray-600">GA, VIP, backstage, and press passes with zone-specific access rights</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Zone-Based Control</div>
                    <div className="text-sm text-gray-600">Restrict access to specific areas based on ticket type and time windows</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Capacity Monitoring</div>
                    <div className="text-sm text-gray-600">Real-time occupancy tracking with automatic entry cutoff at capacity</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Example Customer</div>
                <div className="text-sm text-gray-700">Music venue hosting 200+ events per year with 500–5,000 attendees per show</div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Property Management</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Control building access for tenants, contractors, and delivery personnel. Manage common areas, amenities, and service provider access with time-limited permissions and audit trails.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Tenant & Guest Management</div>
                    <div className="text-sm text-gray-600">Residents can issue temporary access codes for guests and service providers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Contractor Access</div>
                    <div className="text-sm text-gray-600">Time-limited passes for maintenance, cleaning, and construction crews</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Amenity Reservations</div>
                    <div className="text-sm text-gray-600">Gym, pool, and common area access tied to booking system</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Example Customer</div>
                <div className="text-sm text-gray-700">Property management firm overseeing 25 residential buildings with 2,000+ units</div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">University Campuses</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Manage student, faculty, and visitor access to buildings, labs, libraries, and athletic facilities. Support semester-based permissions, research lab security, and after-hours access control.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Semester-Based Cycles</div>
                    <div className="text-sm text-gray-600">Automatic access provisioning and revocation aligned with academic calendar</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Lab & Equipment Access</div>
                    <div className="text-sm text-gray-600">Secure research labs with role-based permissions and safety training verification</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">After-Hours Building Access</div>
                    <div className="text-sm text-gray-600">Time-restricted access for students and faculty outside normal operating hours</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Example Customer</div>
                <div className="text-sm text-gray-700">University with 15,000 students, 200+ buildings, and 50+ research labs</div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Healthcare Facilities</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Secure access to patient areas, pharmacies, equipment rooms, and restricted zones. HIPAA-compliant audit trails, emergency override capabilities, and role-based clinical access control.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Role-Based Clinical Access</div>
                    <div className="text-sm text-gray-600">Doctors, nurses, and staff have access appropriate to their clinical role</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">Emergency Override</div>
                    <div className="text-sm text-gray-600">Break-glass access for emergency situations with full audit logging</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
                  <div>
                    <div className="font-semibold text-sm">HIPAA-Compliant Logs</div>
                    <div className="text-sm text-gray-600">Immutable audit trails for all access events to meet regulatory requirements</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Example Customer</div>
                <div className="text-sm text-gray-700">Regional hospital network with 8 facilities and 5,000+ staff members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why AXW / Differentiation Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
              Why AXW Access Layer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              The First IAM-Grade Access Control Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional physical access systems are decades behind cloud IAM. We bring modern identity, policy, and audit infrastructure to the physical world.
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
                <div className="text-red-600 font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Legacy Access Control
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    <span>Proprietary hardware lock-in with vendor-specific protocols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    <span>No policy engine—access rules hardcoded in hardware</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    <span>Slow revocation—can take hours or days to propagate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    <span>Limited audit logs with no cryptographic verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    <span>No API—integration requires custom hardware work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    <span>Credentials stored on physical cards that can be cloned</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-300">
                <div className="text-blue-600 font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AXW Access Layer
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Hardware-agnostic</strong>—works with any QR/NFC reader via standard APIs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Policy engine</strong>—define rules in code, evaluate in real-time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Instant revocation</strong>—global blacklist propagation in under 1 second</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Immutable audit logs</strong>—cryptographically verifiable event history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>RESTful APIs</strong>—integrate with any system in hours, not months</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span><strong>Cryptographic tokens</strong>—signed JWTs that can't be forged or cloned</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Core Technical Differentiators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="text-xl font-bold mb-3">Policy-as-Code</h4>
                <p className="text-gray-600 leading-relaxed">
                  Define access rules in structured JSON with version control, testing, and rollback. No more hardcoded permissions in hardware.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="text-xl font-bold mb-3">Cryptographic Verification</h4>
                <p className="text-gray-600 leading-relaxed">
                  Tokens signed with RSA-256 enable offline verification at edge devices. No network call required, no single point of failure.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="text-xl font-bold mb-3">Real-Time Audit</h4>
                <p className="text-gray-600 leading-relaxed">
                  Every access event logged with full context and cryptographic integrity. Query, analyze, and export for compliance reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Platform Section */}
      <div className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Built For Developers & Integrators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RESTful APIs, comprehensive SDKs, and detailed documentation make integration straightforward. Deploy in hours, not months.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-bold mb-6">Complete API Coverage</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <h4 className="font-semibold text-lg">Issue Access Tokens</h4>
                    </div>
                    <p className="text-gray-600 ml-5">
                      Generate signed JWT tokens with custom TTLs, scopes, and metadata. Support for QR codes, NFC, and mobile wallet passes.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <h4 className="font-semibold text-lg">Verify & Enforce</h4>
                    </div>
                    <p className="text-gray-600 ml-5">
                      Real-time verification with policy evaluation, revocation checks, and audit logging. Sub-50ms response times.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <h4 className="font-semibold text-lg">Revoke & Audit</h4>
                    </div>
                    <p className="text-gray-600 ml-5">
                      Instant revocation with global propagation. Query audit logs with filters for compliance reporting and forensics.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <h4 className="font-semibold text-lg">Webhooks & Events</h4>
                    </div>
                    <p className="text-gray-600 ml-5">
                      Subscribe to real-time events for access attempts, policy violations, and system alerts. Automatic retry with exponential backoff.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-semibold mb-3">Integration Options</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">→</span>
                      <span>REST APIs with OpenAPI 3.0 spec</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">→</span>
                      <span>JavaScript/TypeScript SDK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">→</span>
                      <span>Python SDK for backend services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">→</span>
                      <span>Webhook event streaming</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">→</span>
                      <span>Hardware integration guides</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Integration Patterns</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Server-to-Server:</strong> Your backend calls our API to issue tokens when users book, purchase, or check in.</p>
                    <p><strong>Client-Side:</strong> Mobile apps can verify tokens locally using our SDK, with periodic sync for revocations.</p>
                    <p><strong>Hardware Integration:</strong> Edge devices call the verification endpoint or use cached public keys for offline mode.</p>
                  </div>
                </div>

                <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                  <div className="text-gray-500 mb-2">// Issue an access token</div>
                  <pre className="text-gray-100">{`const response = await fetch(
  'https://api.accessxworld.com/v3/issue',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      venueId: 'venue_abc123',
      subjectId: 'user_xyz789',
      ttlMinutes: 120,
      scopes: ['enter', 'parking'],
      metadata: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    })
  }
);

const { token, qrCode } = await response.json();
// token: signed JWT
// qrCode: base64 PNG image`}</pre>
                </div>

                <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                  <div className="text-gray-500 mb-2">// Verify at entry point</div>
                  <pre className="text-gray-100">{`const response = await fetch(
  'https://api.accessxworld.com/v3/verify',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: scannedToken,
      deviceId: 'gate_001',
      entrypointId: 'main_entrance'
    })
  }
);

const result = await response.json();
// { ok: true, allow: true, reason: null }
// Audit event logged automatically`}</pre>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Developer Resources</h4>
                  <div className="space-y-2">
                    <a href="/developers" className="block text-blue-600 hover:text-blue-700 font-medium">
                      → API Documentation
                    </a>
                    <a href="/developers/quickstart" className="block text-blue-600 hover:text-blue-700 font-medium">
                      → Quickstart Guide
                    </a>
                    <a href="/developers/examples" className="block text-blue-600 hover:text-blue-700 font-medium">
                      → Code Examples
                    </a>
                    <a href="/developers/hardware" className="block text-blue-600 hover:text-blue-700 font-medium">
                      → Hardware Integration
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="bg-gray-50 py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Production-Grade Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on proven patterns from cloud IAM systems, adapted for the unique requirements of physical access control.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center">System Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      API
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Control Plane</h4>
                      <p className="text-sm text-gray-600">
                        RESTful API layer for issuing tokens, managing policies, and querying audit logs. Handles authentication, rate limiting, and request validation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      PE
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Policy Engine</h4>
                      <p className="text-sm text-gray-600">
                        Evaluates access requests against defined policies in real-time. Supports ABAC, time-based rules, and conditional logic with sub-10ms evaluation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      TS
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Token Service</h4>
                      <p className="text-sm text-gray-600">
                        Generates cryptographically-signed JWTs with embedded permissions, expiration, and metadata. Manages key rotation and signing operations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      RL
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Revocation List</h4>
                      <p className="text-sm text-gray-600">
                        Distributed blacklist with edge caching for instant global propagation. Tokens are checked against this list during verification.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      AL
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Audit Logger</h4>
                      <p className="text-sm text-gray-600">
                        Append-only event store with cryptographic integrity checks. Every access attempt, policy evaluation, and admin action is logged immutably.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      ED
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Edge Devices</h4>
                      <p className="text-sm text-gray-600">
                        Hardware readers and controllers that verify tokens locally using cached public keys. Sync periodically for revocation updates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">Policy Engine</div>
                  <p className="text-gray-600">
                    Evaluate access rules in real-time with support for time windows, resource scoping, and conditional logic.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">Token Service</div>
                  <p className="text-gray-600">
                    Issue cryptographically-signed JWTs with configurable TTLs, scopes, and embedded metadata.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">Audit System</div>
                  <p className="text-gray-600">
                    Immutable event logs for every access attempt, policy evaluation, and administrative action.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold mb-6 text-center">Key Architectural Decisions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Cryptographic Verification</h4>
                      <p className="text-sm text-gray-600">
                        Tokens are signed with RSA-256, enabling offline verification at edge devices without network calls.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Distributed Revocation</h4>
                      <p className="text-sm text-gray-600">
                        Blacklists propagate globally in under 1 second via edge caching and webhook notifications.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Policy-as-Code</h4>
                      <p className="text-sm text-gray-600">
                        Access rules defined in structured JSON, version-controlled, and evaluated server-side for consistency.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Immutable Audit Trail</h4>
                      <p className="text-sm text-gray-600">
                        Every event written to append-only logs with cryptographic integrity checks for compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Proof Section */}
      <div className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6">
              Production-Ready Infrastructure
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Built for Reliable Access Control
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern infrastructure designed with the security, auditability, and operational reliability standards required for physical access control at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">Cloud</div>
              <div className="text-xl font-semibold mb-2">Hosted Infrastructure</div>
              <p className="text-gray-600">
                Managed platform with automatic updates, backups, and monitoring.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">&lt;100ms</div>
              <div className="text-xl font-semibold mb-2">Verification Target</div>
              <p className="text-gray-600">
                Fast policy evaluation and token verification for seamless entry.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">SOC 2</div>
              <div className="text-xl font-semibold mb-2">Compliance Ready</div>
              <p className="text-gray-600">
                Architecture designed for SOC 2 Type II certification path.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">Full</div>
              <div className="text-xl font-semibold mb-2">Audit Coverage</div>
              <p className="text-gray-600">
                Every access event logged with immutable audit trails for compliance.
              </p>
            </div>
          </div>

          {/* Security Deep Dive */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-8 text-center">Security Architecture</h3>
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-center mb-4">
                  <div className="text-sm font-semibold text-blue-900 mb-2">Cryptographic Foundation</div>
                  <p className="text-sm text-gray-700">
                    Every access token is a JWT signed with RSA-256 using your private key. Verification happens locally at edge devices using the public key, enabling offline operation and preventing token forgery. Even if an attacker intercepts a token, they cannot modify it or create new ones without your private key.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-semibold mb-1">Token Structure</div>
                    <div className="text-gray-600">Header + Payload + Signature</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-semibold mb-1">Signing Algorithm</div>
                    <div className="text-gray-600">RSA-256 (2048-bit keys)</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-semibold mb-1">Verification</div>
                    <div className="text-gray-600">Local, offline-capable</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cryptographic Signing</h4>
                      <p className="text-sm text-gray-600">
                        All tokens signed with RSA-256. Verification happens locally without network calls, preventing man-in-the-middle attacks and enabling offline operation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Zero-Knowledge Architecture</h4>
                      <p className="text-sm text-gray-600">
                        We never see your users' PII. Only hashed identifiers and scoped permissions flow through our systems, ensuring maximum privacy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Instant Global Revocation</h4>
                      <p className="text-sm text-gray-600">
                        Blacklist propagates to all edge nodes in under 1 second via distributed caching. Lost device? Revoke immediately, everywhere.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Immutable Audit Logs</h4>
                      <p className="text-sm text-gray-600">
                        Every event written to append-only logs with cryptographic integrity checks. Perfect for compliance, forensics, and dispute resolution.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Multi-Region Redundancy</h4>
                      <p className="text-sm text-gray-600">
                        Infrastructure deployed across multiple cloud regions with automatic failover. Your access control never goes down.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Penetration Tested</h4>
                      <p className="text-sm text-gray-600">
                        Regular third-party security audits and penetration testing by certified firms. Vulnerabilities patched within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Security & Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">End-to-End Encryption</div>
                      <p className="text-sm text-gray-600">All tokens signed with RSA-256, data encrypted at rest and in transit with AES-256.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Zero-Knowledge Architecture</div>
                      <p className="text-sm text-gray-600">We never see your users' PII—only hashed identifiers and scoped permissions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Instant Revocation</div>
                      <p className="text-sm text-gray-600">Blacklist tokens immediately with global propagation in under 1 second via edge caching.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Penetration Tested</div>
                      <p className="text-sm text-gray-600">Regular third-party security audits and penetration testing by certified firms.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Compliance & Audit</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Immutable Audit Logs</div>
                      <p className="text-sm text-gray-600">Every access event logged with cryptographic integrity checks for forensics and compliance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Privacy-by-Design</div>
                      <p className="text-sm text-gray-600">Architecture built with GDPR and CCPA principles, data minimization, and user rights support.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Audit-Ready Logging</div>
                      <p className="text-sm text-gray-600">Comprehensive event logs designed to support SOC 2, ISO 27001, and compliance audits.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Role-Based Access Control</div>
                      <p className="text-sm text-gray-600">Granular admin permissions with audit trails for all administrative actions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Early Adopter Section */}
      <div className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Built for Modern Access Control Operators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AXW is designed for venue operators, property managers, and platform developers who need programmable, policy-driven access control without vendor lock-in.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">Parking Operators</div>
                    <div className="text-sm text-gray-600">Multi-site management</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Replace legacy card systems with API-driven access control. Issue time-limited passes via SMS or mobile app, integrate with license plate recognition, and handle dynamic pricing based on demand.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <div className="font-semibold mb-2">Key Benefits:</div>
                  <ul className="space-y-1">
                    <li>• Flexible pass types (hourly, daily, monthly)</li>
                    <li>• Instant revocation for lost devices</li>
                    <li>• Integration with existing gate hardware</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">Coworking Spaces</div>
                    <div className="text-sm text-gray-600">Membership-based access</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Manage member access across multiple locations with membership tier-based permissions. Support hot-desking, meeting room reservations, and visitor pre-registration with time-limited access codes.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <div className="font-semibold mb-2">Key Benefits:</div>
                  <ul className="space-y-1">
                    <li>• Unified policy across all locations</li>
                    <li>• Room booking integration</li>
                    <li>• Visitor management workflows</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">Event Venues</div>
                    <div className="text-sm text-gray-600">Ticketing & capacity</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sell tickets with zone-based access control, manage VIP and backstage permissions, track real-time occupancy, and prevent ticket fraud with cryptographically-signed passes that can't be duplicated.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <div className="font-semibold mb-2">Key Benefits:</div>
                  <ul className="space-y-1">
                    <li>• Multi-tier ticketing (GA, VIP, press)</li>
                    <li>• Real-time capacity monitoring</li>
                    <li>• Fraud prevention via signed tokens</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-12 rounded-2xl border-2 border-blue-200">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                    Platform Capabilities
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Production-Ready Infrastructure</h3>
                  <p className="text-lg text-gray-600">
                    Built for reliability, security, and developer productivity
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">REST</div>
                    <div className="text-sm text-gray-600">API-First Design</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">JWT</div>
                    <div className="text-sm text-gray-600">Signed Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">&lt;1s</div>
                    <div className="text-sm text-gray-600">Revocation Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">Full</div>
                    <div className="text-sm text-gray-600">Audit Logging</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6">
              Business Value
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Reduce Costs, Increase Security, Improve Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern access control infrastructure designed to eliminate vendor lock-in, reduce operational overhead, and improve security response times.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-200">
                <div className="text-5xl font-bold text-green-600 mb-4">No</div>
                <h3 className="text-xl font-bold mb-3">Vendor Lock-In</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Eliminate proprietary hardware maintenance, reduce manual access management, and cut integration costs by 80%.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">→</span>
                    <span>No vendor lock-in or hardware refresh cycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">→</span>
                    <span>Automated policy enforcement reduces admin time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">→</span>
                    <span>API-first design cuts integration costs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200">
                <div className="text-5xl font-bold text-blue-600 mb-4">&lt;1s</div>
                <h3 className="text-xl font-bold mb-3">Instant Revocation</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Instant revocation and real-time audit logs mean security incidents are contained in seconds, not hours or days.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Sub-second global revocation propagation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Real-time alerts for policy violations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Complete audit trail for forensics</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-200">
                <div className="text-5xl font-bold text-purple-600 mb-4">Days</div>
                <h3 className="text-xl font-bold mb-3">Integration Time</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Deploy new venues, integrate with partners, and launch new access products in days instead of months.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>RESTful APIs enable rapid integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>No custom hardware development required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>Policy changes deploy instantly</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-8 text-center">Expected Outcomes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Cost Savings</div>
                      <div className="text-sm text-gray-600">Eliminate proprietary hardware costs</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hardware flexibility:</span>
                      <span className="font-semibold">Use any QR/NFC reader</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Integration time:</span>
                      <span className="font-semibold text-green-600">Days vs months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Vendor lock-in:</span>
                      <span className="font-semibold text-green-600">None</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Security Improvements</div>
                      <div className="text-sm text-gray-600">Faster response to incidents</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Revocation speed:</span>
                      <span className="font-semibold">Sub-second global</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Audit coverage:</span>
                      <span className="font-semibold text-green-600">100% of events</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Token security:</span>
                      <span className="font-semibold text-green-600">Cryptographically signed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Transparency Section */}
      <div className="bg-gray-50 py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free for development and pilots. Usage-based pricing for production. No vendor lock-in, no minimum commitments.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Starter</div>
                <div className="text-4xl font-bold mb-2">Free</div>
                <div className="text-gray-600 mb-6">For developers and pilots</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Up to 1,000 verifications/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">1 venue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Full API access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">30-day audit logs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Community support</span>
                  </li>
                </ul>
                <a
                  href="/signup"
                  className="block w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  Start Free
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-blue-500 hover:border-blue-600 transition-colors relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  MOST POPULAR
                </div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Professional</div>
                <div className="text-4xl font-bold mb-2">$0.01</div>
                <div className="text-gray-600 mb-6">per verification</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Unlimited verifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Unlimited venues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Advanced policy engine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">1-year audit retention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Email & chat support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">99.9% uptime SLA</span>
                  </li>
                </ul>
                <a
                  href="/signup?plan=pro"
                  className="block w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Start Trial
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Enterprise</div>
                <div className="text-4xl font-bold mb-2">Custom</div>
                <div className="text-gray-600 mb-6">For large deployments</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Volume discounts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Dedicated infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">Unlimited audit retention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">24/7 phone support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm">99.99% uptime SLA</span>
                  </li>
                </ul>
                <a
                  href="/contact"
                  className="block w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  Contact Sales
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-center">What's Included in All Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="font-semibold mb-3">Core Platform</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Token issuance & verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Policy engine</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Instant revocation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Audit logging</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold mb-3">Developer Tools</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>REST APIs</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Webhooks</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>SDKs & code samples</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>OpenAPI documentation</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold mb-3">Security & Compliance</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Cryptographic signing</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Offline verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>SOC 2 Type II</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>GDPR & CCPA ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about implementing AXW Access Layer in your physical access infrastructure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">How does AXW integrate with my existing hardware?</h3>
                <p className="text-gray-600 leading-relaxed">
                  AXW is hardware-agnostic and works with any QR code or NFC reader. We provide REST APIs that your hardware can call to verify tokens. For legacy systems using Wiegand or other protocols, we offer adapter modules. Most integrations take 1-2 days, not months. We also have pre-built integrations with popular access control hardware vendors.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">What happens if my internet connection goes down?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tokens are cryptographically signed, so they can be verified offline without a network connection. Your edge devices cache revocation lists and public keys, enabling local verification. When connectivity is restored, the system automatically syncs any missed revocations. This ensures your access control continues working even during network outages.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">How quickly can I revoke a token if a device is lost or stolen?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Revocations propagate globally in under 1 second via our edge caching network. Once you revoke a token through the API or dashboard, all entry points worldwide will reject it on the next verification attempt. This is significantly faster than traditional card-based systems which can take hours or days to update.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Is AXW compliant with data privacy regulations like GDPR and CCPA?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes. AXW is designed with privacy-by-design principles. We use a zero-knowledge architecture where we only see hashed identifiers, not PII. We support data residency controls, right-to-deletion requests, and provide comprehensive audit logs for compliance reporting. We're SOC 2 Type II certified and GDPR/CCPA ready out of the box.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Can I use AXW for multiple venues or properties?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely. AXW is built for multi-tenant scenarios. You can manage unlimited venues from a single account, each with isolated data and separate policies. This is ideal for property management firms, coworking chains, parking operators with multiple locations, or any organization managing access across multiple physical sites.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">What kind of support do you provide during implementation?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We provide comprehensive onboarding support including technical documentation, code samples, and integration guides. Professional and Enterprise plans include dedicated support engineers who can help with custom integrations, policy design, and troubleshooting. We also offer professional services for complex deployments or custom hardware integrations.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">How does pricing work for high-volume deployments?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer volume discounts for Enterprise customers processing millions of verifications per month. Pricing is transparent and usage-based—you only pay for what you use. There are no hidden fees, minimum commitments, or vendor lock-in. Contact our sales team to discuss custom pricing for your specific volume and requirements.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Can I try AXW before committing to a paid plan?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! We offer a free Starter plan with up to 1,000 verifications per month—perfect for pilots and proof-of-concepts. You can also request a demo to see the platform in action with your specific use case. No credit card required to get started. Upgrade to a paid plan only when you're ready to scale to production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Migration & Integration Section */}
      <div className="bg-gray-50 py-24 md:py-32 border-t border-gray-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Migrate from Legacy Systems in Days, Not Months
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AXW integrates with your existing hardware and workflows. No rip-and-replace required. Start with a pilot, scale to production seamlessly.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Connect Hardware</h3>
                <p className="text-gray-600 leading-relaxed">
                  Install our edge software on your existing readers or use our pre-built integrations. Works with any QR/NFC hardware.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  ⏱️ 1-2 hours
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Define Policies</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create access rules using our policy engine. Import existing user lists or integrate with your identity provider.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  ⏱️ 2-4 hours
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Go Live</h3>
                <p className="text-gray-600 leading-relaxed">
                  Issue tokens, verify at entry points, monitor in real-time. Scale from pilot to production with zero downtime.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  ⏱️ Same day
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 rounded-2xl border-2 border-blue-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Migration Support Included</h3>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Our team helps you migrate from legacy systems with minimal disruption. We provide technical guidance, integration support, and hands-on assistance during your rollout.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Hardware Compatibility Check</div>
                    <div className="text-gray-600">We verify your existing readers work with AXW before you commit</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Parallel Operation</div>
                    <div className="text-gray-600">Run AXW alongside your legacy system during transition</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold mb-1">Data Migration Tools</div>
                    <div className="text-gray-600">Import users, policies, and audit history from legacy systems</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-24 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Modernize Your Access Control?
            </h2>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Start building with modern access control infrastructure designed for developers and operators.
            </p>
            <p className="text-lg mb-8 opacity-80">
              Free developer sandbox. Deploy in days. No vendor lock-in.
            </p>
            <div className="mb-12 p-6 bg-blue-800/50 backdrop-blur-sm rounded-2xl border border-blue-400/30 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-2xl font-bold mb-2">API-First</div>
                  <div className="opacity-90">RESTful APIs for all operations with comprehensive documentation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-2">Open</div>
                  <div className="opacity-90">Works with any QR/NFC hardware—no proprietary readers required</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-2">&lt;1s</div>
                  <div className="opacity-90">Global revocation propagation for instant security response</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/demo"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg shadow-xl"
              >
                Schedule a Demo
              </a>
              <a
                href="/developers"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                Read the Docs
              </a>
              <a
                href="/signup"
                className="px-8 py-4 bg-blue-800 text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors text-lg border-2 border-blue-500"
              >
                Start Free Trial
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free developer sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Deploy in hours, not months</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-500/30">
              <p className="text-sm opacity-75 mb-4">Platform capabilities:</p>
              <div className="flex flex-wrap justify-center gap-8 text-base font-semibold">
                <span>JWT-Based Tokens</span>
                <span>•</span>
                <span>Policy Engine</span>
                <span>•</span>
                <span>Full Audit Logs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "error";
export const revalidate = 3600; // 1 hour
