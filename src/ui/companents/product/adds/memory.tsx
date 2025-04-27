/**
 * @file companents/product/adds/memory.tsx
 * @module UI/Components/Product/Adds
 * @description Memory Add Component
 * 
 * A form component for adding new memory (RAM) products to the inventory.
 * Features:
 * - Specialized input fields for memory specifications
 * - Form validation for required fields
 * - Support for memory-specific attributes like capacity, frequency, and type
 * - Options for different memory types (DDR3, DDR4, DDR5)
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding memory modules with their unique technical specifications.
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
 * Component for adding new memory products
 * @component
 * @returns {JSX.Element} A specialized form for adding memory products
 * @example
 * <AddMemory />
 */
const AddMemory: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for memory products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text', isImageUrl: true },
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

  /**
   * Handles form submission and product creation
   * @function handleSubmit
   * @param {Record<string, any>} formData - Form data values
   * @inner
   */
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