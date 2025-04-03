import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

const AddVideoCard: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'couantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'videoChipset', label: 'Video Chipset', type: 'text', required: true },
    { name: 'producer', label: 'Producer', type: 'text', required: true },
    { name: 'cpuSocket', label: 'CPU Socket', type: 'text' },
    { name: 'coolingType', label: 'Cooling Type', type: 'text' },
    { name: 'graphicChipSpeed', label: 'Graphic Chip Speed (MHz)', type: 'number', min: 0, required: true },
    { name: 'graphicMemorySpeed', label: 'Graphic Memory Speed (MHz)', type: 'number', min: 0 },
    { name: 'memoryCapacity', label: 'Memory Capacity (GB)', type: 'number', min: 1, required: true },
    { name: 'bandwidth', label: 'Bandwidth (GB/s)', type: 'number', min: 0 },
    { name: 'suggestedPower', label: 'Suggested Power (W)', type: 'number', min: 0 },
    { name: 'displayPort', label: 'Display Port Count', type: 'number', min: 0 },
    { name: 'size', label: 'Size (mm)', type: 'number', min: 0 }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const formattedData = {
      ...formData,
      type: 'VIDEOCARD'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Video Card"
      fields={fields}
      productType="VIDEOCARD"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddVideoCard;