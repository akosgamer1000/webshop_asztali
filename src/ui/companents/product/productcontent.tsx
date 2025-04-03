import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/prod/useProducts";
import usePatchOneProduct from '../../hooks/prod/usePatchoneproduct';
import DataTable, { Column } from '../common/DataTable';
import PriceUpdateForm from '../common/PriceUpdateForm';

const Content: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, error, refetch } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const patchProduct = usePatchOneProduct();

  const handleView = (product: any) => {
    navigate(`/products/${product.id}`);
  };

  const handleBulkPriceUpdate = async (percentageValue: number) => {
    try {
      for (const product of products) {
        const newPrice = product.price * (1 + percentageValue / 100);
        await patchProduct.updateProductPrice(product.id, newPrice);
      }
      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update prices:', error);
    }
  };

  const columns: Column<any>[] = [
    { header: 'ID', accessor: 'id', width: '10%' },
    { header: 'Name', accessor: 'name', width: '25%' },
    { header: 'Manufacturer', accessor: 'manufacturer', width: '20%' },
    { header: 'Type', accessor: 'type', width: '15%' },
    { 
      header: 'Price ($)', 
      accessor: (item) => `$${item.price.toFixed(2)}`,
      width: '15%'
    },
    { header: 'Quantity', accessor: 'couantity', width: '15%' }
  ];

  return (
    <div className="mt-5">
      <DataTable
        data={products}
        columns={columns}
        keyField="id"
        loading={loading}
        error={error}
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

        {isEditing ? (
          <PriceUpdateForm
            onUpdate={handleBulkPriceUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center mt-4"
          >
            Modify All Prices
          </button>
        )}
      </div>
    </div>
  );
};

export default Content;