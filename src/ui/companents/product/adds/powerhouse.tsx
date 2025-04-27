/**
 * @file companents/product/adds/powerhouse.tsx
 * @module UI/Components/Product/Adds
 * @description Powerhouse Add Component
 * 
 * A form component for adding new computer case (powerhouse) products to the inventory.
 * Features:
 * - Specialized input fields for case specifications
 * - Form validation for required fields
 * - Support for powerhouse-specific attributes like motherboard type, fans, and size
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding computer cases with their unique specifications.
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
 * Component for adding new powerhouse (computer case) products
 * @component
 * @returns {JSX.Element} A specialized form for adding powerhouse products
 * @example
 * <AddPowerhouse />
 */
const AddPowerhouse: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for powerhouse products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text', isImageUrl: true },
    { name: 'motherboardType', label: 'Motherboard Type', type: 'text', required: true },
    { name: 'fans', label: 'Number of Fans', type: 'number', min: 0, required: true },
    { name: 'size', label: 'Size (mm)', type: 'text', required: true }
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