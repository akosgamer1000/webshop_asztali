import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';

interface User {
  id: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

const useGetLogged = () => {
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const response = await axiosInstance.get<User>("/auth/profile");
        setId(response.data.id);
        setError(null);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.code === 'ERR_NETWORK') {
            setError("Network error: Unable to connect to the server");
          } else if (err.response) {
            switch (err.response.status) {
              case 401:
                setError("Unauthorized: Please log in again");
                break;
              case 403:
                setError("Forbidden: Access denied");
                break;
              case 404:
                setError("User profile not found");
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
        setId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedUser();
  }, []);

  return { id, loading, error };
};

export default useGetLogged;