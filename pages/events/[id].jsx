import React, { useEffect, useRef, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import BarChart from "@/components/BarChart";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { Fragment } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Typography,
  Option,
  Input,
  Card,
} from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import { db } from "@/firebase/config";
import Link from "next/link";

const EventDetail = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { id } = router.query;
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState("all"); // 'all', 'blocked', or 'unblocked'
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [blockAll, setBlockAll] = useState(false);
  const blockAllCheckboxRef = useRef(null);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef);

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

   useEffect(() => {
     setLoading(true);

     try {
       const docRef = doc(db, "events", id);
       const unsubscribe = onSnapshot(docRef, (docSnap) => {
         if (docSnap.exists()) {
           console.log("Document data:", docSnap.data());
           setEvent(docSnap.data()); // Update the event state with the new data
           setLoading(false);
         } else {
           console.log("No such document!");
           setLoading(false);
           toast.error(
             "Unable to provide data check your internet connection and try again"
           );
         }
       });

       // Unsubscribe from the listener when the component unmounts
       return () => unsubscribe();
     } catch (error) {
       setLoading(false);
     }
   }, [id]);

   // Function to handle block status change for a user
   const handleUserBlockStatusChange = async (userID, block) => {
     // Update the local state
     const updatedUsers = users.map((user) => {
       if (user.id === userID) {
         return { ...user, block };
       }
       return user;
     });
     setUsers(updatedUsers);

     // Update the database with the new blocked status
     updateUserBlockStatus(userID, block);
   };

  const editHandler = async (e) => {
    e.preventDefault();
    console.log("Edit");

    try {
      const docRef = doc(db, "events", event.id);
      const eventData = {
        id: event.id,
        title: event.title,
        description: event.description,
        startDate: serverTimestamp(startDate),
        allowed_members: selectedUsers,
        venue: event.venue,
        imageUrl: event.imageUrl,
      };
      await setDoc(docRef, eventData);
      toast.success("Event updated successfully");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSortChange = () => {
    // Toggle the sorting order when this function is called
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers.slice().sort((a, b) => {
    // Filter users based on the 'sortOption' state
    if (sortOption === "blocked" || sortOption === "unblocked") {
      if (a.block !== b.block) {
        return sortOption === "blocked" ? (a.block ? -1 : 1) : a.block ? 1 : -1;
      }
    }

    // If 'sortOption' is 'all' or both users have the same 'block' status, sort based on 'sortOrder'
    if (sortOrder === "asc") {
      return a.block - b.block;
    } else {
      return b.block - a.block;
    }
  });

 
const handleUserCheckboxChange = async (userID, block) => {
  // Update the local state
  const updatedUsers = users.map((user) => {
    if (user.id === userID) {
      return { ...user, block };
    }
    return user;
  });
  setUsers(updatedUsers);

  // Update the database with the new blocked status
  updateUserBlockStatus(userID, block);
};
 // Add a handler function to toggle the "Block All" checkbox
 const handleBlockAllToggle = () => {
   // Toggle the value of 'blockAll' state
   setBlockAll(!blockAll);

   // If 'blockAll' is false, we unblock all users, else we block all users
   const updatedUsers = users.map((user) => ({
     ...user,
     block: !blockAll,
   }));

   // Update the 'users' state with the new user data
   setUsers(updatedUsers);

   // Update the database with the new blocked status for all users
   users.forEach((user) => {
     updateUserBlockStatus(user.id, !blockAll);
   });
 };
 // Update the 'blocked_members' field whenever users change
 useEffect(() => {
   if (event) {
     const blockedMembers = users
       .filter((user) => user.block)
       .map((user) => user.id);

     // Update the 'blocked_members' field in the 'events' document
     const docRef = doc(db, "events", event.id);
     try {
       setDoc(docRef, { blocked_members: blockedMembers }, { merge: true });
    
     } catch (error) {
       console.log(error);
       toast.error("Failed to update blocked members");
     }
   }
 }, [users, event]);

 // Function to update the 'blocked_members' field in the 'events' document
 const updateBlockedMembers = async (eventID, blockedMembers) => {
   const docRef = doc(db, "events", eventID);

   try {
     await setDoc(docRef, { blocked_members: blockedMembers }, { merge: true });

   } catch (error) {
     console.log(error);
     toast.error("Failed to update blocked members");
   }
 };

 // Function to update the 'block' field in the 'users' document
 const updateUserBlockStatus = async (userID, block) => {
   const userRef = doc(db, "users", userID);
   try {
     await setDoc(userRef, { block }, { merge: true });
  
   } catch (error) {
     console.log(error);
     toast.error("Failed to update user blocked status");
   }
 };
  return (
    <div>
      <div className="p-8 ">{/* Other code... */}</div>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Events details
          </h1>
          <button
            onClick={handleOpen}
            className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPencilAlt className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="mt-4">
          <div className="overflow-hidden bg-white shadow sm:rounded-md"></div>
        </div>
      </div>

      <div class="mt-6 border-t border-gray-100 p-8">
        {loading && <Loader />}
        {event && (
          <div className="mt-6 border-t border-gray-100 p-8">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Title
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {event.title}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm flex items-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{event.description}</p>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Venue
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {event.venue}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {event.startDate &&
                    new Date(event.startDate.toDate()).toLocaleString()}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Allowed Members
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {event.allowed_members &&
                    event.allowed_members.map((user) => (
                      <div className="flex items-center space-x-2">
                        <div>
                          <p>{user.fullName}</p>
                        </div>
                      </div>
                    ))}
                </dd>
              </div>
              <div>
                <h1 className="text-2xl">Block Users</h1>
                <p></p>
                <div className="">
                  <div className="m-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl">All users</h2>
                    </div>
                    <div className="flex justify-end items-center">
                      <span className="px-2">Sort by block</span>
                      <select className="rounded-md border-gray-500 py-2 px-8 border-2">
                        <option value="all">All</option>
                        <option value="blocked">Blocked</option>
                        <option value="unblocked">Unblocked</option>
                      </select>
                    </div>
                    <div className="flex justify-end  items-center">
                      <span className="px-2">Search</span>
                      <input
                        type="text"
                        placeholder="Search a user"
                        className="rounded-md border-gray-500 py-1 px-8 border-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        ref={blockAllCheckboxRef}
                        onChange={handleBlockAllToggle}
                      />
                      <label htmlFor="blockAll">Block All</label>
                    </div>
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
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              Block action
                            </Typography>
                          </th>
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
                        ) : sortedUsers.length > 0 ? (
                          sortedUsers.map((user) => (
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
                              <td className="p-4">
                                <input
                                  type="checkbox"
                                  checked={user.block}
                                  onChange={() =>
                                    handleUserCheckboxChange(
                                      user.id,
                                      !user.block
                                    )
                                  }
                                />
                              </td>

                              <td className="p-4">
                                <h2 className="text-blue-500">
                                  <Link
                                    href="/users/[id]"
                                    as={`/users/${user.id}`}
                                  >
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
                </div>
              </div>
            </dl>
          </div>
        )}
      </div>

      {/* Render the modal component */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Event</DialogHeader>
        <DialogBody divider>
          <form onSubmit={editHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">Title</span>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={event ? event.title : ""}
                  onChange={(e) =>
                    setEvent({ ...event, title: e.target.value })
                  }
                  className="block w-full mt-1 form-input py-3 border-2 rounded "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Venue</span>
                <Input
                  type="text"
                  name="venue"
                  id="venue"
                  required
                  value={event ? event.venue : ""}
                  onChange={(e) =>
                    setEvent({ ...event, venue: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Description</span>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  required
                  value={event ? event.description : ""}
                  onChange={(e) =>
                    setEvent({ ...event, description: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Date</span>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={event ? event.startDate : ""}
                  onChange={(e) =>
                    setEvent({ ...event, startDate: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Allowed Members</span>
                <div className="mt-1 space-y-2">
                  {users.map((user) => (
                    <label key={user.id} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        value={user.id}
                        checked={selectedUsers.some((u) => u.id === user.id)}
                        onChange={() => handleUserSelection(user.id)}
                      />
                      <span className="ml-2 text-gray-700">
                        {user.fullName}
                      </span>
                    </label>
                  ))}
                </div>
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleOpen}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 ml-4 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default EventDetail;
