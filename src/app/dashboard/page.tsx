import { SubpageVisual } from "@/components/SubpageVisual";
export default function DashboardPage() {
  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Access Control Dashboard</h1>
        <p className="text-gray-600">Monitor access activity, manage policies, and configure integrations across your venues.</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Active Venues</div>
          <div className="text-3xl font-bold text-blue-600">12</div>
          <div className="text-xs text-gray-500 mt-1">+2 this month</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Access Events (24h)</div>
          <div className="text-3xl font-bold text-blue-600">1,847</div>
          <div className="text-xs text-gray-500 mt-1">+12% vs yesterday</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Active Tokens</div>
          <div className="text-3xl font-bold text-blue-600">3,421</div>
          <div className="text-xs text-gray-500 mt-1">89 expiring today</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Policy Violations</div>
          <div className="text-3xl font-bold text-red-600">7</div>
          <div className="text-xs text-gray-500 mt-1">Requires attention</div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Access Activity</h2>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live</span>
          </div>
          <p className="text-gray-600 mb-4">Monitor real-time access events and analytics across all venues.</p>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Real-time event stream</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Entry/exit analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Anomaly detection</span>
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Activity
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Policy Management</h2>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">12 Active</span>
          </div>
          <p className="text-gray-600 mb-4">Create and manage access control policies with fine-grained rules.</p>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Time-based restrictions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Resource scoping</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Conditional logic</span>
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Manage Policies
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Integrations</h2>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">5 Connected</span>
          </div>
          <p className="text-gray-600 mb-4">Connect with your existing systems, hardware, and tools.</p>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Hardware readers</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>Webhook endpoints</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span>API credentials</span>
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Configure
          </button>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recent Access Events</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <div className="font-medium text-sm">Main Entrance - Venue A</div>
                <div className="text-xs text-gray-500">user_xyz789 • 2 minutes ago</div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Granted</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <div className="font-medium text-sm">Parking Gate - Venue B</div>
                <div className="text-xs text-gray-500">user_abc123 • 5 minutes ago</div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Granted</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <div className="font-medium text-sm">Side Door - Venue A</div>
                <div className="text-xs text-gray-500">user_def456 • 8 minutes ago</div>
              </div>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Denied</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            View All Events
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-sm">Issue New Access Token</div>
              <div className="text-xs text-gray-500">Generate a signed pass for a user</div>
            </button>
            <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-sm">Revoke Token</div>
              <div className="text-xs text-gray-500">Immediately blacklist an access token</div>
            </button>
            <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-sm">Create Policy</div>
              <div className="text-xs text-gray-500">Define new access control rules</div>
            </button>
            <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors">
              <div className="font-medium text-sm">Add Venue</div>
              <div className="text-xs text-gray-500">Register a new physical location</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
