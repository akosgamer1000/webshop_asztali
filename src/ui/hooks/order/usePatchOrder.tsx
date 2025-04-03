import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

interface PatchOrderResponse {
  success: boolean;
  message: string;
}

const usePatchOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const patchOrder = async (orderId: number, newStatus: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.patch<PatchOrderResponse>( `/order/${orderId}`,
        { status: newStatus }
      );
      
      setSuccess(true);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          switch (err.response.status) {
            case 404:
              setError("Order not found");
              break;
            case 400:
              setError("Invalid status update request");
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
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { patchOrder, loading, error, success };
};

export default usePatchOrder;