/**
 * @file companents/product/productcontent.tsx
 * @module UI/Components/Product
 * @description Product Content Component
 * 
 * A component that displays a list of all products in a data table format.
 * Features:
 * - Fetches and displays all products
 * - Search functionality across name, manufacturer, and type
 * - Clickable rows to view product details
 * - Add new product button
 * - Responsive design with consistent styling
 * 
 * This component serves as the main interface for product management,
 * allowing administrators to view the complete product catalog and navigate
 * to detailed views or add new products to the inventory.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/prod/useProducts";
import DataTable, { Column } from '../common/DataTable';

/**
 * Interface representing a product in the system
 * @interface Product
 * @property {number} id - Unique identifier
 * @property {string} name - Product name
 * @property {string} manufacturer - Manufacturer name
 * @property {string} type - Product type/category
 * @property {number} price - Product price
 * @property {number} quantity - Available quantity
 */
interface Product {
  id: number;           // Unique identifier
  name: string;         // Product name
  manufacturer: string; // Manufacturer name
  type: string;         // Product type/category
  price: number;        // Product price
  quantity: number;     // Available quantity
}

/**
 * Component that displays and manages a list of products
 * @component
 * @returns {JSX.Element} A data table containing product information
 * @example
 * <ProductContent />
 */
const Content: React.FC = () => {
  /**
   * Hooks for navigation and data fetching
   */
  const navigate = useNavigate();
  const { products, loading: productsLoading, error: dataError } = useProducts();

  /**
   * Navigates to the product details page
   * @function handleView
   * @param {Product} product - Product to view
   * @inner
   */
  const handleView = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  /**
   * Column configuration for the data table
   * Defines how each product property should be displayed
   * @type {Column<Product>[]}
   */
  const columns: Column<Product>[] = [
    { header: 'ID', accessor: 'id', width: '10%' },
    { header: 'Name', accessor: 'name', width: '25%' },
    { header: 'Manufacturer', accessor: 'manufacturer', width: '20%' },
    { header: 'Type', accessor: 'type', width: '15%' },
    { 
      header: 'Price ($)', 
      accessor: (item: Product) => `$${item.price.toFixed(2)}`,
      width: '15%'
    },
    { header: 'Quantity', accessor: 'quantity', width: '15%' }  
  ];

  /**
   * Navigate to the product creation workflow
   * @function handleAddProduct
   * @inner
   */
  const handleAddProduct = () => {
    navigate('/addProduct/select');
  };

  return (
    <div className="mt-5">
      {/* Products data table */}
      <DataTable
        data={products || []}
        columns={columns}
        keyField="id"
        loading={productsLoading}
        error={dataError}
        searchPlaceholder="Search by name, manufacturer or type"
        searchFields={['name', 'manufacturer', 'type']}
        onRowClick={handleView}
      />

      {/* Add new product button */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={handleAddProduct}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default Content;