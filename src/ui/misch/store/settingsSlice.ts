import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface SettingOption {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
}

interface SettingsState {
  settings: SettingOption[];
}

// Load saved settings from localStorage if available
function loadSettingsFromLocalStorage(): SettingsState {
  const savedSettings = localStorage.getItem('appSettings');
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.error('Failed to parse saved settings:', e);
    }
  }
  
  // Default settings if none found in localStorage
  return {
    settings: [
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
    ]
  };
}

const initialState: SettingsState = loadSettingsFromLocalStorage();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    saveSettings(state, action: PayloadAction<SettingOption[]>) {
      state.settings = action.payload;
      localStorage.setItem('appSettings', JSON.stringify(state));
    },
    updateSetting(state, action: PayloadAction<{id: number, enabled: boolean}>) {
      const { id, enabled } = action.payload;
      const setting = state.settings.find(s => s.id === id);
      if (setting) {
        setting.enabled = enabled;
        localStorage.setItem('appSettings', JSON.stringify(state));
      }
    }
  }
});

export const { saveSettings, updateSetting } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings.settings;
export const selectSettingById = (id: number) => (state: RootState) => 
  state.settings.settings.find(setting => setting.id === id);

export default settingsSlice.reducer; 