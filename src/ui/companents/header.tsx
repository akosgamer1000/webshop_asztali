/**
 * @file companents/header.tsx
 * @module UI/Components/Layout
 * @description Header Component
 * 
 * A responsive header component for the admin panel that includes:
 * - A hamburger menu button (visible only on mobile devices)
 * - The application title with brand identity
 * - Sticky positioning for consistent navigation
 * 
 * This component serves as the top navigation bar across all pages,
 * providing consistent branding and mobile navigation controls.
 * Uses Tailwind CSS for styling and responsive design.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import  "../style/basic.css";

/**
 * Header Component
 * 
 * @component
 * @description A functional component that renders the top header bar of the application.
 * Includes a hamburger menu button for mobile navigation and the application title.
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.toggleSidebar - Callback function to toggle the sidebar visibility
 * @returns {JSX.Element} A header component with navigation controls
 * @example
 * <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
 */
const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
    return (
      // Main header container
      // - White background
      // - Padding and shadow for depth
      // - Sticky positioning at top
      // - Flex layout for alignment
      <div className="bg-white p-4 shadow-md sticky top-0 z-50 flex items-center">
        {/* Hamburger menu button - only visible on mobile */}
        <button
          className="md:hidden text-gray-800 text-2xl mr-4"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        
        {/* Application title - centered and full width */}
        <h1 className="text-xl font-bold text-center w-full">Pixelforge Admin</h1>
      </div>
    );
  };
  export default Header;