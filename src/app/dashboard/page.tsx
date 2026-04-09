export default function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Access Activity</h2>
          <p className="text-gray-600">Monitor real-time access events and analytics.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Policy Management</h2>
          <p className="text-gray-600">Create and manage access control policies.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Integrations</h2>
          <p className="text-gray-600">Connect with your existing systems and tools.</p>
        </div>
      </div>
    </div>
  );
}
