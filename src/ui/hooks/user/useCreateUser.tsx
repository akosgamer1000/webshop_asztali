/**
 * User Creation Hook
 * 
 * A custom hook that provides functionality for creating new users.
 * It handles loading states, error handling, and authentication.
 * 
 * Features:
 * - Create new users with required information
 * - Handle loading states
 * - Error handling with specific error messages
 * - Automatic logout on authentication errors
 */

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the data required for user creation
 * @interface UserData
 * @property {string} name - Name of the user
 * @property {string} email - Email address of the user
 * @property {string} password - Password for the user account
 * @property {string} address - Address of the user
 * @property {string} role - Role of the user (e.g., 'admin', 'user')
 */
interface UserData {
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
}

/**
 * Custom hook for creating new users
 * 
 * This hook provides functionality for creating new users and managing
 * the creation process state, including loading and error states.
 * 
 * Usage example:
 * ```tsx
 * const { createUser, loading, error } = useCreateUser();
 * 
 * const handleCreateUser = async () => {
 *   const result = await createUser({
 *     name: "John Doe",
 *     email: "john@example.com",
 *     password: "securePassword",
 *     address: "123 Main St",
 *     role: "user"
 *   });
 *   
 *   if (result) {
 *     // Handle success
 *   } else {
 *     // Handle error
 *   }
 * };
 * ```
 * 
 * @returns {Object} Object containing user creation function and state
 * @property {(userData: UserData) => Promise<any>} createUser - Function to create user
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 */
const useCreateUser = () => {
  // State management for loading and error
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * Create a new user
   * 
   * This function handles the API call to create a new user and manages
   * loading states and error handling.
   * 
   * @param {UserData} userData - Data for the new user
   * @returns {Promise<any>} Response data from the server or null if error
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Validation errors (400)
   * - Server errors (500)
   * - Other unexpected errors
   */
  const createUser = async (userData: UserData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/user', userData);
      return response.data;
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
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};

export default useCreateUser;