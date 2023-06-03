import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  console.log(users);

 const deleteUser = async (id) => {
   try {
     await deleteDoc(doc(db, "users", id));
     toast.success("User deleted successfully");
    
   } catch (error) {
     console.error("Error removing document: ", error);
     toast.error("Failed to delete event and image");
     
   }
 };


  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Profile Type</th>
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
          ) : users && users.length > 0 ? (
            users.map((giving) => (
              <tr key={giving.id} className="text-center">
                <td className="border-2 px-4 py-2">{giving.fullName}</td>
                <td className="border-2 px-4 py-2">{giving.email}</td>
                <td className="border-2 px-4 py-2">{giving.phoneNumber}</td>
                <td className="border-2 px-4 py-2">{giving.profileType}</td>
                <td className="border-2 px-4 py-2">
                  <div className="flex  ">
                    <FaTrashAlt
                      size={20}
                      className="text-red-500 cursor-pointer mx-4"
                      onClick={() => deleteUser(giving.id, giving.photo)}
                    />
                    <FaEdit
                      size={20}
                      className="text-green-500 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
