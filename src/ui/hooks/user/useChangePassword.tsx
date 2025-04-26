/**
 * @file hooks/user/useChangePassword.tsx
 * @module UI/Hooks/User
 * @description Password Change Hook
 * 
 * A custom hook that provides functionality for changing user passwords.
 * It handles loading states, error handling, and success feedback.
 * 
 * Features:
 * - Change user password with old and new password validation
 * - Handle loading states
 * - Error handling with specific error messages
 * - Success state management
 * - Detailed error logging for debugging
 * 
 * This hook provides a standardized way to change user passwords
 * and handle the associated loading states, success feedback,
 * and error messages.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

/**
 * Interface representing the data required for password change
 * @interface ChangePasswordData
 * @property {string} oldPassword - Current password of the user
 * @property {string} newPassword - New password to set for the user
 */
interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

/**
 * Custom hook for changing user passwords
 * 
 * @function useChangePassword
 * @returns {Object} Object containing password change function and state
 * @property {(passwordData: ChangePasswordData) => Promise<any>} changePassword - Function to change password
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {boolean} success - Success state indicator
 * @example
 * const { changePassword, loading, error, success } = useChangePassword();
 * 
 * // Change user password
 * const handleSubmit = async (data) => {
 *   await changePassword({
 *     oldPassword: data.oldPassword,
 *     newPassword: data.newPassword
 *   });
 *   if (success) {
 *     // Password changed successfully
 *   }
 * };
 */

const useChangePassword = () => {
  // State management for loading, error, and success
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * Change user password
   * 
   * This function handles the API call to change the user's password and manages
   * loading states, error handling, and success feedback.
   * 
   * @param {ChangePasswordData} passwordData - Object containing old and new passwords
   * @returns {Promise<any>} Response data from the server or null if error
   * 
   * Error handling includes:
   * - Network errors
   * - Wrong old password (401)
   * - User not found (404)
   * - Invalid password data (400)
   * - Incorrect old password (403)
   * - Server errors (500)
   * - Other unexpected errors
   * 
   * The function also logs detailed error information for debugging purposes.
   */
  const changePassword = async (passwordData: ChangePasswordData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    console.log('Sending password change request:', JSON.stringify(passwordData));

    try {
      const response = await axiosInstance.patch('/auth/changePassword', passwordData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        console.error('Password change error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        
        if (error.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (error.response) {
          switch (error.response.status) {
            case 401:
              setError("wrong old password")
              break;
           
            case 404:
              setError("User not found");
              break;
            case 400:
              const errorData = error.response.data as { message?: string };
              if (errorData.message) {
                setError(`Bad request: ${errorData.message}`);
              } else {
                setError("Invalid password data");
              }
              break;
            case 403:
              setError("Incorrect old password");
              break;
            case 500:
              setError("Server error");
              break;
            default:
              setError(`Error: ${error.response.status}`);
          }
        }
      } else {
        console.error('Non-Axios error:', err);
        setError("An unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    error,
    success
  };
};

export default useChangePassword; 