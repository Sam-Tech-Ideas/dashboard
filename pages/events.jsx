

import React, { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { FaEdit, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
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
  Option,
  Input,
} from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import { Card, Typography } from "@material-tailwind/react";
import { RxDotsVertical } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import AddEvent from "@/components/AddEvent";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]); // Step 1: State to keep track of selected users

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);


   const handleUserSelect = (userId) => {
     // Step 2: Function to handle the selection of users
     if (selectedUsers.includes(userId)) {
       setSelectedUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
     } else {
       setSelectedUsers((prevUsers) => [...prevUsers, userId]);
     }
   };

  useEffect(() => {
    setLoading(true);

    try {
      const q = query(collection(db, "events"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);


    const createEvent = async (eventData) => {
      try {
        const newEventRef = await addDoc(collection(db, "events"), eventData);
        const eventId = newEventRef.id;
        await updateEventWithSelectedUsers(eventId); // Step 3: Update the event with selected users
        toast.success("Event created successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error creating event");
      }
    };


  const deleteEvent = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "events", id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.success("Event deleted successfully");
    }
  };

  return (
    <div>
      <div className="p-8 ">{/* Other code... */}</div>
      <div className="p-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
          </div>

          <div className="flex items-center space-x-2">
            <AddEvent />
          </div>
        </div>

        <div className="mt-4">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            {/* Other code... */}
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-b tracking-wider text-left text-black uppercase"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Venue
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Description
                      </th>
                       <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Attendees
                      </th> 

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={event.imageUrl}
                                alt=""
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.venue}
                          </div>
                        </td>

                        <td className="px-6 py-4 ">
                          <p className="text-sm text-gray-900">
                            {event.description}
                          </p>
                        </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {/* {event.attendees.length} */}
                          </div>
                        </td> 

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {/**open a @material tailwind menu when an icon is clicked */}

                            <Menu>
                              <MenuHandler>
                                <button>
                                  <FaEllipsisV className="w-5 h-5" />
                                </button>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem>
                                  <Link href={`/events/${event.id}`}>
                                    View Details
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  className="text-red-500"
                                  onClick={() =>
                                    deleteEvent(event.id, event.imageUrl)
                                  }
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Dialog open={open} handler={handleOpen}>
                  <DialogHeader>Edit User</DialogHeader>
                  <DialogBody divider></DialogBody>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;

