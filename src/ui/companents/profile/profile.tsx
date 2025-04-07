import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserById from '../../hooks/login/useGetuserbyid';
import useChangePassword from '../../hooks/user/useChangePassword';
import picture from '../../profile.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfileContent: React.FC = () => {
  const { id } = useParams();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const { user, loading, error } = useGetUserById(Number.parseInt(id || '0'));
  const { changePassword, loading: passwordLoading, error: passwordChangeError, success: passwordChangeSuccess } = useChangePassword();

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/.-])[A-Za-z\d@$!%*?&/.-]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must include lowercase, uppercase, number, and special character";
    }

    return null;
  };

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

 
  useEffect(() => {
    if (passwordChangeError) {
      setPasswordError(passwordChangeError);
      setSuccessMessage(null);
    }
  }, [passwordChangeError]);

 
  useEffect(() => {
    if (passwordChangeSuccess) {
      setShowPasswordChange(false);
      setOldPassword('');
      setNewPassword('');
      setPasswordError(null);
      setSuccessMessage("Password updated successfully!");
      
     
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [passwordChangeSuccess]);

  if (!id) {
    return <div className="text-xl text-red-600 text-center p-6">Invalid user ID</div>;
  }

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-xl text-red-600 text-center p-6">{error}</div>;
  }

  if (!currentUser) {
    return <div className="text-xl text-red-600 text-center p-6">User not found</div>;
  }

  const handlePasswordChange = async () => {
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setPasswordError(validationError);
      setSuccessMessage(null);
      return;
    }

    try {
      await changePassword({
        oldPassword,
        newPassword
      });
  
    } catch (error) {
     
      console.error("Password change error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-200">
          <img
            src={picture} 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{currentUser.name}</h2>
        <p className="text-gray-600 mt-2">{currentUser.email}</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
          {successMessage}
        </div>
      )}

      <div className="space-y-6">
        {!showPasswordChange ? (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setShowPasswordChange(true);
                setSuccessMessage(null);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Change Password
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {passwordError && (
              <div className="text-red-500 text-sm font-medium text-center">
                {passwordError}
              </div>
            )}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showOldPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordError(null);
                  setOldPassword('');
                  setNewPassword('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                disabled={!oldPassword || !newPassword || passwordLoading}
              >
                {passwordLoading ? 'Saving...' : 'Save Password'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;