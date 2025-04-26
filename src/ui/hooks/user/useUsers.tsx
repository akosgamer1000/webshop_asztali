/**
 * @file hooks/user/useUsers.tsx
 * @module UI/Hooks/User
 * @description Users Management Hook
 * 
 * A custom hook that provides functionality for fetching and managing users.
 * It handles loading states, error handling, and automatic data fetching.
 * 
 * Features:
 * - Fetch all users
 * - Handle loading states
 * - Error handling with specific error messages
 * - Automatic logout on authentication errors
 * - Refetch functionality
 * 
 * This hook provides a standardized way to fetch all users
 * and handle the associated loading states and error messages.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the structure of a user
 * @interface UserData
 * @property {number} id - Unique identifier for the user
 * @property {string} name - Name of the user
 * @property {string} email - Email address of the user
 * @property {string} password - Password of the user (hashed)
 * @property {string} address - Address of the user
 * @property {string} role - Role of the user (e.g., 'admin', 'user')
 */
interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  address:string;
  role: string;
}

/**
 * Custom hook for fetching and managing users
 *
 * @function useUsers
 * @returns {Object} Object containing users data and management functions
 * @property {UserData[]} users - Array of users
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {() => Promise<void>} refetch - Function to refetch users
 * @example
 * const { users, loading, error, refetch } = useUsers();
 * 
 * if (loading) {
 *   return <div>Loading...</div>;
 * }
 * 
 * if (error) {
 *   return <div>{error}</div>;
 * }
 * 
 * return (
 *   <UserList 
 *     users={users} 
 *     onRefresh={refetch} 
 *   />
 * );
 */
const useUsers = () => {
  // State management for users, loading, and error
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * Fetch users from the server
   * 
   * This function handles the API call to fetch users and manages
   * loading states and error handling. It automatically logs out
   * the user if an authentication error occurs.
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Not found errors (404)
   * - Server errors (500)
   * - Request errors
   * - Other unexpected errors
   */
  const fetchUsers = useCallback(async () => {
    console.log("Fetching users...");
    setLoading(true);
    try {
      const response = await axiosInstance.get<UserData[]>("/user");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server. Please check if the server is running.");
        } else if (error.response) {
          switch (error.response.status) {
            case 401:
              setError("Unauthorized: Please log in again");
              dispatch(logout());
              break;
            case 404:
              setError("API endpoint not found. Please check the server configuration.");
              break;
            case 500:
              setError("Internal server error. Please try again later.");
              break;
            default:
              setError(`Server error: ${error.response.status} - ${error.response.statusText}`);
          }
        } else if (error.request) {
          setError("No response received from server. Please check your connection.");
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
};

export default useUsers;