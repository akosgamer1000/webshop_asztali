import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

interface UserUpdateData {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  role?: string;
}

interface UpdateUserResult {
  success: boolean;
  error?: string;
}

const usePatchUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const updateUser = async (userId: number, userData: UserUpdateData): Promise<UpdateUserResult> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axiosInstance.patch(`/user/${userId}`, userData);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (error.response) {
          switch (error.response.status) {
            case 401:
              setError("Unauthorized: Please log in again");
              dispatch(logout());
              break;
            case 404:
              setError(`User with ID ${userId} not found`);
              break;
            case 400:
              setError("Invalid user data");
              break;
            case 500:
              setError("Server error");
              break;
            default:
              setError(`Error: ${error.response.status}`);
          }
        }
      } else {
        setError("An unexpected error occurred");
      }
      return { success: false, error: error || undefined };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    loading,
    error,
    success
  };
};

export default usePatchUser;