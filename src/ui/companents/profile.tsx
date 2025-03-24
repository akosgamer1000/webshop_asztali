import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserById from '../hooks/useGetuserbyid';
import picture from '../profile.png'
const ProfileContent: React.FC = () => {
  const { id } = useParams();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!id) {
    return <div>Invalid user ID</div>;
  }

  const { user } = useGetUserById(Number.parseInt(id));

  if (!user) {
    return <div>User not found</div>;
  }

  const handlePasswordChange = () => {
    // TODO: Implement password change logic
    console.log('Changing password:', oldPassword, newPassword);
    setShowPasswordChange(false);
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-200">
          <img
            src={ picture} 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600 mt-2">{user.email}</p>
      </div>

      <div className="space-y-6">
        {!showPasswordChange ? (
          <div className="flex justify-center">
            <button
              onClick={() => setShowPasswordChange(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Change Password
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter current password"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPasswordChange(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Save Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;