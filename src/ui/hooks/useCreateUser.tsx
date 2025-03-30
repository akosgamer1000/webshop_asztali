

import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  address:string;
  role: string;
}

const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: CreateUserData) => {
    setLoading(true);
    try {
      await axiosInstance.post("/user", userData);
      setError(null);
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          switch (err.response.status) {
            case 400:
              setError("Invalid user data provided");
              
              break;
            case 409:
              setError("User already exists");
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
    createUser,
    loading,
    error
  };
};

export default useCreateUser;