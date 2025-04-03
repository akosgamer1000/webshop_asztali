import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select';
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
}

interface ProductFormProps {
  title: string;
  fields: FormField[];
  productType: string;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  title, 
  fields, 
  productType,
  onSubmit, 
  loading = false,
  error = null
}) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(error);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(loading);
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});

  useEffect(() => {
    setFormError(error);
  }, [error]);

  useEffect(() => {
    setIsSubmitting(loading);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    let hasError = false;
    const formData: Record<string, any> = {
      type: productType
    };

    fields.forEach(field => {
      const ref = fieldRefs.current[field.name];
      
      if (field.type === 'checkbox' && ref instanceof HTMLInputElement) {
        formData[field.name] = ref.checked;
      } else if (ref) {
        const value = ref.value;
        
        if (field.required && !value) {
          setFormError(`${field.label} is required`);
          hasError = true;
          return;
        }
        
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

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'checkbox':
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
      <button
        onClick={() => navigate('/addProduct/select')}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center"
      >
        <span className="mr-2">←</span> Back to Selection
      </button>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">{title}</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(field => renderField(field))}
        </div>

        {formError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {formError}
          </div>
        )}

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