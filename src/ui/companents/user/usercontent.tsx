import React from "react";
import "../../style/basic.css";
import useUsers from "../../hooks/user/useUsers";
import { useNavigate } from "react-router-dom"; 
import DataTable, { Column } from '../common/DataTable';

const UserContent: React.FC = () => {
  const { users, loading, error } = useUsers();
  const navigate = useNavigate();

  function handleUserClick(user: any) {
    navigate(`/user/${user.id}`);
  }

  const columns: Column<any>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' }
  ];

  return (
    <div className="overflow-x-auto mt-5">
      <h2 className="text-xl font-bold mb-3">User List</h2>

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