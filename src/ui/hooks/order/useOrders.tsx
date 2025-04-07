/**
 * Orders Management Hook
 * 
 * A custom hook that provides functionality for fetching and managing orders.
 * It handles loading states, error handling, and automatic data fetching.
 * 
 * Features:
 * - Fetch all orders
 * - Handle loading states
 * - Error handling with specific error messages
 * - Automatic logout on authentication errors
 * - Refetch functionality
 */

import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the structure of an order
 * @interface OrderData
 * @property {number} id - Unique identifier for the order
 * @property {number} userId - ID of the user who placed the order
 * @property {string} status - Current status of the order
 * @property {string} createdAt - Timestamp of when the order was created
 */
interface OrderData {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
}

/**
 * Custom hook for managing orders
 * 
 * This hook provides functionality for fetching and managing orders.
 * It automatically fetches orders when mounted and provides methods
 * for refetching data when needed.
 * 
 * Usage example:
 * ```tsx
 * const { orders, loading, error, refetch } = useOrders();
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} />;
 * 
 * return (
 *   <div>
 *     {orders.map(order => (
 *       <OrderCard key={order.id} order={order} />
 *     ))}
 *   </div>
 * );
 * ```
 * 
 * @returns {Object} Object containing orders data and management functions
 * @property {OrderData[]} orders - Array of orders
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 * @property {() => Promise<void>} refetch - Function to refetch orders
 */
const useOrders = () => {
  // State management for orders, loading, and error
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * Fetch orders from the server
   * 
   * This function handles the API call to fetch orders and manages
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
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<OrderData[]>("/order");
      setOrders(response.data);
      setError(null);
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
              setError("Orders not found");
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
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
};

export default useOrders;