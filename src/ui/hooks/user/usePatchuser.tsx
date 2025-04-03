import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

interface UserUpdateData {
  username?: string;
  email?: string;
  password?: string;
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

  const updateUser = async (userId: number, updateData: UserUpdateData): Promise<UpdateUserResult> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axiosInstance.patch(`/user/${userId}`, updateData);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      let errorMessage = "An unexpected error occurred";
      
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          errorMessage = "Network error: Unable to connect to the server";
        } else if (err.response) {
          switch (err.response.status) {
            case 400:
              errorMessage = "Invalid user data provided";
              break;
            case 401:
              errorMessage = "Unauthorized: Please log in again";
              break;
            case 403:
              errorMessage = "Forbidden: You don't have permission to update this user";
              break;
            case 404:
              errorMessage = `User with ID ${userId} not found`;
              break;
            case 500:
              errorMessage = "Server error";
              break;
            default:
              errorMessage = `Error: ${err.response.status}`;
          }
        }
      }
      
      setError(errorMessage);
      setSuccess(false);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error, success };
};

export default usePatchUser;