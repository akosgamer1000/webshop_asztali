import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';

interface UserUpdateData {
  username?: string;
  email?: string;
  password?: string;
}

const usePatchUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateUser = async (userId: number, updateData: UserUpdateData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axiosInstance.patch(`/users/${userId}`, updateData);
      setSuccess(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          switch (err.response.status) {
            case 400:
              setError("Invalid user data provided");
              break;
            case 401:
              setError("Unauthorized: Please log in again");
              break;
            case 403:
              setError("Forbidden: You don't have permission to update this user");
              break;
            case 404:
              setError(`User with ID ${userId} not found`);
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
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error, success };
};

export default usePatchUser;