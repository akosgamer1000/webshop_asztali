import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

const AddPowerhouse: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'couantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'motherboardType', label: 'Motherboard Type', type: 'text', required: true },
    { name: 'fans', label: 'Number of Fans', type: 'number', min: 0, required: true },
    { name: 'size', label: 'Size (mm)', type: 'text', required: true }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const formattedData = {
      ...formData,
      type: 'POWERHOUSE'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Powerhouse"
      fields={fields}
      productType="POWERHOUSE"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddPowerhouse;