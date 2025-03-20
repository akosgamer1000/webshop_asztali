import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';

interface OrderData {
  id: number;
  userId: number;
  totalPrice: number;
  createdAt: string;
}

const useOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get<OrderData[]>("/order");
        setOrders(response.data);
        setError(null);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.code === 'ERR_NETWORK') {
            setError("Network error: Unable to connect to the server");
          } else if (err.response) {
            switch (err.response.status) {
              case 404:
                setError("Orders not found");
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

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrders;