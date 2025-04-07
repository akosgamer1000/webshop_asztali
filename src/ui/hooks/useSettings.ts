/**
 * Settings Management Hook
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
 */

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../misch/Store';
import { selectSettings, selectSettingById, updateSetting } from '../misch/store/settingsSlice';

/**
 * Custom hook for accessing and managing application settings
 * @returns {Object} Object containing settings state and management functions
 */
export function useSettings() {
  // Get Redux dispatch function and current settings state
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);

  /**
   * Check if a specific setting is enabled
   * @param {number} id - Setting ID to check
   * @returns {boolean} - true if setting is enabled, false if setting not found or disabled
   */
  const isEnabled = useCallback((id: number): boolean => {
    const setting = useAppSelector(selectSettingById(id));
    return setting?.enabled || false;
  }, []);

  /**
   * Toggle a setting on or off
   * @param {number} id - Setting ID to toggle
   * @param {boolean} [value] - Optional explicit value to set (true/false)
   *                          If not provided, toggles the current value
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
 */
export const SETTINGS = {
  EMAIL_NOTIFICATIONS: 2,  // Email notification settings
  AUTO_SAVE: 3,           // Auto-save functionality
  ANALYTICS: 4            // Analytics tracking
}; 