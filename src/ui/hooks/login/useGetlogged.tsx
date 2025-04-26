/**
 * @file hooks/login/useGetlogged.tsx
 * @module UI/Hooks/Login
 * @description Authentication Hook - Get Logged User
 * 
 * A custom hook that fetches and manages the currently logged-in user's information.
 * It handles various authentication states and error conditions, including:
 * - Network errors
 * - Authentication failures
 * - Server errors
 * - Session expiration
 * 
 * The hook automatically logs out the user if their session is invalid or expired.
 * 
 * This hook provides a standardized way to access the current user's authentication state
 * and handle the associated loading states and error messages.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * User interface representing the authenticated user's data
 * @interface User
 * @property {number} id - User's unique identifier
 * @property {string} username - User's username
 * @property {string} role - User's role/permissions
 * @property {number} iat - Token issued at timestamp
 * @property {number} exp - Token expiration timestamp
 */
interface User {
  id: number;          // User's unique identifier
  username: string;    // User's username
  role: string;        // User's role/permissions
  iat: number;         // Token issued at timestamp
  exp: number;         // Token expiration timestamp
}

/**
 * Custom hook to fetch and manage the currently logged-in user
 * 
 * @function useGetLogged
 * @returns {Object} Object containing user information and state
 * @property {number | null} id - The logged-in user's ID or null if not logged in
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @example
 * const { id, loading, error } = useGetLogged();
 * 
 * if (loading) {
 *   return <div>Loading...</div>;
 * }
 * 
 * if (error) {
 *   return <div>{error}</div>;
 * }
 * 
 * if (id) {
 *   return <UserProfile userId={id} />;
 * } else {
 *   return <LoginForm />;
 * }
 */
const useGetLogged = () => {
  // State management for user data and request status
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * Fetches the logged-in user's profile from the server
     * Handles various error conditions and updates state accordingly
     */
    const fetchLoggedUser = async () => {
      try {
        // Attempt to fetch user profile
        const response = await axiosInstance.get<User>("/auth/profile");
        setId(response.data.id);
        setError(null);
      } catch (err) {
        if (err instanceof AxiosError) {
          // Handle different types of network and server errors
          if (err.code === 'ERR_NETWORK') {
            setError("Network error: Unable to connect to the server");
          } else if (err.response) {
            switch (err.response.status) {
              case 401:
                setError("Unauthorized: Please log in again");
                dispatch(logout());  // Log out user if unauthorized
                break;
              case 403:
                setError("Forbidden: Access denied");
                break;
              case 404:
                setError("User profile not found");
                break;
              case 500:
                setError("Server error");
                break;
              default:
                setError(`Error: ${err.response.status}`);
            }
          }
        } else {
          setError("An unexpected error occurred");
        }
        setId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedUser();
  }, []);

  return { id, loading, error };
};

export default useGetLogged;