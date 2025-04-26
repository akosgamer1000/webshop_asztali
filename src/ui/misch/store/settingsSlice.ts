/**
 * @file misch/store/settingsSlice.ts
 * @module UI/State/Settings
 * @description Settings Slice
 * 
 * Redux slice for managing application settings state.
 * Provides functionality to save, load, and update application settings.
 * Settings are persisted in local storage for persistence across sessions.
 * 
 * This slice centralizes all settings-related state management,
 * ensuring consistent handling of user preferences across the application.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

/**
 * Interface representing a single setting option
 * @interface SettingOption
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
 * @interface SettingsState
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
 * @function loadSettingsFromLocalStorage
 * @returns {SettingsState} The loaded or default settings state
 * @private
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

/**
 * Initial settings state loaded from localStorage or with default values
 * @type {SettingsState}
 */
const initialState: SettingsState = loadSettingsFromLocalStorage();

/**
 * Redux slice for settings management
 * 
 * Provides reducers for saving and updating settings
 * Automatically persists settings to local storage when changed
 * 
 * @constant {Slice<SettingsState>}
 */
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /**
     * Saves a complete set of settings
     * 
     * @function saveSettings
     * @param {SettingsState} state - Current state
     * @param {PayloadAction<SettingOption[]>} action - Action containing new settings
     * @example
     * dispatch(saveSettings([
     *   { id: 2, title: 'Analytics', description: 'Collect anonymous usage data', enabled: true }
     * ]));
     */
    saveSettings(state, action: PayloadAction<SettingOption[]>) {
      state.settings = action.payload;
      localStorage.setItem('appSettings', JSON.stringify(state));
    },
    
    /**
     * Updates a single setting's enabled state
     * 
     * @function updateSetting
     * @param {SettingsState} state - Current state
     * @param {PayloadAction<{id: number, enabled: boolean}>} action - Action containing setting ID and new enabled state
     * @example
     * dispatch(updateSetting({ id: 2, enabled: true }));
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
 * @function selectSettings
 * @param {RootState} state - Redux root state
 * @returns {SettingOption[]} Array of all settings
 * @example
 * const allSettings = useAppSelector(selectSettings);
 */
export const selectSettings = (state: RootState) => state.settings.settings;

/**
 * Selector to get a specific setting by ID
 * 
 * @function selectSettingById
 * @param {number} id - ID of the setting to retrieve
 * @returns {Function} Selector function that takes state and returns the setting or undefined
 * @example
 * const analyticsSetting = useAppSelector(selectSettingById(SETTINGS.ANALYTICS));
 */
export const selectSettingById = (id: number) => (state: RootState) => 
  state.settings.settings.find(setting => setting.id === id);

export default settingsSlice.reducer; 