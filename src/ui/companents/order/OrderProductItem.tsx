import React from 'react';
import useGetProductById from '../../hooks/prod/useGetProductById';

interface OrderProductItemProps {
    productId: number;
    quantity: number;
    onProductClick: (productId: number) => void;
}

const OrderProductItem: React.FC<OrderProductItemProps> = ({ productId, quantity, onProductClick }) => {
    const { product, loading, error } = useGetProductById(productId);

    if (loading) {
        return (
            <div className="p-2 border rounded">
                <div className="flex justify-between items-center">
                    <span>Loading product...</span>
                    <span className="text-gray-600">Quantity: {quantity}</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-2 border rounded border-red-200 bg-red-50">
                <div className="flex justify-between items-center">
                    <span className="text-red-500">Error loading product: {productId}</span>
                    <span className="text-gray-600">Quantity: {quantity}</span>
                </div>
            </div>
        );
    }

    return (
        <div 
            onClick={() => onProductClick(productId)}
            className="p-2 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
        >
            <div className="flex justify-between items-center">
                <span>{product?.name || `Product #${productId}`}</span>
                <span className="text-gray-600">Quantity: {quantity}</span>
            </div>
        </div>
    );
};

export default OrderProductItem;