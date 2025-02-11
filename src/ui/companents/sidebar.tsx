import React from 'react';
import { Home, Users, Settings, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-slate-800 text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Home className="h-5 w-5 mr-3" />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Users className="h-5 w-5 mr-3" />
            <span>Users</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </a>
          <div className="pt-6 border-t border-slate-700">
            <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-slate-700 rounded-lg transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;