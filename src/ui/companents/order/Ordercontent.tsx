import React, { useState, useEffect } from 'react';
import '../../style/basic.css'
import useOrders from '../../hooks/order/useOrders';
import usePatchOrder from '../../hooks/order/usePatchOrder';
import { useNavigate } from 'react-router-dom';

const OrderContent: React.FC = () => {
  const { orders, loading, error, refetch } = useOrders();
  const { patchOrder } = usePatchOrder();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = async (orderId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      await patchOrder(orderId, newStatus);
      await refetch(); 
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const navigate = useNavigate();

  function handleWiewDetails(id: number) {
    navigate(`/orderdetails/${id}`);
  }

  return (
    <div className="overflow-x-auto mt-5">
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          
          <div className="flex justify-center gap-2 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 px-4 py-2 border rounded"
              placeholder="Search by Order ID, Email, or Status"
            />
          </div>

          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Address</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Total Price</th>
                <th className="p-3 border">Created At</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr key={order.id} className="even:bg-gray-100">
                  <td className="p-3 border">{order.id}</td>
                  <td className="p-3 border">{order.email}</td>
                  <td className="p-3 border">{order.address}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded ${
                      order.status === 'Pending' ? 'bg-yellow-200' :
                      order.status === 'Completed' ? 'bg-green-200' :
                      'bg-gray-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 border">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-3 border">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-3 border">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleWiewDetails(order.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleStatusChange(order.id, order.status)}
                        className={`font-bold py-2 px-4 rounded ${
                          order.status === 'Pending' 
                            ? 'bg-yellow-500 hover:bg-yellow-700 text-white' 
                            : 'bg-green-500 hover:bg-green-700 text-white'
                        }`}
                      >
                        progress status
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderContent;