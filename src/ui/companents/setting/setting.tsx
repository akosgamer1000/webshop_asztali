import React, { useState, useEffect } from 'react';
import'../../style/basic.css'
import { useDispatch } from 'react-redux';
import { logout } from '../../misch/store/authSlice';
import { SettingOption, saveSettings, selectSettings } from '../../misch/store/settingsSlice';
import { useAppSelector } from '../../misch/Store';

const Setting: React.FC = () => {
  const dispatch = useDispatch();
  const reduxSettings = useAppSelector(selectSettings);
  
  const [settings, setSettings] = useState<SettingOption[]>(reduxSettings || []);
  const [unsavedSettings, setUnsavedSettings] = useState<SettingOption[]>(settings);
  const [hasChanges, setHasChanges] = useState(false);

 
  useEffect(() => {
    setSettings(reduxSettings);
    setUnsavedSettings(reduxSettings);
  }, [reduxSettings]);

  const toggleSetting = (id: number) => {
    setUnsavedSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
     
      dispatch(saveSettings(unsavedSettings));
      setSettings(unsavedSettings);
      setHasChanges(false);
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
      console.error('Error saving settings:', error);
    }
  };

  const handleCancel = () => {
    setUnsavedSettings(settings);
    setHasChanges(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="overflow-x-auto mt-5">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Application Settings</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your application preferences</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {unsavedSettings.map((setting) => (
            <div key={setting.id} className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{setting.title}</h3>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <div className="ml-4">
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
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Log Out
              </button>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleCancel}
                disabled={!hasChanges}
                className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                  hasChanges 
                    ? 'text-gray-700 hover:bg-gray-50' 
                    : 'text-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  hasChanges 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;