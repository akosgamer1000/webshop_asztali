/**
 * @file hooks/prod/useProducts.tsx
 * @module UI/Hooks/Product
 * @description Products Management Hook
 * 
 * A custom hook that provides functionality for fetching and managing products.
 * It handles loading states, error handling, and automatic data fetching.
 * 
 * Features:
 * - Fetch all products
 * - Handle loading states
 * - Error handling with specific error messages
 * - Automatic logout on authentication errors
 * - Refetch functionality
 * 
 * This hook provides a standardized way to fetch all products
 * and handle the associated loading states and error messages.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the structure of a product
 * @interface ProductData
 * @property {number} id - Unique identifier for the product
 * @property {string} name - Name of the product
 * @property {string} manufacturer - Manufacturer of the product
 * @property {string} type - Type/category of the product
 * @property {number} price - Price of the product
 * @property {number} quantity - Available quantity of the product
 * @property {string} imgSrc - URL/path to the product's image
 */
interface ProductData {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  quantity: number;
  imgSrc: string;
}

/**
 * Custom hook for fetching and managing products
 * 
 * @function useProducts
 * @returns {Object} Object containing products data and management functions
 * @property {ProductData[]} products - Array of products
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {() => Promise<void>} refetch - Function to refetch products
 * @example
 * const { products, loading, error, refetch } = useProducts();
 * 
 * if (loading) {
 *   return <div>Loading...</div>;
 * }
 * 
 * if (error) {
 *   return <div>{error}</div>;
 * }
 * 
 * return (
 *   <ProductList 
 *     products={products} 
 *     onRefresh={refetch} 
 *   />
 * );
 */
const useProducts = () => {
  // State management for products, loading, and error
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * Fetch products from the server
   * 
   * This function handles the API call to fetch products and manages
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
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ProductData[]>("/products");
      
      setProducts(response.data);
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
              setError("Products not found");
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
  }, [dispatch]);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { 
    products, 
    loading, 
    error, 
    refetch: fetchProducts 
  };
};

export default useProducts;