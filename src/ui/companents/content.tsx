import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import "../style/basic.css";
import axiosInstance from "../misch/Axios";

interface ProductData {
  id: number;
  name: string;
  type: string;
  price: number;
  couantity: number;
}

const Content: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<ProductData[]>("/product");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.code === 'ERR_NETWORK') {
            setError("Network error: Unable to connect to the server");
          } else if (err.response) {
            switch (err.response.status) {
              case 404:
                setError("Products not found");
                break;
              case 500:
                setError("Server error");
                break;
              default:
                setError(`Error: ${err.response.status}`);
            }
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleView = (id: number) => {
    
    console.log(`Viewing product with id: ${id}`);
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
        </>
      )}
    </div>
  );
};

export default Content;