import React from "react";

const UserList = () => {
     const users = [
       { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
       { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
       { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
     ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border-2 px-4 py-2">{user.name}</td>
              <td className="border-2 px-4 py-2">{user.email}</td>
              <td className="border-2 px-4 py-2">{user.role}</td>
            </tr>
        
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
