import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";
import { Tooltip } from "@material-tailwind/react";

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

  const updateUserProfileType = async (id, newProfileType) => {
    try {
      await setDoc(doc(db, "users", id), { profileType: newProfileType });
      toast.success("User profile type updated successfully");
    } catch (error) {
      console.error("Error updating user profile type: ", error);
      toast.error("Failed to update user profile type");
    }
  };

  const deleteUser = async (id, photo) => {
    try {
      await deleteDoc(doc(db, "users", id));
      await deleteObject(ref(storage, photo));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error removing document: ", error);
      toast.error("Failed to delete user and image");
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
            users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border-2 px-4 py-2">{user.fullName}</td>
                <td className="border-2 px-4 py-2">{user.email}</td>
                <td className="border-2 px-4 py-2">{user.phoneNumber}</td>
                <td className="border-2 px-4 py-2">{user.profileType}</td>
                <td className="border-2 px-4 py-2">
                  <Tooltip
                    content="Assign Role"
                    placement="top"
                    color="lightBlue"
                  >
                    <div className="flex">
                      <FaTrashAlt
                        size={20}
                        className="text-red-500 cursor-pointer mx-4"
                        onClick={() => deleteUser(user.id, user.photo)}
                      />
                      <FaEdit
                        size={20}
                        className="text-green-500 cursor-pointer"
                        onClick={() => {
                          const newProfileType = prompt(
                            "Enter the new profile type:"
                          );
                          if (newProfileType) {
                            updateUserProfileType(user.id, newProfileType);
                          }
                        }}
                      />
                    </div>
                  </Tooltip>
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
