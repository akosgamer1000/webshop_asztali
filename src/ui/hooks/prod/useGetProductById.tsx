/**
 * @file hooks/prod/useGetProductById.tsx
 * @module UI/Hooks/Product
 * @description Product Details Hook
 * 
 * A custom hook that provides functionality for fetching and managing a single product by ID.
 * It handles loading states, error handling, and automatic data fetching.
 * 
 * Features:
 * - Fetch single product by ID
 * - Handle loading states
 * - Error handling with specific error messages
 * - Automatic logout on authentication errors
 * - Generic type support for extended product types
 * 
 * This hook provides a standardized way to fetch product details
 * and handle the associated loading states and error messages.
 * It supports generic types for flexibility with different product structures.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Base interface representing the structure of a product
 * @interface Product
 * @property {number} id - Unique identifier for the product
 * @property {string} name - Name of the product
 * @property {string} manufacturer - Manufacturer of the product
 * @property {string} type - Type/category of the product
 * @property {number} price - Price of the product
 * @property {number} quantity - Available quantity of the product
 * @property {string} imgSrc - URL/path to the product's image
 * @property {[key: string]: any} - Additional dynamic properties
 */
interface Product {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  quantity: number;
  imgSrc: string;
  [key: string]: any;
}

/**
 * Custom hook for fetching a product by ID
 * 
 * @function useGetProductById
 * @template T - Type that extends the base Product interface
 * @param {number} productId - ID of the product to fetch
 * @returns {Object} Object containing product data and state
 * @property {T | null} product - The product data or null if not found
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {() => Promise<void>} refetch - Function to refetch the product
 * @example
 * const { product, loading, error, refetch } = useGetProductById<Processor>(123);
 * 
 * if (loading) {
 *   return <div>Loading...</div>;
 * }
 * 
 * if (error) {
 *   return <div>{error}</div>;
 * }
 * 
 * return <ProductDetails product={product} />;
 */
const useGetProductById = <T extends Product>(productId: number) => {
  // State management for product, loading, and error
  const [product, setProduct] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * Fetch product details from the server
   * 
   * This function handles the API call to fetch a single product and manages
   * loading states and error handling. It automatically logs out
   * the user if an authentication error occurs.
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Not found errors (404)
   * - Server errors (500)
   * - Other unexpected errors
   */
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<T>(`/products/${productId}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          switch (err.response.status) {
            case 401:
              setError("Unauthorized: Please log in again");
              dispatch(logout());
              break;
            case 404:
              setError(`Product with ID ${productId} not found`);
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
    } finally {
      setLoading(false);
    }
  };

  // Fetch product when the component mounts or productId changes
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return { product, loading, error, refetch: fetchProduct };
};

export default useGetProductById;