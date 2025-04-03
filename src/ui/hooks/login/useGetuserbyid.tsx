import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    password: string;
    role: string;
}

const useGetUserById = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      

      try {
        const response = await axiosInstance.get<User>(`/user/${userId}`);
    
        setUser(response.data);
        setError(null);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.code === 'ERR_NETWORK') {
            setError("Network error: Unable to connect to the server");
          } else if (err.response) {
            switch (err.response.status) {
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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

export default useGetUserById;