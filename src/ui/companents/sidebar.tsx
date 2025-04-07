/**
 * Sidebar Component
 * 
 * A responsive navigation sidebar that provides:
 * - Main navigation links for authenticated users
 * - Login link for unauthenticated users
 * - User profile access
 * - Logout functionality
 * 
 * The sidebar is collapsible on mobile devices and fixed on desktop.
 * It uses Redux for authentication state management and includes
 * dynamic routing based on user authentication status.
 * 
 * @param {Function} toggleSidebar - Callback function to toggle sidebar visibility
 * @param {boolean} isOpen - Current state of sidebar visibility
 * @returns {JSX.Element} A navigation sidebar component
 */

import React from 'react';
import "../style/basic.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../misch/Store';
import { logout } from '../misch/store/authSlice';
import type { RootState } from '../misch/Store';
import useGetLogged from "../hooks/login/useGetlogged";

// Component that renders the navigation sidebar
const Sidebar: React.FC<{ toggleSidebar: () => void; isOpen: boolean }> = ({
  isOpen,
}) => {
  // Get the dispatch function from Redux store
  const dispatch = useAppDispatch();
  
  // Check if user is authenticated by looking for token in Redux store
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  
  // Get the current user's ID using custom hook
  const { id } = useGetLogged(); 

  /**
   * Handles user logout by dispatching the logout action
   * This will clear the auth token and user state
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // Main sidebar container with responsive classes
    // - Fixed positioning
    // - Full height
    // - Dark background
    // - Transforms for mobile slide animation
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-5 transition-transform w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
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
                to={`/profile/${id || ''}`}
                className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
              >
                Profile
              </Link>
            </li>
            
            {/* Settings page link */}
            <li>
              <Link
                to="/setting"
                className="block p-3 rounded hover:bg-gray-700 cursor-pointer"
              >
                Settings
              </Link>
            </li>
            
            {/* Logout button */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 rounded hover:bg-gray-700 cursor-pointer"
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
