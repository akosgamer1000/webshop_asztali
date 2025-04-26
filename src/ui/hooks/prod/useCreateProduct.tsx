/**
 * File: hooks/prod/useCreateProduct.tsx
 * Module: UI/Hooks/Product
 * 
 * @fileoverview A custom hook for creating new products in the system
 * @author WebShop Team
 * @version 1.0.0
 * 
 * @description
 * This hook provides comprehensive functionality for creating new products of various types.
 * It handles the entire creation process including data formatting, API communication,
 * loading states, and error handling with specific error messages for different scenarios.
 * 
 * Features:
 * - Create new products of various types (processors, memory, hard drives, etc.)
 * - Handle loading states during API communication
 * - Comprehensive error handling with specific error messages
 * - Automatic data formatting based on product type
 * - Type-safe product creation with TypeScript interfaces
 * - Authentication error handling with automatic logout
 * 
 * @example
 * ```tsx
 * const { createProduct, loading, error } = useCreateProduct();
 * 
 * // Example usage in a form submission
 * const handleSubmit = async (productData) => {
 *   const result = await createProduct(productData);
 *   if (result) {
 *     // Product created successfully
 *   }
 * };
 * ```
 */

import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Base interface for all product types
 * @interface BaseProduct
 * @property {string} name - Name of the product
 * @property {string} manufacturer - Manufacturer of the product
 * @property {string} type - Type of the product (PROCESSOR, MEMORY, etc.)
 * @property {number} price - Price of the product
 * @property {number} quantity - Available quantity
 * @property {string} imgSrc - URL/path to the product's image
 */
interface BaseProduct {
  name: string;
  manufacturer: string;
  type: 'PROCESSOR' | 'MEMORY' | 'HARDDRIVE' | 'VIDEOCARD' | 'MOTHERBOARD' | 'CPUCOOLER' | 'POWERSUPPLY' | 'POWERHOUSE';
  price: number;
  quantity: number;
  imgSrc: string;
}

/**
 * Interface for processor products
 * @interface Processor
 * @extends BaseProduct
 */
interface Processor extends BaseProduct {
  coreNumber: number;
  baseFrequency: number;
  turboBoostFrequency: number;
  cache: number;
  architecture: string;
  processorSeller: string;
  processorModel: string;
  integratedGraphicModel: string;
  processorTechnology: string;
}

/**
 * Interface for memory products
 * @interface Memory
 * @extends BaseProduct
 */
interface Memory extends BaseProduct {
  memoryCapacity: number;
  memoryType: string;
  installedMemory: number;
  frequency: number;
  supportedMemoryCapacity: number;
}

/**
 * Interface for hard drive products
 * @interface HardDrive
 * @extends BaseProduct
 */
interface HardDrive extends BaseProduct {
  capacity: number;
  storageType: string;
  connectionInterface: string;
  readingSpeed: number;
  writingSpeed: number;
  nandFlashType: string;
  pciGeneration: number;
}

/**
 * Interface for video card products
 * @interface VideoCard
 * @extends BaseProduct
 */
interface VideoCard extends BaseProduct {
  videoChipset: string;
  producer: string;
  cpuSocket: string;
  coolingType: string;
  graphicChipSpeed: number;
  graphicMemorySpeed: number;
  memoryCapacity: number;
  bandwidth: number;
  suggestedPower: number;
  displayPort: number;
  size: string;
}

/**
 * Interface for motherboard products
 * @interface Motherboard
 * @extends BaseProduct
 */
interface Motherboard extends BaseProduct {
  cpuSocket: string;
  chipset: string;
  memoryType: string;
  processorSeller: string;
  graphicCard: string;
  hdmi: boolean;
  sataConnectors: number;
  pciConnectors: number;
  usbPorts: number;
  memorySockets: number;
  integratedSound: boolean;
  bluetooth: boolean;
  wireless: boolean;
  sizeStandard: string;
}

/**
 * Interface for CPU cooler products
 * @interface CPUCooler
 * @extends BaseProduct
 */
interface CPUCooler extends BaseProduct {
  fanSpeed: number;
  basetype: string;
  airflow: number;
  frequency: number;
}

/**
 * Interface for power supply products
 * @interface PowerSupply
 * @extends BaseProduct
 */
interface PowerSupply extends BaseProduct {
  performance: number;
  fourPinConnector: boolean;
  sixPinVGA: boolean;
  size: string;
}

/**
 * Interface for powerhouse products
 * @interface Powerhouse
 * @extends BaseProduct
 */
interface Powerhouse extends BaseProduct {
  motherboardType: string;
  fans: number;
  size: string;
}

/**
 * Union type of all possible product types
 */
type ProductType = 
  | Processor 
  | Memory 
  | HardDrive 
  | VideoCard 
  | Motherboard 
  | CPUCooler 
  | PowerSupply 
  | Powerhouse;

/**
 * Hook for creating new products
 * 
 * @returns {Object} Object containing creation function and state
 * @property {(productData: ProductType) => Promise<any>} createProduct - Function to create a new product
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 */
const useCreateProduct = () => {
  // State management for loading and error
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * Format product data for API submission
   * 
   * This function formats the product data according to the API requirements.
   * It handles special cases like CPU coolers and maps product types to their
   * corresponding API endpoints.
   * 
   * @param {ProductType} productData - The product data to format
   * @returns {Object} Formatted product data ready for API submission
   */
  const formatProductData = (productData: ProductType) => {
    console.log('Original Product Data:', productData);

    const { type, name, manufacturer, price, quantity, imgSrc, ...specificFields } = productData;
    
    // Base product data common to all product types
    const baseProduct = {
      name,
      manufacturer,
      type,
      price,
      quantity,
      imgSrc
    };

    // Map product types to their API endpoints
    const productTypeMapping: { [key: string]: string } = {
      'PROCESSOR': 'Processor',
      'MEMORY': 'Memory',
      'HARDDRIVE': 'HardDrive',
      'VIDEOCARD': 'VideoCard',
      'MOTHERBOARD': 'Motherboard',
      'CPUCOOLER': 'CPUCooler',
      'POWERSUPPLY': 'PowerSupply',
      'POWERHOUSE': 'Powerhouse'
    };

    const productTypeKey = productTypeMapping[type] || type;

    // Type guard for CPU cooler products
    const isCPUCooler = (obj: any): obj is CPUCooler => 
      type === 'CPUCOOLER' && 'basetype' in obj;

    // Handle special case for CPU coolers
    const formattedSpecificFields = isCPUCooler(specificFields)
      ? { 
          ...specificFields,
          type: specificFields.basetype,
          basetype: undefined
        }
      : specificFields;

    // Combine base product data with specific fields
    const formattedData = {
      ...baseProduct,
      [productTypeKey]: formattedSpecificFields
    };

    console.log('Formatted Product Data:', formattedData);
    return formattedData;
  };

  /**
   * Create a new product
   * 
   * This function handles the API call to create a new product and manages
   * loading states and error handling. It automatically logs out
   * the user if an authentication error occurs.
   * 
   * @param {ProductType} productData - The product data to create
   * @returns {Promise<any>} Created product data
   * @throws {Error} If product creation fails
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Invalid data errors (400)
   * - Server errors (500)
   * - Other unexpected errors
   */
  const createProduct = async (productData: ProductType) => {
    setLoading(true);
    setError(null);

    try {
      const formattedData = formatProductData(productData);
      console.log('Sending Product Data:', formattedData);
      
      const response = await axiosInstance.post('/products', formattedData);
      return response.data;
    } catch (err) {
      console.error('Product Creation Error:', err);

      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          console.error('Server Response:', err.response);
          switch (err.response.status) {
            case 400:
              setError("Invalid product data");
              break;
            case 401:
              setError("Unauthorized: Please log in again");
              dispatch(logout());
              break;
            case 500:
              setError("Server error");
              break;
            default:
              setError(`Error: ${err.response.status}`);
          }
        }
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error
  };
};

export default useCreateProduct;