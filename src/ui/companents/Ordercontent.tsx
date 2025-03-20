import React, { useState, useEffect } from 'react';
import { AxiosError } from "axios";
import "../style/basic.css";
import axiosInstance from "../misch/Axios";

interface OrderData {
  id: number;
  userId: number;
  totalPrice: number;
  createdAt: string;
}

const OrderContent: React.FC = () => {
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

  return (
    <div className="overflow-x-auto mt-5">
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Total Price</th>
              <th className="p-3 border">Created At</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="even:bg-gray-100">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.userId}</td>
                <td className="p-3 border">${order.totalPrice.toFixed(2)}</td>
                <td className="p-3 border">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="p-3 border">
                  <button 
                    onClick={() => console.log('Order details:', order)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    View Details
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderContent;