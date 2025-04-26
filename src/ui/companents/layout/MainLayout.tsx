/**
 * @file companents/layout/MainLayout.tsx
 * @module UI/Components/Layout
 * @description Main Layout Component
 * 
 * The root layout component that provides the basic structure for all pages.
 * It includes:
 * - Responsive sidebar navigation
 * - Top header bar
 * - Main content area
 * - Mobile-responsive design
 * - Sidebar toggle functionality
 * 
 * This component serves as the main container for all pages in the application,
 * providing consistent navigation and layout across the entire user interface.
 * Uses Tailwind CSS for styling and responsive design.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import Header from '../header';

/**
 * Main layout component that wraps all application pages
 * @component
 * @returns {JSX.Element} A layout with sidebar, header, and main content area
 * @example
 * // In router configuration
 * <Route element={<MainLayout />}>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/products" element={<Products />} />
 * </Route>
 */
const MainLayout: React.FC = () => {
  /**
   * State for controlling sidebar visibility on mobile
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  /**
   * Toggle sidebar visibility
   * @function toggleSidebar
   * @inner
   */
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    // Main container with flex layout and minimum height
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with toggle functionality */}
      <Sidebar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
      
      {/* Main content area with responsive margin */}
      <div className="flex-1 ml-0 md:ml-64 transition-all">
        {/* Header with sidebar toggle */}
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Main content container with padding */}
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 