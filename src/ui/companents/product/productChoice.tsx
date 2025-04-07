/**
 * Product Choice Component
 * 
 * A component that displays a grid of product type options for adding new products.
 * Features:
 * - Grid layout of product type options
 * - Each option has an icon, name, and description
 * - Responsive design (1 column on mobile, 2 on tablet, 3 on desktop)
 * - Hover effects and transitions
 * - Navigation to product-specific add forms
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Component that renders a selection grid for product types
 * @returns {JSX.Element} A grid of product type options
 */
const ProductChoice: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Available product types with their navigation paths and icons
   */
  const productTypes = [
    { name: 'Processor', path: 'processor', icon: '🔲' },      // CPU/Processor products
    { name: 'Memory', path: 'memory', icon: '💾' },           // RAM/Memory products
    { name: 'Hard Drive', path: 'harddrive', icon: '💿' },    // Storage products
    { name: 'Video Card', path: 'videocard', icon: '🎮' },    // GPU products
    { name: 'Motherboard', path: 'motherboard', icon: '🔌' }, // Motherboard products
    { name: 'CPU Cooler', path: 'cpucooler', icon: '❄️' },    // Cooling products
    { name: 'Power Supply', path: 'powersupply', icon: '⚡' }, // PSU products
    { name: 'Powerhouse', path: 'powerhouse', icon: '🏠' },   // Complete system products
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Select Product Type to Add
      </h1>
      
      {/* Product type grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productTypes.map((type) => (
          <button
            key={type.path}
            onClick={() => navigate(`/addProduct/${type.path}`)}
            className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            {/* Product type icon */}
            <span className="text-4xl mr-4">{type.icon}</span>
            <div>
              {/* Product type name */}
              <h2 className="text-xl font-semibold text-gray-800">
                {type.name}
              </h2>
              {/* Product type description */}
              <p className="text-gray-600 mt-1">
                Add new {type.name.toLowerCase()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductChoice;