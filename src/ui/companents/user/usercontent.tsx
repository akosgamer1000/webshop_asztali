/**
 * User Content Component
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
 */

import React from "react";
import "../../style/basic.css";
import useUsers from "../../hooks/user/useUsers";
import { useNavigate } from "react-router-dom"; 
import DataTable, { Column } from '../common/DataTable';

/**
 * User Content Component
 * 
 * This component renders a data table containing user information and provides
 * navigation to user details and user creation.
 * 
 * The component uses:
 * - useUsers hook for fetching user data
 * - DataTable component for displaying users
 * - React Router for navigation
 * 
 * @returns {JSX.Element} The rendered user content component
 */
const UserContent: React.FC = () => {
  // Fetch users data and handle loading/error states
  const { users, loading, error } = useUsers();
  const navigate = useNavigate();

  /**
   * Handle user row click
   * 
   * Navigates to the user details page when a user row is clicked.
   * 
   * @param {any} user - The user object that was clicked
   */
  function handleUserClick(user: any) {
    navigate(`/user/${user.id}`);
  }

  /**
   * Table column definitions
   * 
   * Defines the structure and display of user data in the table.
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
          onClick={() => navigate('/adduser')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UserContent;