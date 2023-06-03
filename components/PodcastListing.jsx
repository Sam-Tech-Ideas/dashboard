import { db } from "@/firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const PodcastListing = () => {
  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "podcasts"));
        const podcastsData = querySnapshot.docs.map((doc) => doc.data());
        setPodcast(podcastsData);
        console.log(podcastsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString(); // Adjust the formatting as per your requirements
  };

  const deletePodcast = async (id) => {
    try {
      await deleteDoc(doc(db, "podcast", id));
     toast.success("Podcast  deleted successfully");
    } catch (error) {
      console.error("Error removing document: ", error);
      toast.error("Failed to delete event");
     
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Link</th>
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
            podcast.map((giving) => (
              <tr key={giving.id} className="text-center">
                <td className="border px-4 py-2">{giving.link}</td>
                <td className="border px-4 py-2 ">
                  <div className="flex">
                    <FaTrashAlt
                      size={20}
                      className="text-red-500 cursor-pointer mx-4"
                      onClick={(e) => deletePodcast(giving.id)}
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

export default PodcastListing;
