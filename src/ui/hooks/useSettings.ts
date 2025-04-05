import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../misch/Store';
import { selectSettings, selectSettingById, updateSetting } from '../misch/store/settingsSlice';

/**
 * Custom hook for accessing and managing application settings
 */
export function useSettings() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);

  /**
   * Check if a specific setting is enabled
   * @param id Setting ID to check
   * @returns boolean indicating if setting is enabled, false if setting not found
   */
  const isEnabled = useCallback((id: number): boolean => {
    const setting = useAppSelector(selectSettingById(id));
    return setting?.enabled || false;
  }, []);

  /**
   * Toggle a setting on or off
   * @param id Setting ID to toggle
   * @param value Optional explicit value to set (true/false), otherwise toggles current value
   */
  const toggleSetting = useCallback((id: number, value?: boolean) => {
    const setting = useAppSelector(selectSettingById(id));
    if (setting) {
      const newValue = value !== undefined ? value : !setting.enabled;
      dispatch(updateSetting({ id, enabled: newValue }));
    }
  }, [dispatch]);

  return {
    settings,
    isEnabled,
    toggleSetting
  };
}

// Define constants for common settings
export const SETTINGS = {
  EMAIL_NOTIFICATIONS: 2,
  AUTO_SAVE: 3,
  ANALYTICS: 4
}; 