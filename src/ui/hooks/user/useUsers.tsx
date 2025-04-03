import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  address:string;
  role: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    console.log("Fetching users...");
    setLoading(true);
    try {
      const response = await axiosInstance.get<UserData[]>("/user");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server. Please check if the server is running.");
        } else if (error.response) {
          switch (error.response.status) {
            case 404:
              setError("API endpoint not found. Please check the server configuration.");
              break;
            case 500:
              setError("Internal server error. Please try again later.");
              break;
            default:
              setError(`Server error: ${error.response.status} - ${error.response.statusText}`);
          }
        } else if (error.request) {
          setError("No response received from server. Please check your connection.");
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
};

export default useUsers;