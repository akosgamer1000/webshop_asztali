import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductChoice: React.FC = () => {
  const navigate = useNavigate();

  const productTypes = [
    { name: 'Processor', path: 'processor', icon: '🔲' },
    { name: 'Memory', path: 'memory', icon: '💾' },
    { name: 'Hard Drive', path: 'harddrive', icon: '💿' },
    { name: 'Video Card', path: 'videocard', icon: '🎮' },
    { name: 'Motherboard', path: 'motherboard', icon: '🔌' },
    { name: 'CPU Cooler', path: 'cpucooler', icon: '❄️' },
    { name: 'Power Supply', path: 'powersupply', icon: '⚡' },
    { name: 'Powerhouse', path: 'powerhouse', icon: '🏠' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Select Product Type to Add
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productTypes.map((type) => (
          <button
            key={type.path}
            onClick={() => navigate(`/addProduct/${type.path}`)}
            className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <span className="text-4xl mr-4">{type.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {type.name}
              </h2>
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