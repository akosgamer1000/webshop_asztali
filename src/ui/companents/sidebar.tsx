/**
 * @file companents/sidebar.tsx
 * @module UI/Components/Layout
 * @description Sidebar Navigation Component
 * 
 * A navigation sidebar that provides:
 * - Main navigation links for authenticated users
 * - Login link for unauthenticated users
 * - User profile access
 * - Logout functionality
 * 
 * The sidebar is fixed on desktop.
 * It uses Redux for authentication state management and includes
 * dynamic routing based on user authentication status.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React from 'react';
import "../style/basic.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../misch/Store';
import { logout } from '../misch/store/authSlice';
import type { RootState } from '../misch/Store';
import useGetUserId from "../hooks/login/useGetUserId";

/**
 * Sidebar Component
 * 
 * @component
 * @description A functional component that renders a navigation sidebar.
 * Displays different navigation options based on user authentication status.
 * 
 * @returns {JSX.Element} A navigation sidebar component
 * @example
 * <Sidebar />
 */
const Sidebar: React.FC = () => {
  // Get the dispatch function from Redux store
  const dispatch = useAppDispatch();
  
  // Check if user is authenticated by looking for token in Redux store
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  
  // Get the current user's ID using reliable hook that doesn't depend on API calls
  const userId = useGetUserId();

  /**
   * Handles user logout by dispatching the logout action
   * This will clear the auth token and user state
   * 
   * @function
   * @returns {void}
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // Main sidebar container
    // - Fixed positioning
    // - Full height
    // - Dark background
    <div className="fixed top-0 left-0 h-full bg-gray-800 text-white p-5 w-64">
      {/* Sidebar header */}
      <h2 className="text-center text-xl font-bold mb-5">Admin</h2>
      
      {/* Navigation links container */}
      <ul className="space-y-4">
        {/* Conditional rendering based on authentication status */}
        {isAuthenticated ? (
          <>
            {/* Product management link */}
            <li>
              <Link
                to="/products"
                className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
              >
                Product
              </Link>
            </li>
            
            {/* Order management link */}
            <li>
              <Link
                to="/orders"
                className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
              >
                Orders
              </Link>
            </li>
            
            {/* User management link */}
            <li>
              <Link
                to="/users"
                className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
              >
                Users
              </Link>
            </li>
            
            {/* User profile link with dynamic ID */}
            <li>
              <Link
                to={userId ? `/profile/${userId}` : "#"}
                className={`block p-3 rounded hover:bg-gray-700 ${
                  !userId ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
                }`}
              >
                Profile
              </Link>
            </li>
            
            {/* Logout button */}
            <li>
              <button
                onClick={handleLogout}
                className="block w-full p-3 rounded hover:bg-gray-700 cursor-pointer text-left"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          // Login link for unauthenticated users
          <li>
            <Link
              to="/login"
              className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
