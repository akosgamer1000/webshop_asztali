import React from 'react';
import useGetProductById from '../../hooks/prod/useGetProductById';

interface OrderProductItemProps {
    productId: number;
    quantity: number;
    onProductClick: (productId: number) => void;
}

const OrderProductItem: React.FC<OrderProductItemProps> = ({ productId, quantity, onProductClick }) => {
    const { product } = useGetProductById(productId);

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