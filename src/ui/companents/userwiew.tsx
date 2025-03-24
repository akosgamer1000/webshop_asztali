import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetUserById from '../hooks/useGetuserbyid';
import useDeleteUser from '../hooks/useDeleteuser';
import { useSelector } from 'react-redux';
import { selectUserId } from '../misch/store/authSlice';

const ProfileContent: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const deleteuser = useDeleteUser();
    const loggedInUserId = useSelector(selectUserId);
    if (!id) {
        return <div>Invalid user ID</div>;
    }
  
    const { user } = useGetUserById(Number.parseInt(id));

    if (!user) {
        return <div>User not found</div>;
    }

    const isOwnProfile = loggedInUserId === id;

    const handleDelete = async () => {
        if (isOwnProfile) {
            return; 
        }
        
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteuser.deleteUser(Number(id));
                navigate('/users');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

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
                    <select
                        value={user.role}
                    
                        className="p-2 border border-gray-300 rounded-md bg-gray-50"
                    >
                        <option value="user">User</option>
                        <option value="admin">Administrator</option>
                    </select>
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

                <div className="flex justify-end gap-4 pt-4">
                    <button 
                        onClick={handleDelete}
                        disabled={isOwnProfile}
                        className={`px-6 py-2 text-white rounded-md transition-colors ${
                            isOwnProfile 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                        }`}
                        title={isOwnProfile ? "You cannot delete your own profile" : "Delete User"}
                    >
                        Delete User
                    </button>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;