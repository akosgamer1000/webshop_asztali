/**
 * @file ProductForm.tsx
 * @module UI/Components/Common
 * @description Product Form Component
 * 
 * A reusable form component for creating and editing products.
 * Features:
 * - Dynamic field generation based on configuration
 * - Support for multiple input types (text, number, checkbox, select)
 * - Form validation with error handling
 * - Loading states
 * - Responsive grid layout
 * - Back navigation
 * - Field-level validation rules
 * - Accessible form controls
 * 
 * This component provides a standardized way to create forms for product
 * creation and editing, with support for various field types and validation rules.
 * It handles form state, validation, and submission with error handling.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Configuration interface for form fields
 * Defines the structure and validation rules for each form field
 * @interface FormField
 * @property {string} name - Unique identifier for the field
 * @property {string} label - Display label for the field
 * @property {'text' | 'number' | 'checkbox' | 'select'} type - Type of input field
 * @property {boolean} [required] - Whether the field is required
 * @property {number} [min] - Minimum value for number fields
 * @property {number} [max] - Maximum value for number fields
 * @property {string} [step] - Step value for number fields
 * @property {{ value: string; label: string }[]} [options] - Options for select fields
 * @property {string | number | boolean} [defaultValue] - Default value for the field
 */
export interface FormField {
  name: string;                                    // Field identifier
  label: string;                                   // Display label
  type: 'text' | 'number' | 'checkbox' | 'select'; // Input type
  required?: boolean;                              // Whether field is required
  min?: number;                                    // Minimum value for number fields
  max?: number;                                    // Maximum value for number fields
  step?: string;                                   // Step value for number fields
  options?: { value: string; label: string }[];    // Options for select fields
  defaultValue?: string | number | boolean;        // Default field value
}

/**
 * Props interface for the ProductForm component
 * @interface ProductFormProps
 * @property {string} title - Title displayed at the top of the form
 * @property {FormField[]} fields - Configuration for each form field
 * @property {string} productType - Type of product being created/edited
 * @property {(formData: Record<string, any>) => Promise<void>} onSubmit - Handler for form submission
 * @property {boolean} [loading=false] - Whether the form is in a loading state
 * @property {string | null} [error=null] - Error message to display if any
 */
interface ProductFormProps {
  title: string;                                   // Form title
  fields: FormField[];                             // Field configurations
  productType: string;                             // Type of product being created/edited
  onSubmit: (formData: Record<string, any>) => Promise<void>; // Submit handler
  loading?: boolean;                               // Loading state
  error?: string | null;                          // Error message
}

/**
 * Product form component for creating and editing products
 * @component
 * @param {ProductFormProps} props - Component properties
 * @param {string} props.title - Form title displayed at the top
 * @param {FormField[]} props.fields - Array of field configurations
 * @param {string} props.productType - Type of product being created/edited
 * @param {(formData: Record<string, any>) => Promise<void>} props.onSubmit - Handler for form submission
 * @param {boolean} [props.loading=false] - Whether the form is in a loading state
 * @param {string | null} [props.error=null] - Error message to display if any
 * @returns {JSX.Element} A form with dynamic fields based on configuration
 * @example
 * <ProductForm
 *   title="Add Laptop"
 *   fields={[
 *     { name: 'brand', label: 'Brand', type: 'text', required: true },
 *     { name: 'model', label: 'Model', type: 'text', required: true },
 *     { name: 'price', label: 'Price', type: 'number', required: true, min: 0 },
 *     { name: 'inStock', label: 'In Stock', type: 'checkbox', defaultValue: true }
 *   ]}
 *   productType="laptop"
 *   onSubmit={handleSubmit}
 * />
 */
const ProductForm: React.FC<ProductFormProps> = ({ 
  title,                    // Form title
  fields,                   // Field configurations
  productType,              // Type of product
  onSubmit,                 // Submit handler
  loading = false,          // Loading state
  error = null              // Error message
}) => {
  // Initialize hooks and state
  const navigate = useNavigate();  // Router navigation hook
  const [formError, setFormError] = useState<string | null>(error);  // Form error state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(loading);  // Submission state
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});  // Refs for form fields

  // Update form error when prop changes
  useEffect(() => {
    setFormError(error);
  }, [error]);

  // Update submitting state when loading prop changes
  useEffect(() => {
    setIsSubmitting(loading);
  }, [loading]);

  /**
   * Handle form submission
   * Validates all fields and calls onSubmit with form data
   * @function handleSubmit
   * @param {React.FormEvent} e - Form submission event
   * @inner
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    const formData: Record<string, any> = {
      type: productType  // Add product type to form data
    };

    // Validate and collect field values
    fields.forEach(field => {
      const ref = fieldRefs.current[field.name];
      
      if (field.type === 'checkbox' && ref instanceof HTMLInputElement) {
        // Handle checkbox fields
        formData[field.name] = ref.checked;
      } else if (ref) {
        const value = ref.value;
        
        // Required field validation
        if (field.required && !value) {
          setFormError(`${field.label} is required`);
          hasError = true;
          return;
        }
        
        // Number field validation
        if (field.type === 'number') {
          const numValue = Number(value);
          
          if (isNaN(numValue)) {
            setFormError(`${field.label} must be a valid number`);
            hasError = true;
            return;
          }
          
          if (field.min !== undefined && numValue < field.min) {
            setFormError(`${field.label} must be at least ${field.min}`);
            hasError = true;
            return;
          }
          
          if (field.max !== undefined && numValue > field.max) {
            setFormError(`${field.label} must be at most ${field.max}`);
            hasError = true;
            return;
          }
          
          formData[field.name] = numValue;
        } else {
          formData[field.name] = value;
        }
      }
    });
    
    if (hasError) return;
    
    // Submit form data
    try {
      setIsSubmitting(true);
      setFormError(null);
      await onSubmit(formData);
    } catch (err) {
      console.error(`Failed to create ${title}:`, err);
      setFormError(`Failed to create ${title}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Render form field based on its type
   * @function renderField
   * @param {FormField} field - Field configuration
   * @returns {JSX.Element} Rendered form field
   * @inner
   */
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'checkbox':
        // Render checkbox input
        return (
          <div className="flex items-center" key={field.name}>
            <input
              type="checkbox"
              id={field.name}
              ref={el => fieldRefs.current[field.name] = el}
              className="mr-2 h-5 w-5"
              defaultChecked={field.defaultValue as boolean}
            />
            <label htmlFor={field.name} className="text-gray-700">
              {field.label}
            </label>
          </div>
        );
      
      case 'select':
        // Render select input
        return (
          <div key={field.name}>
            <label className="block text-gray-700 mb-2">
              {field.label}{field.required ? ' *' : ''}:
            </label>
            <select
              id={field.name}
              ref={el => fieldRefs.current[field.name] = el}
              className="w-full p-2 border rounded-lg"
              required={field.required}
              defaultValue={field.defaultValue as string}
            >
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      default:
        // Render text/number input
        return (
          <div key={field.name}>
            <label className="block text-gray-700 mb-2">
              {field.label}{field.required ? ' *' : ''}:
            </label>
            <input
              type={field.type}
              id={field.name}
              ref={el => fieldRefs.current[field.name] = el}
              className="w-full p-2 border rounded-lg"
              required={field.required}
              min={field.min}
              max={field.max}
              step={field.step}
              defaultValue={field.defaultValue as string | number}
            />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back navigation button */}
      <button
        onClick={() => navigate('/addProduct/select')}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center"
      >
        <span className="mr-2">←</span> Back to Selection
      </button>

      {/* Form title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{title}</h1>

      {/* Product form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Form fields grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(field => renderField(field))}
        </div>

        {/* Error message */}
        {formError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {formError}
          </div>
        )}

        {/* Submit button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg disabled:bg-blue-300"
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 