import React from 'react';

const Content: React.FC = () => {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-semibold text-gray-800">Welcome to the Admin Dashboard</h3>
        <p className="mt-2 text-gray-600">This is the main content area</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800">Users</h4>
            <p className="mt-2 text-blue-600">Manage your users here</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-green-800">Analytics</h4>
            <p className="mt-2 text-green-600">View your statistics</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-purple-800">Settings</h4>
            <p className="mt-2 text-purple-600">Configure your dashboard</p>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h4>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">New user registration</span>
                </div>
                <span className="text-sm text-gray-500">5 minutes ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">System update completed</span>
                </div>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;