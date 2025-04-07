/**
 * Order Product Item Component
 * 
 * A component that displays a product item within an order, showing its name and quantity.
 * Features:
 * - Fetches product details using a custom hook
 * - Displays loading and error states
 * - Clickable item that triggers product details view
 * - Responsive layout with hover effects
 */

import React from 'react';
import useGetProductById from '../../hooks/prod/useGetProductById';

/**
 * Props interface for the OrderProductItem component
 */
interface OrderProductItemProps {
    productId: number;                              // ID of the product to display
    quantity: number;                               // Quantity of the product in the order
    onProductClick: (productId: number) => void;    // Callback when product is clicked
}

/**
 * Component that renders a product item within an order
 * @param {OrderProductItemProps} props - Component properties
 * @returns {JSX.Element} A product item with name and quantity
 */
const OrderProductItem: React.FC<OrderProductItemProps> = ({ productId, quantity, onProductClick }) => {
    // Fetch product details using custom hook
    const { product, loading, error } = useGetProductById(productId);

    // Loading state
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

    // Error state
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

    // Render product item
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