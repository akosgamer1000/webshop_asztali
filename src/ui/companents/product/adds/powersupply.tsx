/**
 * @file companents/product/adds/powersupply.tsx
 * @module UI/Components/Product/Adds
 * @description Power Supply Add Component
 * 
 * A form component for adding new power supply (PSU) products to the inventory.
 * Features:
 * - Specialized input fields for power supply specifications
 * - Form validation for required fields
 * - Support for PSU-specific attributes like wattage and connector types
 * - Options for different connector configurations
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding power supplies with their unique technical specifications.
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
 * Component for adding new power supply products
 * @component
 * @returns {JSX.Element} A specialized form for adding power supply products
 * @example
 * <AddPowerSupply />
 */
const AddPowerSupply: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for power supply products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'performance', label: 'Performance (W)', type: 'number', min: 1, required: true },
    { name: 'fourPinConnector', label: 'Has 4-Pin Connector', type: 'checkbox' },
    { name: 'sixPinVGA', label: 'Has 6-Pin VGA Connector', type: 'checkbox' },
    { name: 'size', label: 'Size', type: 'text', required: true }
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