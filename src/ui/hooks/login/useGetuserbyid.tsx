import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';
import { useAppDispatch } from '../../misch/Store';
import { logout } from '../../misch/store/authSlice';

interface UserData {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  // Add other user fields as needed
}

const useGetUserById = (userId: number) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<UserData>(`/user/${userId}`);
        setUser(response.data);
        setError(null);
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
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, dispatch]);

  return { user, loading, error };
};

export default useGetUserById;