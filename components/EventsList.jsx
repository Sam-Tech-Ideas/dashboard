import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import AddEvent from "./AddEvent";
import { FaFileDownload } from "react-icons/fa";



const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => doc.data());
        setEvents(eventsData);
        console.log(eventsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString(); // Adjust the formatting as per your requirements
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
