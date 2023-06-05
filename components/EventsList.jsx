import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import AddEvent from "./AddEvent";
import { FaEdit, FaFileDownload, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "events", id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      toast.success("Event deleted successfully");
      setLoading(true, 
         setTimeout(() => {
          setLoading(false);
        }, 300)

        );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    const formattedDate = date.toLocaleDateString(); // Extract only the date portion
    return formattedDate;
  };

  return (
    <>
      <AddEvent />
      <div className="overflow-x-auto p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">image</th>

              <th className="px-4 py-2">Event's Date</th>
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
              events.map((giving) => (
                <tr key={giving.id}>
                  <td className="border px-4 py-2">{giving.title}</td>
                  <td className="border px-4 py-2">
                    <img src={giving.imageUrl} width={100} alt="" />
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(giving.date)}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex  ">
                      <FaTrashAlt
                        size={20}
                        className="text-red-500 cursor-pointer mx-4"
                        onClick={() => deleteEvent(giving.id, giving.imageUrl)}
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
    </>
  );
};

export default EventsList;
