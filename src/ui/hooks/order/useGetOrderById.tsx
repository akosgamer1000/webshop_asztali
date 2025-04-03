import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

interface OrderProduct {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
}

interface Order {
    id: number;
    email: string;
    address: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    products: OrderProduct[];
}

const useGetOrderById = (orderId: number) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<Order>(`/order/${orderId}`);
            setOrder(response.data);
            setError(null);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.code === 'ERR_NETWORK') {
                    setError("Network error: Unable to connect to the server");
                } else if (err.response) {
                    switch (err.response.status) {
                        case 404:
                            setError(`Order with ID ${orderId} not found`);
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

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    return { order, loading, error, refetch: fetchOrder };
};

export default useGetOrderById;
