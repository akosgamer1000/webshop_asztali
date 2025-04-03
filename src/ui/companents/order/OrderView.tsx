import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetOrderById from '../../hooks/order/useGetOrderById';
import OrderProductItem from './OrderProductItem';

const OrderView: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        return <div>Invalid order ID</div>;
    }

    const { order, loading, error } = useGetOrderById(Number.parseInt(id));

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !order) {
        return <div>Order not found</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>
            
            <div className="space-y-6">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Order ID</span>
                    <span className="p-2 text-gray-800">#{order.id}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Email</span>
                    <span className="p-2 text-gray-800">{order.email}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Address</span>
                    <span className="p-2 text-gray-800">{order.address}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className={`p-2 capitalize ${
                        order.status === 'Pending' ? 'text-yellow-600' : 
                        order.status === 'Completed' ? 'text-green-600' : 
                        'text-gray-800'
                    }`}>{order.status}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

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

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Total Price</span>
                    <span className="p-2 text-gray-800">${order.totalPrice.toFixed(2)}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

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