import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';



interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const changePassword = async (passwordData: ChangePasswordData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    console.log('Sending password change request:', JSON.stringify(passwordData));

    try {
      const response = await axiosInstance.patch('/auth/changePassword', passwordData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        console.error('Password change error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        
        if (error.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (error.response) {
          switch (error.response.status) {
            case 401:
              setError("wrong old password")
              break;
           
            case 404:
              setError("User not found");
              break;
            case 400:
              const errorData = error.response.data as { message?: string };
              if (errorData.message) {
                setError(`Bad request: ${errorData.message}`);
              } else {
                setError("Invalid password data");
              }
              break;
            case 403:
              setError("Incorrect old password");
              break;
            case 500:
              setError("Server error");
              break;
            default:
              setError(`Error: ${error.response.status}`);
          }
        }
      } else {
        console.error('Non-Axios error:', err);
        setError("An unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    error,
    success
  };
};

export default useChangePassword; 