export default function HomePage() {  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] w-full">
        <div className="min-h-screen flex flex-col justify-center py-32">
          <div className="container">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]">
              <span className="block">Access Infrastructure</span>
              <span className="block text-blue-600 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                For The Physical World
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 max-w-4xl leading-tight font-medium">
              Policy-driven access control for venues, parking, buildings, and physical spaces—not just digital resources.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl leading-relaxed">
              Issue cryptographically-signed passes, enforce fine-grained policies, audit every entry, and integrate with existing hardware through developer-friendly APIs. Built for venue operators, property managers, and platform developers who need programmable control over physical access.
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
              Everything you need to manage, monitor, and secure physical access across your properties and venues.
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
              Built For Real-World Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From parking garages to coworking spaces to event venues—flexible infrastructure for any physical access scenario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
          </div>
        </div>
      </div>

      {/* Trust & Proof Section */}
      <div className="bg-gray-50 py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for reliability, security, and scale from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">99.9%</div>
              <div className="text-xl font-semibold mb-2">Uptime SLA</div>
              <p className="text-gray-600">
                Redundant infrastructure with automatic failover and 24/7 monitoring.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">&lt;50ms</div>
              <div className="text-xl font-semibold mb-2">Verification Latency</div>
              <p className="text-gray-600">
                Fast policy evaluation and token verification for seamless entry experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">SOC 2</div>
              <div className="text-xl font-semibold mb-2">Compliance Ready</div>
              <p className="text-gray-600">
                Security controls, audit logs, and compliance reporting built in.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-center">Security & Privacy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <div>
                    <div className="font-semibold mb-1">End-to-End Encryption</div>
                    <p className="text-sm text-gray-600">All tokens signed with RSA-256, data encrypted at rest and in transit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <div>
                    <div className="font-semibold mb-1">Zero-Knowledge Architecture</div>
                    <p className="text-sm text-gray-600">We never see your users' PII—only hashed identifiers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <div>
                    <div className="font-semibold mb-1">Instant Revocation</div>
                    <p className="text-sm text-gray-600">Blacklist tokens immediately with global propagation in seconds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <div>
                    <div className="font-semibold mb-1">Audit Logging</div>
                    <p className="text-sm text-gray-600">Immutable logs of every access event for compliance and forensics.</p>
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
