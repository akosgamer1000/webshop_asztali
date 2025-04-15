/**
 * User View Component
 * 
 * A React component that displays detailed information about a specific user.
 * It provides functionality for viewing user details and deleting users.
 * 
 * Features:
 * - Display user profile information
 * - Delete user functionality (except own profile)
 * - Loading and error state handling
 * - Navigation after user deletion
 * - Permission-based delete button
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetUserById from '../../hooks/login/useGetuserbyid';
import useDeleteUser from '../../hooks/user/useDeleteuser';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../misch/store/authSlice';

/**
 * User View Component
 * 
 * This component displays detailed information about a specific user and provides
 * functionality to delete the user (except for the user's own profile).
 * 
 * The component uses:
 * - useGetUserById hook for fetching user data
 * - useDeleteUser hook for user deletion
 * - Redux for accessing the logged-in user's ID
 * - React Router for navigation and parameter handling
 * 
 * @returns {JSX.Element} The rendered user view component
 */
const ProfileContent: React.FC = () => {
    // Get user ID from URL parameters and initialize hooks
    const { id } = useParams();
    const navigate = useNavigate();
    const deleteuser = useDeleteUser();
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const loggedInUserId = useSelector(selectUserId);
    
    // Validate user ID
    if (!id) {
        return <div className="text-xl text-red-600 text-center p-6">Invalid user ID</div>;
    }
  
    // Fetch user data
    const { user, loading, error } = useGetUserById(Number.parseInt(id));

    // Handle loading state
    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div className="text-xl text-red-600 text-center p-6">{error}</div>;
    }

    // Handle user not found state
    if (!user) {
        return <div className="text-xl text-red-600 text-center p-6">User not found</div>;
    }

    // Check if the profile being viewed is the logged-in user's profile
    const isOwnProfile = Boolean(id && loggedInUserId && Number(id) === Number(loggedInUserId));
   
    /**
     * Handle user deletion
     * 
     * This function handles the deletion of a user with the following checks:
     * - Prevents deletion of own profile
     * - Confirms deletion with user
     * - Handles success and error states
     * - Navigates to users list on success
     */
    const handleDelete = async () => {
        // Prevent deletion of own profile
        if (isOwnProfile) {
            setDeleteError("You cannot delete your own account");
            return; 
        }
        
        // Confirm deletion with user
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const success = await deleteuser.deleteUser(Number(id));
                if (success) {
                    
                    navigate('/users');
                } else {
                    setDeleteError(deleteuser.error || "Failed to delete user");
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                setDeleteError("An unexpected error occurred while deleting the user");
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h2>
            
            {/* Error message display */}
            {deleteError && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {deleteError}
                </div>
            )}
            
            {deleteuser.error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {deleteuser.error}
                </div>
            )}
            
            {/* User information display */}
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

                {/* Delete user button */}
                <div className="flex justify-end gap-4 pt-4">
                    <button 
                        onClick={handleDelete}
                        disabled={isOwnProfile || deleteuser.loading}
                        className={`px-6 py-2 text-white rounded-md transition-colors ${
                            isOwnProfile || deleteuser.loading
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                        }`}
                        title={isOwnProfile ? "You cannot delete your own profile" : "Delete User"}
                    >
                        {deleteuser.loading ? "Deleting..." : "Delete User"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;