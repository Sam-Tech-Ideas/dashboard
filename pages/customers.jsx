import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link.js";
import { auth, db } from "@/firebase/config.js";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CheckIcon } from "lucide-react";
import { toast } from "react-hot-toast";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);
  const [fullName, setFullName] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [blockAll, setBlockAll] = useState(false);
  const [sortOption, setSortOption] = useState("all"); // 'all', 'blocked', or 'unblocked'
  const [sortOrder, setSortOrder] = useState("asc");
 
  const password = "cosmic123"; //password for all users
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSortChange = () => {
    // Toggle the sorting order when this function is called
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortOptionChange = (e) => {
    // Update the sorting option when the select value changes
    setSortOption(e.target.value);
  };

  const handleBlockAllChange = (e) => {
    const isChecked = e.target.checked;
    setBlockAll(isChecked);

    // Update the block field for all users in the state
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        block: isChecked,
      }))
    );

    // Update all user documents in the database with the new block status
    users.forEach((user) => {
      updateDoc(doc(db, "users", user.id), { block: isChecked });
    });
  };

  const handleBlockChange = async (userId, isChecked) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, block: isChecked } : user
      )
    );

    // Update the user document in the database with the new block status
    try {
      await updateDoc(doc(db, "users", userId), { block: isChecked });
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers.slice().sort((a, b) => {
    // Filter users based on the 'sortOption' state
    if (sortOption === "blocked" && a.block !== b.block) {
      return a.block ? -1 : 1;
    } else if (sortOption === "unblocked" && a.block !== b.block) {
      return a.block ? 1 : -1;
    }

    // If 'sortOption' is 'all' or both users have the same 'block' status, sort based on 'sortOrder'
    if (sortOrder === "asc") {
      return a.block - b.block;
    } else {
      return b.block - a.block;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Function to get the index of the first and last user of the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //authenticating user and storing in user database
  const addUser = async () => {
     try{
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await db.collection("users").doc(user.uid).set({
          fullName: fullName,
          email: email,
          block: false,
          id: user.uid,
        });
        console.log("user added");
     }
     catch(error){
       console.log(error)
       toast.error(error.message);
     }


    handleOpen();
  };

  return (
    <div className="">
      <div className="m-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl">All users</h2>
        </div>

        {/* <div className="flex justify-end items-center">
          <span className="px-2">Sort by block</span>
          <select
            className="rounded-md border-gray-500 py-2 px-8 border-2"
            value={sortOption}
            onChange={handleSortOptionChange}
          >
            <option value="all">All</option>
            <option value="blocked">Blocked</option>
            <option value="unblocked">Unblocked</option>
          </select>
        </div> */}
        <div className="flex justify-end  items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addUser}
          >
            add user
          </button>

          <span className="px-2">Search</span>
          <input
            type="text"
            placeholder="Search a user"
            className="rounded-md border-gray-500 py-1 px-8 border-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* <div className="flex justify-end  items-center">
          <span className="px-2">Block all</span>
          <input
            type="checkbLinkox"
            checked={blockAll}
            onChange={handleBlockAllChange}
          />
        </div> */}
      </div>

      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                onClick={handleSortChange}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Email
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Role
                </Typography>
              </th>
              {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Block action
                </Typography>
              </th> */}
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4">
                  Loading...
                </td>
              </tr>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-300">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.fullName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.profileType}
                    </Typography>
                  </td>
                  {/*  <td className="p-4">
                   <form>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={user.block || false}
                        onChange={(e) =>
                          handleBlockChange(user.id, e.target.checked)
                        }
                      />
                    </form> 
                      </td>*/}
                  <td className="p-4">
                    <h2 className="text-blue-500">
                      <Link href="/users/[id]" as={`/users/${user.id}`}>
                        View Details
                      </Link>
                    </h2>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(sortedUsers.length / usersPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 text-sm font-medium rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Creating a new user</DialogHeader>
          <DialogBody>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Create</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </div>
  );
};

export default Customers;
