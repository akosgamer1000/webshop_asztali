/**
 * Settings Slice
 * 
 * Redux slice for managing application settings state.
 * Provides functionality to save, load, and update application settings.
 * Settings are persisted in local storage for persistence across sessions.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

/**
 * Interface representing a single setting option
 * 
 * @property {number} id - Unique identifier for the setting
 * @property {string} title - Display title for the setting
 * @property {string} description - Detailed description of the setting
 * @property {boolean} enabled - Current state of the setting (enabled/disabled)
 */
export interface SettingOption {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
}

/**
 * Interface representing the settings state in Redux
 * 
 * @property {SettingOption[]} settings - Array of setting options
 */
interface SettingsState {
  settings: SettingOption[];
}

/**
 * Loads settings from local storage or returns default settings if none exist
 * 
 * Attempts to parse settings from localStorage.getItem('appSettings')
 * Falls back to default settings if parsing fails or no settings exist
 * 
 * @returns {SettingsState} The loaded or default settings state
 */
function loadSettingsFromLocalStorage(): SettingsState {
  const savedSettings = localStorage.getItem('appSettings');
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.error('Failed to parse saved settings:', e);
    }
  }
  
  // Default settings if none exist in local storage
  return {
    settings: [
      {
        id: 2,
        title: "Analytics",
        description: "Collect anonymous usage data",
        enabled: false
      }
    ]
  };
}

// Initialize state with settings from local storage or defaults
const initialState: SettingsState = loadSettingsFromLocalStorage();

/**
 * Redux slice for settings management
 * 
 * Provides reducers for saving and updating settings
 * Automatically persists settings to local storage when changed
 */
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /**
     * Saves a complete set of settings
     * 
     * @param {SettingsState} state - Current state
     * @param {PayloadAction<SettingOption[]>} action - Action containing new settings
     */
    saveSettings(state, action: PayloadAction<SettingOption[]>) {
      state.settings = action.payload;
      localStorage.setItem('appSettings', JSON.stringify(state));
    },
    
    /**
     * Updates a single setting's enabled state
     * 
     * @param {SettingsState} state - Current state
     * @param {PayloadAction<{id: number, enabled: boolean}>} action - Action containing setting ID and new enabled state
     */
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

// Export actions
export const { saveSettings, updateSetting } = settingsSlice.actions;

/**
 * Selector to get all settings from state
 * 
 * @param {RootState} state - Redux root state
 * @returns {SettingOption[]} Array of all settings
 */
export const selectSettings = (state: RootState) => state.settings.settings;

/**
 * Selector to get a specific setting by ID
 * 
 * @param {number} id - ID of the setting to retrieve
 * @returns {Function} Selector function that takes state and returns the setting or undefined
 */
export const selectSettingById = (id: number) => (state: RootState) => 
  state.settings.settings.find(setting => setting.id === id);

export default settingsSlice.reducer; 