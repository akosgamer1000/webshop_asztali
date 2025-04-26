/**
 * @file companents/user/usercontent.tsx
 * @module UI/Components/User
 * @description User Content Component
 * 
 * A React component that displays a list of users in a data table format.
 * It provides functionality for viewing user details and adding new users.
 * 
 * Features:
 * - Display users in a paginated data table
 * - Search users by name
 * - Navigate to user details on row click
 * - Add new user button
 * - Loading and error state handling
 * 
 * This component serves as the main interface for user management,
 * providing administrators with a comprehensive view of all users
 * in the system and tools to manage them.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React from "react";
import "../../style/basic.css";
import useUsers from "../../hooks/user/useUsers";
import { useNavigate } from "react-router-dom"; 
import DataTable, { Column } from '../common/DataTable';

/**
 * @interface User
 * @property {number} id - Unique identifier for the user
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} role - User's role in the system
 */

/**
 * User Content Component
 * 
 * @component
 * @description This component renders a data table containing user information and provides
 * navigation to user details and user creation.
 * 
 * The component uses:
 * - useUsers hook for fetching user data
 * - DataTable component for displaying users
 * - React Router for navigation
 * 
 * @returns {JSX.Element} The rendered user content component
 * @example
 * <Route path="/users" element={<UserContent />} />
 */
const UserContent: React.FC = () => {
  /**
   * Fetch users data and handle loading/error states
   */
  const { users, loading, error } = useUsers();
  const navigate = useNavigate();

  /**
   * Handle user row click
   * 
   * @function handleUserClick
   * @param {User} user - The user object that was clicked
   * @inner
   */
  function handleUserClick(user: any) {
    navigate(`/user/${user.id}`);
  }

  /**
   * Navigate to the user creation page
   * 
   * @function handleAddUser
   * @inner
   */
  function handleAddUser() {
    navigate('/adduser');
  }

  /**
   * Table column definitions
   * 
   * @type {Column<any>[]}
   * @description Defines the structure and display of user data in the table.
   * Each column specifies a header and the corresponding data accessor.
   */
  const columns: Column<any>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' }
  ];

  return (
    <div className="overflow-x-auto mt-5">
      <h2 className="text-xl font-bold mb-3">User List</h2>

      {/* Data table component for displaying users */}
      <DataTable
        data={users}
        columns={columns}
        keyField="id"
        loading={loading}
        error={error}
        searchPlaceholder="Search by name"
        searchFields={['name']}
        onRowClick={handleUserClick}
        itemsPerPage={5}
      />

      {/* Add new user button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddUser}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UserContent;