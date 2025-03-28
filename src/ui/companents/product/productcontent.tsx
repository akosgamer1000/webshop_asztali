import React, { useState, useEffect } from "react";
import '../../style/basic.css'
import useProducts from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import usePatchOneProduct from '../../hooks/usePatchoneproduct';

const Content: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, error, refetch } = useProducts();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [isEditing, setIsEditing] = useState(false);
  const [percentage, setPercentage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const patchProduct = usePatchOneProduct();

  useEffect(() => {
    if (isUpdating) {
      refetch();
      setIsUpdating(false);
      setIsEditing(false);
      setPercentage('');
    }
  }, [isUpdating, refetch]);

  const handleBulkPriceUpdate = async () => {
    const percentageValue = parseFloat(percentage);
    if (!isNaN(percentageValue)) {
      try {
        for (const product of products) {
          const newPrice = product.price * (1 + percentageValue / 100);
          await patchProduct.updateProductPrice(product.id, newPrice);
        }
        setIsUpdating(true);
      } catch (error) {
        console.error('Failed to update prices:', error);
      }
    }
  };

  const handleView = (id: number) => {
    navigate(`/products/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto mt-5">
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <>
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">manufacturer</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Price ($)</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="even:bg-gray-100">
                  <td className="p-3 border">{item.id}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.manufacturer}</td>
                  <td className="p-3 border">{item.type}</td>
                  <td className="p-3 border">${item.price.toFixed(2)}</td>
                  <td className="p-3 border">{item.couantity}</td>
                  <td className="p-3 border">
                    <button 
                      onClick={() => handleView(item.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>

        
          <div className="flex flex-col items-center gap-4 mt-8">
            <button
              onClick={() => navigate('/addProduct/select')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center"
            >
              Add New Product
            </button>

            {isEditing ? (
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-20 px-2 py-1 border rounded"
                  placeholder="%"
                />
                <button
                  onClick={handleBulkPriceUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Update All Prices
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center mt-4"
              >
                Modify All Prices
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Content;