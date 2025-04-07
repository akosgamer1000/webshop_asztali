import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

const AddHardDrive: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'couantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'capacity', label: 'Capacity (GB)', type: 'number', min: 1, required: true },
    { name: 'storageType', label: 'Storage Type', type: 'select', required: true, options: [
      { value: 'SSD', label: 'SSD' },
      { value: 'HDD', label: 'HDD' },
      { value: 'NVME', label: 'NVMe' }
    ]},
    { name: 'connectionInterface', label: 'Connection Interface', type: 'select', required: true, options: [
      { value: 'SATA', label: 'SATA' },
      { value: 'M.2', label: 'M.2' },
      { value: 'PCIe', label: 'PCIe' },
      { value: 'USB', label: 'USB' }
    ]},
    { name: 'readingSpeed', label: 'Reading Speed (MB/s)', type: 'number', min: 0 },
    { name: 'writingSpeed', label: 'Writing Speed (MB/s)', type: 'number', min: 0 },
    { name: 'nandFlashType', label: 'NAND Flash Type', type: 'text' },
    { name: 'pciGeneration', label: 'PCI Generation', type: 'number' ,min:0  }
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const formattedData = {
      ...formData,
      type: 'HARDDRIVE'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Hard Drive"
      fields={fields}
      productType="HARDDRIVE"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddHardDrive;