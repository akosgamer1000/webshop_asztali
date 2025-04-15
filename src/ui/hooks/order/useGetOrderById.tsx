/**
 * Order Details Hook
 * 
 * A custom hook that provides functionality for fetching and managing a single order by ID.
 * It handles loading states, error handling, and automatic data fetching.
 * 
 * Features:
 * - Fetch single order by ID
 * - Handle loading states
 * - Error handling with specific error messages
 * - Automatic logout on authentication errors
 * - Detailed order information including products and total price
 */

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

/**
 * Interface representing the detailed structure of an order
 * @interface OrderData
 * @property {number} id - Unique identifier for the order
 * @property {number} userId - ID of the user who placed the order
 * @property {string} status - Current status of the order
 * @property {string} createdAt - Timestamp of when the order was created
 * @property {string} email - Email address associated with the order
 * @property {string} address - Shipping/delivery address for the order
 * @property {Array<{id: number, productId: number, quantity: number}>} products - Array of products in the order
 * @property {number} totalPrice - Total price of the order
 */
interface OrderData {
    id: number;
    userId: number;
    status: string;
    createdAt: string;
    email: string;
    address: string;
    products: Array<{
        id: number;
        productId: number;
        quantity: number;
    }>;
    totalPrice: number;
}

/**
 
 * 
 * @param {number} orderId - ID of the order to fetch
 * @returns {Object} Object containing order data and state
 * @property {OrderData | null} order - The order data or null if not found
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 */
const useGetOrderById = (orderId: number) => {
    // State management for order, loading, and error
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        /**
         * Fetch order details from the server
         * 
         * This function handles the API call to fetch a single order and manages
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
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get<OrderData>(`/order/${orderId}`);
                setOrder(response.data);
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
                                setError(`Order with ID ${orderId} not found`);
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
        };

        // Only fetch if we have a valid orderId
        if (orderId) {
            fetchOrder();
        }
    }, [orderId, dispatch]);

    return { order, loading, error };
};

export default useGetOrderById;
