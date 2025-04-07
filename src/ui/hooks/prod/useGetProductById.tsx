/**
 * Product Details Hook
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
 * @property {number} couantity - Available quantity of the product
 * @property {string} imgSrc - URL/path to the product's image
 * @property {[key: string]: any} - Additional dynamic properties
 */
interface Product {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  couantity: number;
  imgSrc: string;
  [key: string]: any;
}

/**
 * Custom hook for fetching and managing a single product by ID
 * 
 * This hook provides functionality for fetching and managing a single product.
 * It automatically fetches the product when mounted and when the productId changes.
 * Supports generic types for extended product interfaces.
 * 
 * Usage example:
 * ```tsx
 * // Basic usage
 * const { product, loading, error, refetch } = useGetProductById(productId);
 * 
 * // With extended product type
 * interface ExtendedProduct extends Product {
 *   description: string;
 *   specifications: Record<string, string>;
 * }
 * const { product, loading, error } = useGetProductById<ExtendedProduct>(productId);
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} />;
 * if (!product) return <NotFound />;
 * 
 * return (
 *   <div>
 *     <h1>{product.name}</h1>
 *     <p>Manufacturer: {product.manufacturer}</p>
 *     <p>Price: ${product.price}</p>
 *     <img src={product.imgSrc} alt={product.name} />
 *   </div>
 * );
 * ```
 * 
 * @template T - Type that extends the base Product interface
 * @param {number} productId - ID of the product to fetch
 * @returns {Object} Object containing product data and state
 * @property {T | null} product - The product data or null if not found
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {() => Promise<void>} refetch - Function to refetch the product
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