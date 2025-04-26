/**
 * @file companents/header.tsx
 * @module UI/Components/Layout
 * @description Header Component
 * 
 * A header component for the admin panel that includes:
 * - The application title with brand identity
 * - Sticky positioning for consistent navigation
 * 
 * This component serves as the top navigation bar across all pages,
 * providing consistent branding.
 * Uses Tailwind CSS for styling.
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
 * Includes the application title.
 * 
 * @returns {JSX.Element} A header component
 * @example
 * <Header />
 */
const Header: React.FC = () => {
    return (
      // Main header container
      // - White background
      // - Padding and shadow for depth
      // - Sticky positioning at top
      // - Flex layout for alignment
      <div className="bg-white p-4 shadow-md sticky top-0 z-50 flex items-center">
        {/* Application title - centered and full width */}
        <h1 className="text-xl font-bold text-center w-full">Pixelforge Admin</h1>
      </div>
    );
  };

export default Header;