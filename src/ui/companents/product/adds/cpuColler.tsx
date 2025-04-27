/**
 * @file companents/product/adds/cpuColler.tsx
 * @module UI/Components/Product/Adds
 * @description CPU Cooler Add Component
 * 
 * A form component for adding new CPU cooler products to the inventory.
 * Features:
 * - Specialized input fields for CPU cooler specifications
 * - Form validation for required fields
 * - Support for cooler-specific attributes like fan speed, airflow, and frequency
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding CPU coolers with their unique technical specifications.
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
 * Component for adding new CPU cooler products
 * @component
 * @returns {JSX.Element} A specialized form for adding CPU cooler products
 * @example
 * <AddCPUCooler />
 */
const AddCPUCooler: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for CPU cooler products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text', isImageUrl: true },
    { name: 'fanSpeed', label: 'Fan Speed (RPM)', type: 'number', min: 0, required: true },
    { name: 'basetype', label: 'Type', type: 'text', required: true },
    { name: 'airflow', label: 'Airflow (CFM)', type: 'number', min: 0, required: true },
    { name: 'frequency', label: 'Frequency (GHz)', type: 'number', min: 0, step: '0.1' }
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