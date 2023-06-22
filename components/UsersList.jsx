import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
        setLoading(false);
        console.log(usersData);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const editHandler = async (e) => {
    e.preventDefault();
    console.log("Edit");
    try {
      const docRef = doc(db, "users", user.id);
      const userData = {
        id: user.id,
        fullName: user.fullName,
        photo: user.photo,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileType: user.profileType,
      };
      await setDoc(docRef, userData);
      toast.success("User updated successfully");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Assign role.</DialogHeader>
        <DialogBody divider>
          <form onSubmit={editHandler}>
            <div className="mb-4 mx-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                placeholder="Select Role"
                name=""
                id=""
                className="p-2 w-full "
                value={user.profileType}
                onChange={(e) =>
                  setUser({ ...user, profileType: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-300 px-4 py-1 rounded text-white"
            >
              <span>Update</span>
            </button>
          </form>
        </DialogBody>
      </Dialog>
      {/* <table className="min-w-full table-auto">
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
              <tr key={giving.id} className="text-center hover:bg-gray-300">
                <Link href={`/users/${giving.id}`} key={giving.id}>
                  <td className="border-2 px-4 py-2">{giving.fullName}</td>
                  <td className="border-2 px-4 py-2">{giving.email}</td>
                  <td className="border-2 px-4 py-2">{giving.phoneNumber}</td>
                  <td className="border-2 px-4 py-2">{giving.profileType}</td>
                  <td className="border-2 px-4 py-2">
                    <Tooltip
                      content="Assign Role"
                      placement="top"
                      color="lightBlue"
                    >
                      <div className="flex  ">
                        <FaEdit
                          size={20}
                          className="text-green-500 cursor-pointer"
                          onClick={() => {
                            handleOpen();
                            setUser(giving);
                          }}
                        />
                      </div>
                    </Tooltip>
                  </td>
                </Link>
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
      </table> */}

      




    </div>
  );
};

export default UsersList;
