/**
 * Header Component
 * 
 * A responsive header component for the admin panel that includes:
 * - A hamburger menu button (visible only on mobile devices)
 * - The application title
 * 
 * The header is sticky positioned and includes a shadow for visual hierarchy.
 * It uses Tailwind CSS for styling and is fully responsive.
 * 
 * @param {Function} toggleSidebar - Callback function to toggle the sidebar visibility
 * @returns {JSX.Element} A header component with navigation controls
 */

import  "../style/basic.css";

// Component that renders the top header bar
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
        <h1 className="text-xl font-bold text-center w-full">Admin Panel</h1>
      </div>
    );
  };
  export default Header;