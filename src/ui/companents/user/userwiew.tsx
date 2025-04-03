import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetUserById from '../../hooks/login/useGetuserbyid';
import useDeleteUser from '../../hooks/user/useDeleteuser';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../misch/store/authSlice';

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

    const isOwnProfile = Boolean(id && loggedInUserId && Number(id) === Number(loggedInUserId));
   
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
                    <span className="text-sm font-medium text-gray-600">Username</span>
                    <span className="p-2 text-gray-800">{user.name}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Email Address</span>
                    <span className="p-2 text-gray-800">{user.email}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Address</span>
                    <span className="p-2 text-gray-800">{user.address || 'No address provided'}</span>
                    <div className="h-px bg-gray-200"></div>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600">Role</span>
                    <span className="p-2 text-gray-800 capitalize">{user.role}</span>
                    <div className="h-px bg-gray-200"></div>
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
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;