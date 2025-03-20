import React from 'react';
import { useParams } from 'react-router-dom';
import useGetUserById from '../hooks/useGetuserbyid';

const ProfileContent: React.FC = () => {
   const { id } = useParams();
    if (!id) {
        return <div>Invalid user ID</div>;
    }
    console.log(id)
    const { user } = useGetUserById(Number.parseInt(id));

    if (!user) {
        return <div>User not found</div>;
    }
  

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
      
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Username
          </label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Role
          </label>
          <input
            type="text"
            value={user.role}
            readOnly
            className="p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Password
          </label>
          <div className="flex gap-4">
            <input
              type="password"
              value={user.password}
              readOnly
              className="p-2 border border-gray-300 rounded-md bg-gray-50 flex-grow"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Change Password
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;