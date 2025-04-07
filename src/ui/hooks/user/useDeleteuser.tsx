/**
 * User Deletion Hook
 * 
 * A custom hook that provides functionality for deleting users.
 * It handles loading states, error handling, and success feedback.
 * 
 * Features:
 * - Delete users by ID
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
 * Custom hook for deleting users
 * 
 * This hook provides functionality for deleting users and managing
 * the deletion process state, including loading, error, and success states.
 * 
 * Usage example:
 * ```tsx
 * const { deleteUser, loading, error, success } = useDeleteUser();
 * 
 * const handleDeleteUser = async (userId: number) => {
 *   const result = await deleteUser(userId);
 *   
 *   if (result) {
 *     // Handle success
 *   } else {
 *     // Handle error
 *   }
 * };
 * ```
 * 
 * @returns {Object} Object containing user deletion function and state
 * @property {(userId: number) => Promise<boolean>} deleteUser - Function to delete user
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {boolean} success - Success state indicator
 */
const useDeleteUser = () => {
  // State management for loading, error, and success
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  /**
   * Delete a user
   * 
   * This function handles the API call to delete a user and manages
   * loading states, error handling, and success feedback.
   * 
   * @param {number} userId - ID of the user to delete
   * @returns {Promise<boolean>} True if deletion was successful, false otherwise
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Not found errors (404)
   * - Server errors (500)
   * - Other unexpected errors
   */
  const deleteUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axiosInstance.delete(`/user/${userId}`);
      setSuccess(true);
      return true;
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
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error, success };
};

export default useDeleteUser;