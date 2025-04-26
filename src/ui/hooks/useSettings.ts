/**
 * @file hooks/useSettings.ts
 * @module UI/Hooks
 * @description Settings Management Hook
 * 
 * A custom hook that provides functionality for managing application settings.
 * It integrates with Redux for state management and provides methods for
 * checking and toggling settings.
 * 
 * Features:
 * - Access to all settings
 * - Check if specific settings are enabled
 * - Toggle settings on/off
 * - Type-safe setting IDs through constants
 * - Integration with Redux state management
 * 
 * This hook provides a standardized way to access and modify application settings
 * from any component, ensuring consistent behavior across the application.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../misch/Store';
import { selectSettings, selectSettingById, updateSetting } from '../misch/store/settingsSlice';

/**
 * @interface SettingItem
 * @property {number} id - Unique identifier for the setting
 * @property {string} name - Display name of the setting
 * @property {boolean} enabled - Whether the setting is enabled
 * @property {string} [description] - Optional description of the setting
 */

/**
 * @interface UseSettingsReturn
 * @property {SettingItem[]} settings - Array of all application settings
 * @property {(id: number) => boolean} isEnabled - Function to check if a setting is enabled
 * @property {(id: number, value?: boolean) => void} toggleSetting - Function to toggle a setting
 */

/**
 * Custom hook for accessing and managing application settings
 * @function useSettings
 * @returns {UseSettingsReturn} Object containing settings state and management functions
 * @example
 * const { settings, isEnabled, toggleSetting } = useSettings();
 * 
 * // Check if analytics is enabled
 * const analyticsEnabled = isEnabled(SETTINGS.ANALYTICS);
 * 
 * // Toggle analytics setting
 * <Switch 
 *   checked={analyticsEnabled}
 *   onChange={() => toggleSetting(SETTINGS.ANALYTICS)}
 * />
 */
export function useSettings() {
  // Get Redux dispatch function and current settings state
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);

  /**
   * Check if a specific setting is enabled
   * @function isEnabled
   * @param {number} id - Setting ID to check
   * @returns {boolean} - true if setting is enabled, false if setting not found or disabled
   * @example
   * const analyticsEnabled = isEnabled(SETTINGS.ANALYTICS);
   */
  const isEnabled = useCallback((id: number): boolean => {
    const setting = useAppSelector(selectSettingById(id));
    return setting?.enabled || false;
  }, []);

  /**
   * Toggle a setting on or off
   * @function toggleSetting
   * @param {number} id - Setting ID to toggle
   * @param {boolean} [value] - Optional explicit value to set (true/false)
   *                          If not provided, toggles the current value
   * @example
   * // Toggle a setting
   * toggleSetting(SETTINGS.ANALYTICS);
   * 
   * // Explicitly enable a setting
   * toggleSetting(SETTINGS.ANALYTICS, true);
   */
  const toggleSetting = useCallback((id: number, value?: boolean) => {
    const setting = useAppSelector(selectSettingById(id));
    if (setting) {
      const newValue = value !== undefined ? value : !setting.enabled;
      dispatch(updateSetting({ id, enabled: newValue }));
    }
  }, [dispatch]);

  return {
    settings,      // Current settings state
    isEnabled,     // Function to check if a setting is enabled
    toggleSetting  // Function to toggle or set a setting
  };
}

/**
 * Constants for common setting IDs
 * These IDs correspond to settings in the Redux store
 * @enum {number}
 */
export const SETTINGS = {
  AUTOSAVE: 1,            // Auto-save functionality
  ANALYTICS: 2           // Analytics tracking
}; 