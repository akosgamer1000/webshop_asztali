import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';

interface ProductData {
  id: number;
  name: string;
  type: string;
  price: number;
  couantity: number;
}

const useProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return { products, loading, error };
};

export default useProducts;