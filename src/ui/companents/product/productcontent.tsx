import React from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/prod/useProducts";
import DataTable, { Column } from '../common/DataTable';

interface Product {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  couantity: number; 
}

const Content: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading: productsLoading, error: dataError } = useProducts();

  const handleView = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

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