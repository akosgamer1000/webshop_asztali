import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/useCreateProduct';

const AddProcessor: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  // Create refs for form inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const manufacturerRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const imgSrcRef = useRef<HTMLInputElement>(null);
  const coreNumberRef = useRef<HTMLInputElement>(null);
  const baseFrequencyRef = useRef<HTMLInputElement>(null);
  const turboBoostFrequencyRef = useRef<HTMLInputElement>(null);
  const cacheRef = useRef<HTMLInputElement>(null);
  const architectureRef = useRef<HTMLInputElement>(null);
  const processorSellerRef = useRef<HTMLInputElement>(null);
  const processorModelRef = useRef<HTMLInputElement>(null);
  const integratedGraphicModelRef = useRef<HTMLInputElement>(null);
  const processorTechnologyRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current?.value || '',
      manufacturer: manufacturerRef.current?.value || '',
      type: 'PROCESSOR' as const,
      price: Number(priceRef.current?.value) || 0,
      couantity: Number(quantityRef.current?.value) || 0,
      imgSrc: imgSrcRef.current?.value || '',
      coreNumber: Number(coreNumberRef.current?.value) || 0,
      baseFrequency: Number(baseFrequencyRef.current?.value) || 0,
      turboBoostFrequency: Number(turboBoostFrequencyRef.current?.value) || 0,
      cache: Number(cacheRef.current?.value) || 0,
      architecture: architectureRef.current?.value || '',
      processorSeller: processorSellerRef.current?.value || '',
      processorModel: processorModelRef.current?.value || '',
      integratedGraphicModel: integratedGraphicModelRef.current?.value || '',
      processorTechnology: processorTechnologyRef.current?.value || ''
    };

    try {
      await createProduct(formData);
      navigate('/addProduct/select');
    } catch (err) {
      console.error('Failed to create Processor:', err);
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

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add Processor</h1>

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

            <div>
              <label className="block text-gray-700 mb-2">Core Number:</label>
              <input
                type="number"
                ref={coreNumberRef}
                className="w-full p-2 border rounded-lg"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Base Frequency (GHz):</label>
              <input
                type="number"
                ref={baseFrequencyRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Turbo Boost Frequency (GHz):</label>
              <input
                type="number"
                ref={turboBoostFrequencyRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Cache (MB):</label>
              <input
                type="number"
                ref={cacheRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Architecture:</label>
              <input
                type="text"
                ref={architectureRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Processor Seller:</label>
              <input
                type="text"
                ref={processorSellerRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Processor Model:</label>
              <input
                type="text"
                ref={processorModelRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Integrated Graphics Model:</label>
              <input
                type="text"
                ref={integratedGraphicModelRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Processor Technology:</label>
              <input
                type="text"
                ref={processorTechnologyRef}
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
            {loading ? 'Adding...' : 'Add Processor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProcessor;