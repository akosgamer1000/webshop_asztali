import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

const AddPowerSupply: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'couantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'performance', label: 'Performance (W)', type: 'number', min: 1, required: true },
    { name: 'fourPinConnector', label: 'Has 4-Pin Connector', type: 'checkbox' },
    { name: 'sixPinVGA', label: 'Has 6-Pin VGA Connector', type: 'checkbox' },
    { name: 'size', label: 'Size', type: 'text', required: true }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const formattedData = {
      ...formData,
      type: 'POWERSUPPLY'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Power Supply"
      fields={fields}
      productType="POWERSUPPLY"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddPowerSupply;