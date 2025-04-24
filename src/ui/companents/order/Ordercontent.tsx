/**
 * Order Content Component
 * 
 * A component that displays a list of orders in a data table format.
 * Features:
 * - Fetches and displays all orders
 * - Allows status updates (Pending -> InProgress -> Delivered)
 * - Provides search functionality
 * - Shows order details in a table format
 * - Handles loading and error states
 * - Responsive design with consistent styling
 */

import React, { useState } from 'react';
import '../../style/basic.css'
import useOrders from '../../hooks/order/useOrders';
import usePatchOrder from '../../hooks/order/usePatchOrder';
import { useNavigate } from 'react-router-dom';
import DataTable, { Column } from '../common/DataTable';

/**
 * Enum representing possible order statuses
 */
enum Status {
  Pending = 'Pending',      // Initial order status
  InProgress = 'InProgress', // Order is being processed
  Delivered = 'Delivered',   // Order has been delivered
  Cancelled = 'Cancelled'    // Order has been cancelled
}

/**
 * Component that displays and manages a list of orders
 * @returns {JSX.Element} A data table containing order information
 */
const OrderContent: React.FC = () => {
  // Custom hooks for data fetching and updates
  const { orders, loading, error, refetch } = useOrders();
  const { updateOrder } = usePatchOrder();
  const navigate = useNavigate();
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);

  /**
   * Handles the status change of an order
   * Updates the order status in a cycle: Pending -> InProgress -> Delivered -> Pending
   * @param {number} orderId - ID of the order to update
   * @param {string} currentStatus - Current status of the order
   */
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

  /**
   * Handles the cancellation of an order
   * @param {number} orderId - ID of the order to cancel
   */
  const handleCancelOrder = async (orderId: number) => {
    setStatusUpdateError(null);
    try {
      let newStatus: Status = Status.Cancelled;
      console.log(newStatus)
      await updateOrder(orderId, { status: newStatus });
      await refetch();
    } catch (error) {
      console.error('Failed to cancel order:', error);
      setStatusUpdateError(`Failed to cancel order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  /**
   * Navigates to the order details page
   * @param {any} order - Order object containing details
   */
  function handleViewDetails(order: any) {
    navigate(`/orderdetails/${order.id}`);
  }

  /**
   * Column configuration for the data table
   * Defines how each order property should be displayed
   */
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
          order.status === Status.Cancelled ? 'bg-red-200' :
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
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(order.id, order.status);
            }}
            disabled={order.status === Status.Delivered || order.status === Status.Cancelled}
            className={`font-bold py-2 px-4 rounded ${
              order.status === Status.Pending 
                ? 'bg-yellow-500 hover:bg-yellow-700 text-white' 
                : order.status === Status.InProgress
                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                : order.status === Status.Delivered
                ? 'bg-green-500 text-white cursor-not-allowed opacity-50'
                : 'bg-gray-500 text-white cursor-not-allowed opacity-50'
            }`}
          >
            {order.status === Status.Delivered ? 'Delivered' : 
             order.status === Status.Cancelled ? 'Cancelled' : 'Progress Status'}
          </button>
          {(order.status === Status.Pending || order.status === Status.InProgress) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancelOrder(order.id);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="mt-5">
      {/* Status update error message */}
      {statusUpdateError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {statusUpdateError}
        </div>
      )}

      {/* Orders data table */}
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