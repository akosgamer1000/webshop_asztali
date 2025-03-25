import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/useCreateProduct';

const AddMemory: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  // Create refs for form inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const memoryCapacityRef = useRef<HTMLInputElement>(null);
  const memoryTypeRef = useRef<HTMLInputElement>(null);
  const installedMemoryRef = useRef<HTMLInputElement>(null);
  const frequencyRef = useRef<HTMLInputElement>(null);
  const supportedMemoryCapacityRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current?.value || '',
      type: 'MEMORY' as const,
      price: Number(priceRef.current?.value) || 0,
      couantity: Number(quantityRef.current?.value) || 0,
      memoryCapacity: Number(memoryCapacityRef.current?.value) || 0,
      memoryType: memoryTypeRef.current?.value || '',
      installedMemory: Number(installedMemoryRef.current?.value) || 0,
      frequency: Number(frequencyRef.current?.value) || 0,
      supportedMemoryCapacity: Number(supportedMemoryCapacityRef.current?.value) || 0
    };

    try {
      await createProduct(formData);
      navigate('/addProduct/select');
    } catch (err) {
      console.error('Failed to create Memory:', err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/addProduct/select')}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center"
      >
        <span className="mr-2">←</span> Back to Selection
      </button>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add Memory</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                ref={nameRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Price:</label>
              <input
                type="number"
                ref={priceRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Quantity:</label>
              <input
                type="number"
                ref={quantityRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Memory Capacity (GB):</label>
              <input
                type="number"
                ref={memoryCapacityRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Memory Type:</label>
              <input
                type="text"
                ref={memoryTypeRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Installed Memory (GB):</label>
              <input
                type="number"
                ref={installedMemoryRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Frequency (MHz):</label>
              <input
                type="number"
                ref={frequencyRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Supported Memory Capacity (GB):</label>
              <input
                type="number"
                ref={supportedMemoryCapacityRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Adding...' : 'Add Memory'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemory;