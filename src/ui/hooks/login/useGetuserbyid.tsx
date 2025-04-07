/**
 * User Data Fetching Hook
 * 
 * A custom hook that fetches detailed user information by user ID.
 * It handles various error conditions and loading states, including:
 * - Network errors
 * - Authentication failures
 * - User not found errors
 * - Server errors
 * 
 * The hook automatically logs out the user if their session is invalid.
 */

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the user's detailed information
 */
interface UserData {
  id: number;          // User's unique identifier
  name: string;        // User's full name
  email: string;       // User's email address
  address: string;     // User's physical address
  role: string;        // User's role/permissions
  // Add other user fields as needed
}

/**
 * Hook to fetch and manage user data by ID
 * @param {number} userId - The ID of the user to fetch
 * @returns {Object} Object containing user data, loading state, and any error messages
 */
const useGetUserById = (userId: number) => {
  // State management for user data and request status
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * Fetches user data from the server
     * Handles various error conditions and updates state accordingly
     */
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Attempt to fetch user data
        const response = await axiosInstance.get<UserData>(`/user/${userId}`);
        setUser(response.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError;
          // Handle different types of network and server errors
          if (error.code === 'ERR_NETWORK') {
            setError("Network error: Unable to connect to the server");
          } else if (error.response) {
            switch (error.response.status) {
              case 401:
                setError("Unauthorized: Please log in again");
                dispatch(logout());  // Log out user if unauthorized
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
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have a valid user ID
    if (userId) {
      fetchUser();
    }
  }, [userId, dispatch]);

  return { user, loading, error };
};

export default useGetUserById;