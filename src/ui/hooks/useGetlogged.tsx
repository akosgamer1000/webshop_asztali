import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';

interface User {
  sub: number;
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
        setId(response.data.sub);
        setError(null);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.status === 401 ? "Unauthorized" : "Failed to fetch user");
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