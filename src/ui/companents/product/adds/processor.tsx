import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

const AddProcessor: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'couantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'baseFrequency', label: 'Base Frequency (GHz)', type: 'number', min: 0, step: '0.1', required: true },
    { name: 'turboBoostFrequency', label: 'Turbo Boost Frequency (GHz)', type: 'number', min: 0, step: '0.1' },
    { name: 'coreNumber', label: 'Core Number', type: 'number', min: 1, required: true },
    { name: 'processorSeller', label: 'Processor Seller', type: 'select', required: true, options: [
      { value: 'Intel', label: 'Intel' },
      { value: 'AMD', label: 'AMD' }
    ]},
    { name: 'processorModel', label: 'Processor Model', type: 'text', required: true },
    { name: 'cache', label: 'Cache (MB)', type: 'number', min: 0, required: true },
    { name: 'architecture', label: 'Architecture', type: 'text', required: true },
    { name: 'integratedGraphicModel', label: 'Integrated Graphics Model', type: 'text' },
    { name: 'processorTechnology', label: 'Processor Technology', type: 'text' }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const formattedData = {
      ...formData,
      type: 'PROCESSOR'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Processor"
      fields={fields}
      productType="PROCESSOR"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddProcessor;