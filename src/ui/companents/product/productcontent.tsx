/**
 * Product Content Component
 * 
 * A component that displays a list of all products in a data table format.
 * Features:
 * - Fetches and displays all products
 * - Search functionality across name, manufacturer, and type
 * - Clickable rows to view product details
 * - Add new product button
 * - Responsive design with consistent styling
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/prod/useProducts";
import DataTable, { Column } from '../common/DataTable';

/**
 * Interface representing a product in the system
 */
interface Product {
  id: number;           // Unique identifier
  name: string;         // Product name
  manufacturer: string; // Manufacturer name
  type: string;         // Product type/category
  price: number;        // Product price
  couantity: number;    // Available quantity
}

/**
 * Component that displays and manages a list of products
 * @returns {JSX.Element} A data table containing product information
 */
const Content: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading: productsLoading, error: dataError } = useProducts();

  /**
   * Navigates to the product details page
   * @param {Product} product - Product to view
   */
  const handleView = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  /**
   * Column configuration for the data table
   * Defines how each product property should be displayed
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
    { header: 'Quantity', accessor: 'couantity', width: '15%' }  
  ];

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
          onClick={() => navigate('/addProduct/select')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default Content;