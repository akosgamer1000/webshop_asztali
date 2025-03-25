import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/useCreateProduct';

const AddVideoCard: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  // Create refs for form inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const videoChipsetRef = useRef<HTMLInputElement>(null);
  const producerRef = useRef<HTMLInputElement>(null);
  const cpuSocketRef = useRef<HTMLInputElement>(null);
  const coolingTypeRef = useRef<HTMLInputElement>(null);
  const graphicChipSpeedRef = useRef<HTMLInputElement>(null);
  const graphicMemorySpeedRef = useRef<HTMLInputElement>(null);
  const memoryCapacityRef = useRef<HTMLInputElement>(null);
  const bandwidthRef = useRef<HTMLInputElement>(null);
  const suggestedPowerRef = useRef<HTMLInputElement>(null);
  const displayPortRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current?.value || '',
      type: 'VIDEOCARD' as const,
      price: Number(priceRef.current?.value) || 0,
      couantity: Number(quantityRef.current?.value) || 0,
      videoChipset: videoChipsetRef.current?.value || '',
      producer: producerRef.current?.value || '',
      cpuSocket: cpuSocketRef.current?.value || '',
      coolingType: coolingTypeRef.current?.value || '',
      graphicChipSpeed: Number(graphicChipSpeedRef.current?.value) || 0,
      graphicMemorySpeed: Number(graphicMemorySpeedRef.current?.value) || 0,
      memoryCapacity: Number(memoryCapacityRef.current?.value) || 0,
      bandwidth: Number(bandwidthRef.current?.value) || 0,
      suggestedPower: Number(suggestedPowerRef.current?.value) || 0,
      displayPort: Number(displayPortRef.current?.value) || 0,
      size: sizeRef.current?.value || ''
    };

    try {
      await createProduct(formData);
      navigate('/addProduct/select');
    } catch (err) {
      console.error('Failed to create Video Card:', err);
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

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add Video Card</h1>

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
              <label className="block text-gray-700 mb-2">Video Chipset:</label>
              <input
                type="text"
                ref={videoChipsetRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Producer:</label>
              <input
                type="text"
                ref={producerRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">CPU Socket:</label>
              <input
                type="text"
                ref={cpuSocketRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Cooling Type:</label>
              <input
                type="text"
                ref={coolingTypeRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Graphic Chip Speed (MHz):</label>
              <input
                type="number"
                ref={graphicChipSpeedRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Graphic Memory Speed (MHz):</label>
              <input
                type="number"
                ref={graphicMemorySpeedRef}
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

            <div>
              <label className="block text-gray-700 mb-2">Bandwidth (GB/s):</label>
              <input
                type="number"
                ref={bandwidthRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Suggested Power (W):</label>
              <input
                type="number"
                ref={suggestedPowerRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Display Ports:</label>
              <input
                type="number"
                ref={displayPortRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Size:</label>
              <input
                type="text"
                ref={sizeRef}
                className="w-full p-2 border rounded-lg"
                required
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
            {loading ? 'Adding...' : 'Add Video Card'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideoCard;