import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

const AddMemory: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'couantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'memoryCapacity', label: 'Capacity (GB)', type: 'number', min: 1, required: true },
    { name: 'frequency', label: 'Speed (MHz)', type: 'number', min: 0, required: true },
    { name: 'memoryType', label: 'Type', type: 'select', required: true, options: [
      { value: 'DDR3', label: 'DDR3' },
      { value: 'DDR4', label: 'DDR4' },
      { value: 'DDR5', label: 'DDR5' }
    ]},
    { name: 'installedMemory', label: 'Number of Modules', type: 'number', min: 1, required: true },
    { name: 'supportedMemoryCapacity', label: 'Max Supported Capacity (GB)', type: 'number', min: 1 }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const formattedData = {
      ...formData,
      type: 'MEMORY'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Memory"
      fields={fields}
      productType="MEMORY"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddMemory;