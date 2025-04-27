/**
 * @file companents/product/adds/processor.tsx
 * @module UI/Components/Product/Adds
 * @description Processor Add Component
 * 
 * A form component for adding new processor products to the inventory.
 * Features:
 * - Specialized input fields for processor specifications
 * - Form validation for required fields
 * - Support for processor-specific attributes like frequency, cores, and cache
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding processors with their unique technical specifications.
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
 * Component for adding new processor products
 * @component
 * @returns {JSX.Element} A specialized form for adding processor products
 * @example
 * <AddProcessor />
 */
const AddProcessor: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for processor products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text', isImageUrl: true },
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

  /**
   * Handles form submission and product creation
   * @function handleSubmit
   * @param {Record<string, any>} formData - Form data values
   * @inner
   */
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