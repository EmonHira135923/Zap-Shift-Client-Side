import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Welcome to your administration panel</p>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Dashboard Overview
              </h2>
              <p className="text-gray-400">
                This is your admin dashboard. You can manage your application
                from here.
              </p>
            </div>
          </div>

          {/* Side Panel */}
          <div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Stats
              </h3>
              <p className="text-gray-400 text-sm">
                Your admin panel is ready. More features coming soon.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Admin Panel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
