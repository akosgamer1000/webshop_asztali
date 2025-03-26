import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/useCreateProduct';

const AddPowerSupply: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  // Create refs for form inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const manufacturerRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const imgSrcRef = useRef<HTMLInputElement>(null);
  const performanceRef = useRef<HTMLInputElement>(null);
  const fourPinConnectorRef = useRef<HTMLInputElement>(null);
  const sixPinVGARef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current?.value || '',
      manufacturer: manufacturerRef.current?.value || '',
      type: 'POWERSUPPLY' as const,
      price: Number(priceRef.current?.value) || 0,
      couantity: Number(quantityRef.current?.value) || 0,
      imgSrc: imgSrcRef.current?.value || '',
      performance: Number(performanceRef.current?.value) || 0,
      fourPinConnector: fourPinConnectorRef.current?.checked || false,
      sixPinVGA: sixPinVGARef.current?.checked || false,
      size: sizeRef.current?.value || ''
    };

    try {
      await createProduct(formData);
      navigate('/addProduct/select');
    } catch (err) {
      console.error('Failed to create Power Supply:', err);
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

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add Power Supply</h1>

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
              <label className="block text-gray-700 mb-2">Manufacturer:</label>
              <input
                type="text"
                ref={manufacturerRef}
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
              <label className="block text-gray-700 mb-2">Image URL:</label>
              <input
                type="url"
                ref={imgSrcRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Performance (Watts):</label>
              <input
                type="number"
                ref={performanceRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">4-Pin Connector:</label>
              <input
                type="checkbox"
                ref={fourPinConnectorRef}
                className="w-4 h-4 text-blue-600 border rounded focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">6-Pin VGA Connector:</label>
              <input
                type="checkbox"
                ref={sixPinVGARef}
                className="w-4 h-4 text-blue-600 border rounded focus:ring-blue-500"
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
            {loading ? 'Adding...' : 'Add Power Supply'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPowerSupply;