/**
 * @file companents/product/adds/harddrive.tsx
 * @module UI/Components/Product/Adds
 * @description Hard Drive Add Component
 * 
 * A form component for adding new hard drive products to the inventory.
 * Features:
 * - Specialized input fields for hard drive specifications
 * - Form validation for required fields
 * - Support for hard drive-specific attributes like capacity, interface, and speed
 * - Options for different storage types (SSD, HDD, NVMe)
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding storage devices with their unique technical specifications.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateProduct from '../../../hooks/prod/useCreateProduct';
import ProductForm, { FormField } from '../../common/ProductForm';

/**
 * Component for adding new hard drive products
 * @component
 * @returns {JSX.Element} A specialized form for adding hard drive products
 * @example
 * <AddHardDrive />
 */
const AddHardDrive: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for hard drive products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
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

  /**
   * Handles form submission and product creation
   * @function handleSubmit
   * @param {Record<string, any>} formData - Form data values
   * @inner
   */
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