import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const UsersList = () => {
  const [users, setUsers] = useState([]); // [1]
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
        console.log(usersData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
 
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>

            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                <div className="flex justify-center  items-center space-x-2">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : (
            users.map((giving) => (
              <tr key={giving.id} className="text-center">
                <td className="border-2 px-4 py-2">{giving.fullName}</td>
                <td className="border-2 px-4 py-2">{giving.email}</td>
                <td className="border-2 px-4 py-2">{giving.phoneNumber}</td>
                <td className="border-2 px-4 py-2">
                  <div className="flex  ">
                    <FaTrashAlt
                      size={20}
                      className="text-red-500 cursor-pointer mx-4"
                    />
                    <FaEdit
                      size={20}
                      className="text-green-500 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
