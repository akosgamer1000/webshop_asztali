/**
 * @file companents/product/adds/videocard.tsx
 * @module UI/Components/Product/Adds
 * @description Video Card Add Component
 * 
 * A form component for adding new video card (GPU) products to the inventory.
 * Features:
 * - Specialized input fields for video card specifications
 * - Form validation for required fields
 * - Support for GPU-specific attributes like chipset, memory speed, and bandwidth
 * - Comprehensive technical specifications collection
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding video cards with their unique technical specifications.
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
 * Component for adding new video card products
 * @component
 * @returns {JSX.Element} A specialized form for adding video card products
 * @example
 * <AddVideoCard />
 */
const AddVideoCard: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for video card products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text', isImageUrl: true },
    { name: 'videoChipset', label: 'Video Chipset', type: 'text', required: true },
    { name: 'producer', label: 'Producer', type: 'text', required: true },
    { name: 'cpuSocket', label: 'CPU Socket', type: 'text' },
    { name: 'coolingType', label: 'Cooling Type', type: 'text' },
    { name: 'graphicChipSpeed', label: 'Graphic Chip Speed (MHz)', type: 'number', min: 0, required: true },
    { name: 'graphicMemorySpeed', label: 'Graphic Memory Speed (MHz)', type: 'number', min: 0 },
    { name: 'memoryCapacity', label: 'Memory Capacity (GB)', type: 'number', min: 1, required: true },
    { name: 'bandwidth', label: 'Bandwidth (GB/s)', type: 'number', min: 0 },
    { name: 'suggestedPower', label: 'Suggested Power (W)', type: 'number', min: 0 },
    { name: 'displayPort', label: 'Display Port Count', type: 'number', min: 0 },
    { name: 'size', label: 'Size (mm)', type: 'text' }
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
      type: 'VIDEOCARD'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Video Card"
      fields={fields}
      productType="VIDEOCARD"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddVideoCard;