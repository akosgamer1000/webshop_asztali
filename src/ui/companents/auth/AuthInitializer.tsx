/**
 * @file companents/auth/AuthInitializer.tsx
 * @module UI/Components/Auth
 * @description Authentication Initializer Component
 * 
 * A component that handles authentication initialization before
 * rendering the application. This helps solve timing issues with
 * user ID availability after login.
 * 
 * Features:
 * - Auto-login from localStorage on application start
 * - Token validation and userId extraction 
 * - Loading state management during initialization
 * - Centralized authentication initialization logic
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../misch/Store';
import { login, initializeComplete, getUserIdFromToken } from '../../misch/store/authSlice';
import { jwtDecode } from 'jwt-decode';

/**
 * Authentication Initializer Component
 * 
 * Handles authentication initialization before rendering the application.
 * Shows a loading indicator while initializing the auth state.
 * 
 * @component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render after initialization
 * @returns {JSX.Element} The initialized application or a loading indicator
 */
const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.auth.isInitialized);
  
  useEffect(() => {
    if (!isInitialized) {
      // Try to auto-login
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Validate token (check expiration)
          const decodedToken = jwtDecode<any>(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            // Token expired, clean up
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            dispatch(initializeComplete());
            return;
          }
          
          // Get userId from token if not in localStorage
          let userId = localStorage.getItem("userId");
          if (!userId) {
            userId = getUserIdFromToken(token);
          }
          
          // Dispatch login action
          dispatch(login({ token, userId: userId || '' }));
        } catch (error) {
          console.error("Failed to initialize auth state:", error);
          dispatch(initializeComplete());
        }
      } else {
        // No token, just mark as initialized
        dispatch(initializeComplete());
      }
    }
  }, [dispatch, isInitialized]);
  
  // Show a loading indicator if not initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-lg text-gray-700">Initializing application...</div>
        </div>
      </div>
    );
  }
  
  // Render children once initialized
  return <>{children}</>;
};

export default AuthInitializer; 