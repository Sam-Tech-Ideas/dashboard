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
     
      </div>
    </>
  );
};

export default EventsList;
