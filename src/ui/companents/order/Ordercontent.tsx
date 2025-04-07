import React, { useState } from 'react';
import '../../style/basic.css'
import useOrders from '../../hooks/order/useOrders';
import usePatchOrder from '../../hooks/order/usePatchOrder';
import { useNavigate } from 'react-router-dom';
import DataTable, { Column } from '../common/DataTable';

enum Status {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Delivered = 'Delivered'
}

const OrderContent: React.FC = () => {
  const { orders, loading, error, refetch } = useOrders();
  const { updateOrder } = usePatchOrder();
  const navigate = useNavigate();
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);

  const handleStatusChange = async (orderId: number, currentStatus: string) => {
    let newStatus: Status;
    switch (currentStatus) {
      case Status.Pending:
        newStatus = Status.InProgress;
        break;
      case Status.InProgress:
        newStatus = Status.Delivered;
        break;
      case Status.Delivered:
        newStatus = Status.Pending;
        break;
      default:
        newStatus = Status.Pending;
    }
    console.log(newStatus)
    setStatusUpdateError(null);
    try {
      await updateOrder(orderId, { status: newStatus });
      await refetch(); 
    } catch (error) {
      console.error('Failed to update order status:', error);
      setStatusUpdateError(`Failed to update order status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  function handleViewDetails(order: any) {
    navigate(`/orderdetails/${order.id}`);
  }

  const columns: Column<any>[] = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Email', accessor: 'email' },
    { header: 'Address', accessor: 'address' },
    { 
      header: 'Status', 
      accessor: (order) => (
        <span className={`px-2 py-1 rounded ${
          order.status === Status.Pending ? 'bg-yellow-200' :
          order.status === Status.InProgress ? 'bg-blue-200' :
          order.status === Status.Delivered ? 'bg-green-200' :
          'bg-gray-200'
        }`}>
          {order.status}
        </span>
      )
    },
    { 
      header: 'Total Price', 
      accessor: (order) => `$${order.totalPrice.toFixed(2)}` 
    },
    { 
      header: 'Created At', 
      accessor: (order) => new Date(order.createdAt).toLocaleString() 
    },
    { 
      header: 'Actions', 
      accessor: (order) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(order.id, order.status);
          }}
          disabled={order.status === Status.Delivered}
          className={`font-bold py-2 px-4 rounded ${
            order.status === Status.Pending 
              ? 'bg-yellow-500 hover:bg-yellow-700 text-white' 
              : order.status === Status.InProgress
              ? 'bg-blue-500 hover:bg-blue-700 text-white'
              : 'bg-green-500 text-white cursor-not-allowed opacity-50'
          }`}
        >
          {order.status === Status.Delivered ? 'Delivered' : 'Progress Status'}
        </button>
      )
    }
  ];

  return (
    <div className="mt-5">
      {statusUpdateError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {statusUpdateError}
        </div>
      )}
      <DataTable
        data={orders}
        columns={columns}
        keyField="id"
        loading={loading}
        error={error}
        searchPlaceholder="Search by Order ID or Status"
        searchFields={['id', 'status']}
        onRowClick={handleViewDetails}
        itemsPerPage={5}
      />
    </div>
  );
};

export default OrderContent;