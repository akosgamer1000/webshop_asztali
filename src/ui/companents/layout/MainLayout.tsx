/**
 * Main Layout Component
 * 
 * The root layout component that provides the basic structure for all pages.
 * It includes:
 * - Responsive sidebar navigation
 * - Top header bar
 * - Main content area
 * 
 * Uses Tailwind CSS for styling and responsive design.
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import Header from '../header';

/**
 * Main layout component that wraps all application pages
 * @returns {JSX.Element} A layout with sidebar, header, and main content area
 */
const MainLayout: React.FC = () => {
  // State for controlling sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    // Main container with flex layout and minimum height
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with toggle functionality */}
      <Sidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
      
      {/* Main content area with responsive margin */}
      <div className="flex-1 ml-0 md:ml-64 transition-all">
        {/* Header with sidebar toggle */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main content container with padding */}
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 