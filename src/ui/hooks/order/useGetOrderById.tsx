import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

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

const useGetOrderById = (orderId: number) => {
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
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

        if (orderId) {
            fetchOrder();
        }
    }, [orderId, dispatch]);

    return { order, loading, error };
};

export default useGetOrderById;
