import React, { useState } from 'react';
import "../style/basic.css";
import { useDispatch } from 'react-redux';
import { logout } from '../misch/store/authSlice';

interface SettingOption {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
}

const Setting: React.FC = () => {
  const dispatch = useDispatch();
  
  const [settings, setSettings] = useState<SettingOption[]>([
    {
      id: 1,
      title: "Log Out",
      description: "Sign out of your account",
      enabled: false
    },
    {
      id: 2,
      title: "Email Notifications",
      description: "Receive email notifications for new orders",
      enabled: true
    },
    {
      id: 3,
      title: "Auto Save",
      description: "Automatically save changes to products",
      enabled: true
    },
    {
      id: 4,
      title: "Analytics",
      description: "Collect anonymous usage data",
      enabled: false
    }
  ]);

  const toggleSetting = (id: number) => {
    if (id === 1) {
      // Handle logout
      dispatch(logout());
      return;
    }
    
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <div className="overflow-x-auto mt-5">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Application Settings</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your application preferences</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {settings.map((setting) => (
            <div key={setting.id} className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{setting.title}</h3>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <div className="ml-4">
                {setting.id === 1 ? (
                  <button
                    onClick={() => toggleSetting(setting.id)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    onClick={() => toggleSetting(setting.id)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        setting.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;