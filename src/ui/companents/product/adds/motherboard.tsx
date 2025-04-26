/**
 * @file companents/product/adds/motherboard.tsx
 * @module UI/Components/Product/Adds
 * @description Motherboard Add Component
 * 
 * A form component for adding new motherboard products to the inventory.
 * Features:
 * - Specialized input fields for motherboard specifications
 * - Form validation for required fields
 * - Support for motherboard-specific attributes like socket type, chipset, and connectivity options
 * - Integration with product creation hook
 * - Responsive form layout and consistent styling
 * 
 * This component serves as a specialized product creation interface
 * for adding motherboards with their unique technical specifications.
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
 * Component for adding new motherboard products
 * @component
 * @returns {JSX.Element} A specialized form for adding motherboard products
 * @example
 * <AddMotherboard />
 */
const AddMotherboard: React.FC = () => {
  /**
   * Hooks for navigation and product creation
   */
  const navigate = useNavigate();
  const { createProduct, loading, error } = useCreateProduct();

  /**
   * Form field configuration for motherboard products
   * Defines the structure and validation rules for the form
   * @type {FormField[]}
   */
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0, step: '0.01' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0 },
    { name: 'imgSrc', label: 'Image URL', type: 'text' },
    { name: 'cpuSocket', label: 'CPU Socket', type: 'text', required: true },
    { name: 'chipset', label: 'Chipset', type: 'text', required: true },
    { name: 'sizeStandard', label: 'Form Factor', type: 'select', required: true, options: [
      { value: 'ATX', label: 'ATX' },
      { value: 'Micro ATX', label: 'Micro ATX' },
      { value: 'Mini ITX', label: 'Mini ITX' },
      { value: 'E-ATX', label: 'E-ATX' }
    ]},
    { name: 'memoryType', label: 'Memory Type', type: 'select', required: true, options: [
      { value: 'DDR3', label: 'DDR3' },
      { value: 'DDR4', label: 'DDR4' },
      { value: 'DDR5', label: 'DDR5' }
    ]},
    { name: 'memorySockets', label: 'Memory Sockets', type: 'number', min: 1, required: true },
    { name: 'processorSeller', label: 'Processor Seller', type: 'select', required: true, options: [
      { value: 'Intel', label: 'Intel' },
      { value: 'AMD', label: 'AMD' }
    ]},
    { name: 'graphicCard', label: 'Graphic Card Support', type: 'text' },
    { name: 'hdmi', label: 'HDMI Ports', type: 'checkbox' },
    { name: 'sataConnectors', label: 'SATA Connectors', type: 'number', min: 0, required: true },
    { name: 'pciConnectors', label: 'PCI Connectors', type: 'number', min: 0, required: true },
    { name: 'usbPorts', label: 'USB Ports', type: 'number', min: 0, required: true },
    { name: 'integratedSound', label: 'Integrated Sound', type: 'checkbox' },
    { name: 'bluetooth', label: 'Bluetooth', type: 'checkbox' },
    { name: 'wireless', label: 'Wireless', type: 'checkbox' }
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
      type: 'MOTHERBOARD'
    };
    
    await createProduct(formattedData as any);
    navigate('/addProduct/select');
  };

  return (
    <ProductForm
      title="Add Motherboard"
      fields={fields}
      productType="MOTHERBOARD"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default AddMotherboard;