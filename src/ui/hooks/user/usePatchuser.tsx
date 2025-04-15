/**
 * User Update Hook
 * 
 * A custom hook that provides functionality for updating user information.
 * It handles loading states, error handling, and success feedback.
 * 
 * Features:
 * - Update user details (name, email, password, address, role)
 * - Handle loading states
 * - Error handling with specific error messages
 * - Success state management
 * - Automatic logout on authentication errors
 */

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the data that can be updated for a user
 * @interface UserUpdateData
 * @property {string} [name] - New name for the user
 * @property {string} [email] - New email for the user
 * @property {string} [password] - New password for the user
 * @property {string} [address] - New address for the user
 * @property {string} [role] - New role for the user
 */
interface UserUpdateData {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  role?: string;
}

/**
 * Interface representing the result of a user update operation
 * @interface UpdateUserResult
 * @property {boolean} success - Whether the update was successful
 * @property {string} [error] - Error message if the update failed
 */
interface UpdateUserResult {
  success: boolean;
  error?: string;
}

/**
 *

 * };
 * ```
 * 
 * @returns {Object} Object containing update function and state
 * @property {(userId: number, userData: UserUpdateData) => Promise<UpdateUserResult>} updateUser - Function to update user
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {boolean} success - Success state indicator
 */
const usePatchUser = () => {
  // State management for loading, error, and success
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  /**
   * Update user information
   * 
   * This function handles the API call to update user information and manages
   * loading states, error handling, and success feedback.
   * 
   * @param {number} userId - ID of the user to update
   * @param {UserUpdateData} userData - Data to update for the user
   * @returns {Promise<UpdateUserResult>} Result of the update operation
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Not found errors (404)
   * - Validation errors (400)
   * - Server errors (500)
   * - Other unexpected errors
   */
  const updateUser = async (userId: number, userData: UserUpdateData): Promise<UpdateUserResult> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axiosInstance.patch(`/user/${userId}`, userData);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (error.response) {
          switch (error.response.status) {
            case 401:
              setError("Unauthorized: Please log in again");
              dispatch(logout());
              break;
            case 404:
              setError(`User with ID ${userId} not found`);
              break;
            case 400:
              setError("Invalid user data");
              break;
            case 500:
              setError("Server error");
              break;
            default:
              setError(`Error: ${error.response.status}`);
          }
        }
      } else {
        setError("An unexpected error occurred");
      }
      return { success: false, error: error || undefined };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    loading,
    error,
    success
  };
};

export default usePatchUser;