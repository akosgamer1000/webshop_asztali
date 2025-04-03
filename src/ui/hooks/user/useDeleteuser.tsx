import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

const useDeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: number) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/user/${userId}`);
      setError(null);
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          switch (err.response.status) {
            case 404:
              setError("User not found");
              break;
            case 403:
              setError("Not authorized to delete this user");
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
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    loading,
    error
  };
};

export default useDeleteUser;