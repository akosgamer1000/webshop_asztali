/**
 * Order View Component
 * 
 * A component that displays detailed information about a specific order.
 * Features:
 * - Fetches order details using a custom hook
 * - Displays order information including ID, email, address, status
 * - Shows list of products in the order with quantities
 * - Displays total price and order date
 * - Handles loading and error states
 * - Responsive layout with consistent styling
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetOrderById from '../../hooks/order/useGetOrderById';
import OrderProductItem from './OrderProductItem';

/**
 * Component that renders a detailed view of an order
 * @returns {JSX.Element} A detailed order view with all order information
 */
const OrderView: React.FC = () => {
    // Get order ID from URL parameters
    const { id } = useParams();
    const navigate = useNavigate();

    // Handle invalid order ID
    if (!id) {
        return <div>Invalid order ID</div>;
    }

    // Fetch order details using custom hook
    const { order, loading, error } = useGetOrderById(Number.parseInt(id));

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error || !order) {
        return <div className="text-xl text-red-600 text-center p-6">{error || "Order not found"}</div>;
    }

    // Render order details
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>
            
            <div className="space-y-6">
                {/* Order ID section */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Order ID</span>
                    <span className="p-2 text-gray-800">#{order.id}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                {/* Email section */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Email</span>
                    <span className="p-2 text-gray-800">{order.email}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                {/* Address section */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Address</span>
                    <span className="p-2 text-gray-800">{order.address}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                {/* Status section with conditional styling */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className={`p-2 capitalize ${
                        order.status === 'Pending' ? 'text-yellow-600' : 
                        order.status === 'Completed' ? 'text-green-600' : 
                        'text-gray-800'
                    }`}>{order.status}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                {/* Products section */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Products</span>
                    <div className="space-y-2">
                        {order.products.map((product) => (
                            <OrderProductItem
                                key={product.id}
                                productId={product.productId}
                                quantity={product.quantity}
                                onProductClick={(id) => navigate(`/products/${id}`)}
                            />
                        ))}
                    </div>
                    <div className="h-px bg-gray-200"></div>
                </div>

                {/* Total price section */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Total Price</span>
                    <span className="p-2 text-gray-800">${order.totalPrice.toFixed(2)}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                {/* Order date section */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Order Date</span>
                    <span className="p-2 text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <div className="h-px bg-gray-200"></div>
                </div>
            </div>
        </div>
    );
};

export default OrderView; 