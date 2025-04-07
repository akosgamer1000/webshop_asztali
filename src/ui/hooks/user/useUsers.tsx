/**
 * Users Management Hook
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
 * Custom hook for managing users
 * 
 * This hook provides functionality for fetching and managing users.
 * It automatically fetches users when mounted and provides methods
 * for refetching data when needed.
 * 
 * Usage example:
 * ```tsx
 * const { users, loading, error, refetch } = useUsers();
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} />;
 * 
 * return (
 *   <div>
 *     {users.map(user => (
 *       <UserCard key={user.id} user={user} />
 *     ))}
 *   </div>
 * );
 * ```
 * 
 * @returns {Object} Object containing users data and management functions
 * @property {UserData[]} users - Array of users
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {() => Promise<void>} refetch - Function to refetch users
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