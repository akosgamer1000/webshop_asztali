import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

interface Product {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  couantity: number;
  imgSrc: string;
  [key: string]: any;
}

const useGetProductById = <T extends Product>(productId: number) => {
  const [product, setProduct] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<T>(`/products/${productId}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          switch (err.response.status) {
            case 404:
              setError(`Product with ID ${productId} not found`);
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

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return { product, loading, error, refetch: fetchProduct };
};

export default useGetProductById;