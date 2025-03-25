import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/useCreateProduct';

const AddMotherboard: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  // Create refs for form inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const cpuSocketRef = useRef<HTMLInputElement>(null);
  const chipsetRef = useRef<HTMLInputElement>(null);
  const memoryTypeRef = useRef<HTMLInputElement>(null);
  const processorSellerRef = useRef<HTMLInputElement>(null);
  const graphicCardRef = useRef<HTMLInputElement>(null);
  const hdmiRef = useRef<HTMLInputElement>(null);
  const sataConnectorsRef = useRef<HTMLInputElement>(null);
  const pciConnectorsRef = useRef<HTMLInputElement>(null);
  const usbPortsRef = useRef<HTMLInputElement>(null);
  const memorySocketsRef = useRef<HTMLInputElement>(null);
  const integratedSoundRef = useRef<HTMLInputElement>(null);
  const bluetoothRef = useRef<HTMLInputElement>(null);
  const wirelessRef = useRef<HTMLInputElement>(null);
  const sizeStandardRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current?.value || '',
      type: 'MOTHERBOARD' as const,
      price: Number(priceRef.current?.value) || 0,
      couantity: Number(quantityRef.current?.value) || 0,
      cpuSocket: cpuSocketRef.current?.value || '',
      chipset: chipsetRef.current?.value || '',
      memoryType: memoryTypeRef.current?.value || '',
      processorSeller: processorSellerRef.current?.value || '',
      graphicCard: graphicCardRef.current?.value || '',
      hdmi: hdmiRef.current?.checked || false,  // Changed to checked
      sataConnectors: Number(sataConnectorsRef.current?.value) || 0,
      pciConnectors: Number(pciConnectorsRef.current?.value) || 0,
      usbPorts: Number(usbPortsRef.current?.value) || 0,
      memorySockets: Number(memorySocketsRef.current?.value) || 0,
      integratedSound: integratedSoundRef.current?.checked || false,
      bluetooth: bluetoothRef.current?.checked || false,
      wireless: wirelessRef.current?.checked || false,
      sizeStandard: sizeStandardRef.current?.value || ''
    };

    try {
      await createProduct(formData);
      navigate('/addProduct/select');
    } catch (err) {
      console.error('Failed to create Motherboard:', err);
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

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add Motherboard</h1>

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
              <label className="block text-gray-700 mb-2">CPU Socket:</label>
              <input
                type="text"
                ref={cpuSocketRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Chipset:</label>
              <input
                type="text"
                ref={chipsetRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Memory Type:</label>
              <input
                type="text"
                ref={memoryTypeRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
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
              <label className="block text-gray-700 mb-2">Graphic Card:</label>
              <input
                type="text"
                ref={graphicCardRef}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">HDMI Ports:</label>
                <input
                  type="number"
                  ref={hdmiRef}
                  className="w-full p-2 border rounded-lg"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">SATA Connectors:</label>
                <input
                  type="number"
                  ref={sataConnectorsRef}
                  className="w-full p-2 border rounded-lg"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">PCI Connectors:</label>
                <input
                  type="number"
                  ref={pciConnectorsRef}
                  className="w-full p-2 border rounded-lg"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">USB Ports:</label>
                <input
                  type="number"
                  ref={usbPortsRef}
                  className="w-full p-2 border rounded-lg"
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Memory Sockets:</label>
              <input
                type="number"
                ref={memorySocketsRef}
                className="w-full p-2 border rounded-lg"
                required
                min="0"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  ref={hdmiRef}
                  className="w-4 h-4 text-blue-600"
                />
                <label className="ml-2 text-gray-700">HDMI</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  ref={integratedSoundRef}
                  className="w-4 h-4 text-blue-600"
                />
                <label className="ml-2 text-gray-700">Integrated Sound</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  ref={bluetoothRef}
                  className="w-4 h-4 text-blue-600"
                />
                <label className="ml-2 text-gray-700">Bluetooth</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  ref={wirelessRef}
                  className="w-4 h-4 text-blue-600"
                />
                <label className="ml-2 text-gray-700">Wireless</label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Size Standard:</label>
              <input
                type="text"
                ref={sizeStandardRef}
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
            {loading ? 'Adding...' : 'Add Motherboard'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMotherboard;