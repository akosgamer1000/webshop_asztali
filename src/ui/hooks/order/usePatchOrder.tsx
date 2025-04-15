/**
 * Order Update Hook
 * 
 * A custom hook that provides functionality for updating order information.
 * It handles loading states, error handling, and success feedback.
 * 
 * Features:
 * - Update order status
 * - Handle loading states
 * - Error handling with specific error messages
 * - Success state management
 * - Automatic logout on authentication errors
 */

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the data that can be updated for an order
 * @interface OrderUpdateData
 * @property {string} [status] - New status for the order
 */
interface OrderUpdateData {
  status?: string;
}

/**
 *
 * 
 * 
 * @returns {Object} Object containing update function and state
 * @property {(orderId: number, orderData: OrderUpdateData) => Promise<any>} updateOrder - Function to update order
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {boolean} success - Success state indicator
 */
const usePatchOrder = () => {
  // State management for loading, error, and success
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  /**
   * Update order information
   * 
   * This function handles the API call to update an order and manages
   * loading states and error handling. It automatically logs out
   * the user if an authentication error occurs.
   * 
   * @param {number} orderId - ID of the order to update
   * @param {OrderUpdateData} orderData - Data to update for the order
   * @returns {Promise<any>} Updated order data or null if update failed
   * 
   * Error handling includes:
   * - Network errors
   * - Authentication errors (401)
   * - Not found errors (404)
   * - Invalid data errors (400)
   * - Server errors (500)
   * - Other unexpected errors
   */
  const updateOrder = async (orderId: number, orderData: OrderUpdateData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.patch(`/order/${orderId}`, orderData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (error.response) {
          switch (error.response.status) {
            case 401:
              setError("Unauthorized: Please log in again");
              dispatch(logout());
              break;
            case 404:
              setError(`Order with ID ${orderId} not found`);
              break;
            case 400:
              setError("Invalid order data");
              break;
            case 500:
              setError("Server error");
              break;
            default:
              setError(`Error: ${error.response.status}`);
          }
        }
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateOrder,
    loading,
    error,
    success
  };
};

export default usePatchOrder;