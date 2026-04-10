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
            <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl leading-relaxed">
              Issue cryptographically-signed passes, enforce fine-grained policies, revoke instantly, audit every entry, and integrate with existing hardware through developer-friendly APIs. Built for venue operators, property managers, and platform developers who need programmable control over physical access.
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <a
                  href="/demo"
                  className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-base md:text-lg text-center"
                >
                  Request Demo
                </a>
                <a
                  href="/developers"
                  className="px-6 py-3 md:px-8 md:py-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base md:text-lg text-center"
                >
                  Developer Docs
                </a>
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
                Verify tokens at the edge without network connectivity. Cryptographic signatures enable offline validation with periodic sync.
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
                    Create fine-grained policies that specify who can access what, when, and under what conditions. Policies support time windows, resource scoping, user attributes, and custom context evaluation.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`{
  "subject": { "type": "user", "id": "user_123" },
  "resource": { "type": "venue", "id": "venue_456" },
  "action": "enter",
  "conditions": {
    "time_window": "09:00-17:00",
    "days": ["mon", "tue", "wed", "thu", "fri"]
  }
}`}</pre>
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
                    Generate cryptographically-signed JWT tokens that encode access permissions, expiration times, and metadata. Tokens can be delivered as QR codes, NFC tags, or API responses.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`POST /api/v3/issue
{
  "venueId": "venue_456",
  "subjectId": "user_123",
  "ttlMinutes": 60,
  "scopes": ["enter", "parking"]
}

→ Returns signed JWT + QR code`}</pre>
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
                    Hardware readers scan tokens and call the verification API. The system validates signatures, checks revocation status, evaluates policies in real-time, and logs the access attempt.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`POST /api/v3/verify
{ "token": "eyJhbGc..." }

→ { "ok": true, "allow": true }
→ Audit log created
→ Gate opens`}</pre>
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
                    View real-time access events in dashboards, receive webhook notifications, and instantly revoke tokens if needed. All events are logged for compliance and analytics.
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800">{`POST /api/v3/revoke
{ "token": "eyJhbGc...", "reason": "lost_device" }

→ Token blacklisted immediately
→ Next verification attempt denied`}</pre>
                  </div>
                </div>
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
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Parking & Transportation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Issue time-limited parking passes, manage monthly permits, integrate with license plate recognition, and handle dynamic pricing based on demand.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Hourly, daily, and monthly passes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>LPR integration for touchless entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Overstay detection and enforcement</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Coworking & Offices</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Manage member access to shared spaces, meeting rooms, and amenities. Support hot-desking, room reservations, and visitor management.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Membership tier-based access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Room booking integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Visitor pre-registration</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Events & Venues</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sell tickets, manage VIP access, control entry to different zones, and handle capacity limits. Real-time attendance tracking included.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Multi-tier ticket types</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Zone-based access control</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Capacity monitoring</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Property Management</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Control building access for tenants, contractors, and delivery personnel. Manage common areas, amenities, and service provider access.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Tenant and guest management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Contractor time-limited access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Amenity reservation system</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">University Campuses</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Manage student, faculty, and visitor access to buildings, labs, libraries, and athletic facilities. Support semester-based permissions and research lab security.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Semester-based access cycles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Lab and equipment access control</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>After-hours building access</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Healthcare Facilities</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Secure access to patient areas, pharmacies, equipment rooms, and restricted zones. Audit trails for HIPAA compliance and emergency override capabilities.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Role-based clinical access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Emergency override protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>HIPAA-compliant audit logs</span>
                </div>
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

          <div className="max-w-5xl mx-auto">
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Enterprise-Grade Reliability & Security
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for mission-critical physical access control with the reliability, security, and compliance standards you expect from enterprise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">99.99%</div>
              <div className="text-xl font-semibold mb-2">Uptime SLA</div>
              <p className="text-gray-600">
                Multi-region redundancy with automatic failover and 24/7 monitoring.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">&lt;50ms</div>
              <div className="text-xl font-semibold mb-2">Verification Latency</div>
              <p className="text-gray-600">
                Fast policy evaluation and token verification for seamless entry.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">SOC 2</div>
              <div className="text-xl font-semibold mb-2">Type II Certified</div>
              <p className="text-gray-600">
                Security controls, audit logs, and compliance reporting built in.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">100%</div>
              <div className="text-xl font-semibold mb-2">Audit Coverage</div>
              <p className="text-gray-600">
                Every access event logged with immutable audit trails for compliance.
              </p>
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
                      <div className="font-semibold mb-1">GDPR & CCPA Ready</div>
                      <p className="text-sm text-gray-600">Data residency controls, right-to-deletion support, and privacy-by-design architecture.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">✓</span>
                    <div>
                      <div className="font-semibold mb-1">Compliance Reporting</div>
                      <p className="text-sm text-gray-600">Pre-built reports for SOC 2, ISO 27001, and industry-specific compliance requirements.</p>
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

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-24 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Modernize Your Access Control?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              Join venue operators and developers building the future of physical access infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/demo"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Schedule a Demo
              </a>
              <a
                href="/developers"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
              >
                Read the Docs
              </a>
            </div>
            <p className="mt-8 text-sm opacity-75">
              Free developer sandbox • No credit card required • Deploy in minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "error";
export const revalidate = 3600; // 1 hour
