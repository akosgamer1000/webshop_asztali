import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';



const usePatchOneProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProductPrice = async (productId: number, newPrice: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.patch(
        `/product/${productId}`,
        { price: newPrice }
      );

      setSuccess(true);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError('Network error: Unable to connect to the server');
        } else if (err.response) {
          switch (err.response.status) {
            case 404:
              setError(`Product with ID ${productId} not found`);
              break;
            case 400:
              setError('Invalid price value');
              break;
            case 500:
              setError('Server error');
              break;
            default:
              setError(`Error: ${err.response.status}`);
          }
        }
      } else {
        setError('An unexpected error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProductPrice,
    loading,
    error,
    success
  };
};

export default usePatchOneProduct;