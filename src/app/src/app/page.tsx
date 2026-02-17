export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to the Boon Coach Library
        </h1>
        <p className="text-lg text-gray-600">
          Built by Jamie Fuentes for the Boon coaching team. Your comprehensive resource for coaching frameworks, protocols, and tools.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          🚀 Everything you need for client sessions, crisis intervention, and professional development
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">
            Coaching Models
          </h3>
          <p className="text-gray-600 mb-4">
            GROW Model, Five Chairs, SCARF, and other proven frameworks
          </p>
          <div className="text-sm text-gray-500">
            21 models available
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">
            Session Programs
          </h3>
          <p className="text-gray-600 mb-4">
            Pathfinder, Impact Architect, Rising Star, Change Maker, Power Player
          </p>
          <div className="text-sm text-gray-500">
            5 program paths
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">
            SOPs & Protocols
          </h3>
          <p className="text-gray-600 mb-4">
            Salesforce navigation, crisis intervention, communication templates
          </p>
          <div className="text-sm text-gray-500">
            Operational guides
          </div>
        </div>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-teal-800 mb-3">
          Quick Reference
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-teal-700 mb-2">Session-Based Programs</h4>
            <ul className="text-sm text-teal-600 space-y-1">
              <li>• The Pathfinder - Career clarity & values</li>
              <li>• The Impact Architect - Strategic thinking</li>
              <li>• The Rising Star - Confidence & visibility</li>
              <li>• The Change Maker - Innovation & change</li>
              <li>• The Power Player - Executive presence</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-teal-700 mb-2">Emergency Contacts</h4>
            <ul className="text-sm text-teal-600 space-y-1">
              <li>• Crisis Line: 988 (Suicide & Crisis Lifeline)</li>
              <li>• Boon Support: Contact your supervisor</li>
              <li>• Technical Issues: IT Support Portal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
