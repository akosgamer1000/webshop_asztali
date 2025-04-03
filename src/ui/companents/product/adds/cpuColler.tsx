import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

const AddCPUCooler: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'couantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'fanSpeed', label: 'Fan Speed (RPM)', type: 'number', min: 0, required: true },
    { name: 'basetype', label: 'Type', type: 'text', required: true },
    { name: 'airflow', label: 'Airflow (CFM)', type: 'number', min: 0, required: true },
    { name: 'frequency', label: 'Frequency (GHz)', type: 'number', min: 0, step: '0.1' }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const formattedData = {
      ...formData,
      type: 'CPUCOOLER'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add CPU Cooler"
      fields={fields}
      productType="CPUCOOLER"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddCPUCooler;