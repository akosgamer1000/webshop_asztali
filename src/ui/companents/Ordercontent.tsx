import React, { useState } from 'react';
import "../style/basic.css";

interface OrderData {
  id: number;
  orderId: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: number;
}

const OrderContent: React.FC = () => {
  const [orders] = useState<OrderData[]>([
    {
      id: 1,
      orderId: 'ORD-001',
      customerName: 'John Doe',
      orderDate: '2025-02-28',
      status: 'pending',
      total: 299.99,
      items: 3
    },
    {
      id: 2,
      orderId: 'ORD-002',
      customerName: 'Jane Smith',
      orderDate: '2025-02-27',
      status: 'completed',
      total: 149.50,
      items: 2
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-200';
      case 'processing': return 'bg-blue-200';
      case 'completed': return 'bg-green-200';
      default: return 'bg-red-200';
    }
  };

  return (
    <div className="overflow-x-auto mt-5">
      <table className="w-full border-collapse min-w-[600px]">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Items</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="even:bg-gray-100">
              <td className="p-3 border">{order.orderId}</td>
              <td className="p-3 border">{order.customerName}</td>
              <td className="p-3 border">{order.orderDate}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </td>
              <td className="p-3 border">${order.total.toFixed(2)}</td>
              <td className="p-3 border">{order.items}</td>
              <td className="p-3 border">
                <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                <button className="text-green-600 hover:text-green-800">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderContent;