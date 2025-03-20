import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import "../style/basic.css";
import axiosInstance from "../misch/Axios";

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserContent: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
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
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto mt-5">
      <h2 className="text-xl font-bold mb-3">User List</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="even:bg-gray-100">
                <td className="p-3 border">{user.id}</td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.role}</td>
                <td className="p-3 border">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserContent;
