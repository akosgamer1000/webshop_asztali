/**
 * Product Price Update Hook
 * 
 * A custom hook that provides functionality for updating product prices.
 * It handles loading states, error handling, and success feedback.
 * 
 * Features:
 * - Update product price
 * - Handle loading states
 * - Error handling with specific error messages
 * - Success state management
 * - Automatic logout on authentication errors
 */

import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Custom hook for updating product prices
 * 
 * This hook provides functionality for updating a product's price.
 * It handles the API call, loading states, and error handling.
 * 
 * Usage example:
 * ```tsx
 * const { updateProductPrice, loading, error, success } = usePatchOneProduct();
 * 
 * const handlePriceUpdate = async (productId: number, newPrice: number) => {
 *   await updateProductPrice(productId, newPrice);
 *   if (success) {
 *     // Show success message or refresh product list
 *   }
 * };
 * 
 * return (
 *   <div>
 *     <button 
 *       onClick={() => handlePriceUpdate(product.id, 99.99)}
 *       disabled={loading}
 *     >
 *       Update Price
 *     </button>
 *     {error && <ErrorMessage message={error} />}
 *     {success && <SuccessMessage message="Price updated successfully" />}
 *   </div>
 * );
 * ```
 * 
 * @returns {Object} Object containing update function and state
 * @property {(productId: number, newPrice: number) => Promise<any>} updateProductPrice - Function to update product price
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
  const updateProductPrice = async (productId: number, newPrice: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.patch(
        `/products/${productId}`,
        { price: newPrice }
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