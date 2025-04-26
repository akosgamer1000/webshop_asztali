/**
 * File: hooks/prod/usePatchoneproduct.tsx
 * Module: UI/Hooks/Product
 * 
 * @fileoverview A custom hook for updating product prices in the system
 * @author WebShop Team
 * @version 1.0.0
 * 
 * @description
 * This hook provides functionality for updating product prices and optionally quantities.
 * It handles loading states, error handling with specific error messages for different scenarios,
 * and provides success feedback upon completion.
 * 
 * Features:
 * - Update product prices with a simple API call
 * - Optionally update product quantities
 * - Handle loading states during API communication
 * - Comprehensive error handling with specific error messages
 * - Success feedback mechanism
 * - Authentication error handling with automatic logout
 * 
 * @example
 * ```tsx
 * const { updateProductPrice, loading, error, success } = usePatchoneproduct();
 * 
 * // Example usage in a form submission
 * const handlePriceUpdate = async (id, price, quantity) => {
 *   await updateProductPrice(id, price, quantity);
 *   if (success) {
 *     // Price updated successfully
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
 * Hook for updating product prices
 * 
 * @returns {Object} Object containing update function and state
 * @property {(id: string, price: number, quantity?: number) => Promise<void>} updateProductPrice - Function to update product price
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {boolean} success - Success state indicator
 */
const usePatchOneProduct = () => {
  // State management for loading, error, and success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();

  /**
   * Update product price
   * 
   * This function handles the API call to update a product's price and manages
   * loading states and error handling. It automatically logs out
   * the user if an authentication error occurs.
   * 
   * @param {number} productId - ID of the product to update
   * @param {number} newPrice - New price for the product
   * @returns {Promise<any>} Updated product data or null if update failed
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Not found errors (404)
   * - Invalid data errors (400)
   * - Server errors (500)
   * - Other unexpected errors
   */
  const updateProductPrice = async (productId: number, newPrice?: number,newQuantity?: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.patch(
        `/products/${productId}`,
        { price: newPrice, quantity: newQuantity }
      );

      setSuccess(true);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError('Network error: Unable to connect to the server');
        } else if (err.response) {
          switch (err.response.status) {
            case 401:
              setError("Unauthorized: Please log in again");
              dispatch(logout());
              break;
            case 404:
              setError(`Product with ID ${productId} not found`);
              break;
            case 400:
              setError('Invalid price value');
              break;
            case 500:
              setError('Server error');
              break;
            default:
              setError(`Error: ${err.response.status}`);
          }
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProductPrice,
    loading,
    error,
    success
  };
};

export default usePatchOneProduct;