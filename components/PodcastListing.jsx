import { db } from "@/firebase/config";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Link from "next/link";

const PodcastListing = () => {
  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "podcasts"), (snapshot) => {
    setLoading(true);
    const podcastsData = snapshot.docs.map((doc) => doc.data());
    setPodcast(podcastsData);
    setLoading(false);
  });

  // Cleanup the subscription
  return () => unsubscribe();
}, []);


  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString(); // Adjust the formatting as per your requirements
  };

  const deletePodcast = async (id) => {
    try {
      await deleteDoc(doc(db, "podcasts", id));

      toast.success("Podcast deleted successfully");
      {/**refresh page after deleting */}
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <>
      <div className="flex justify-between px-4 pt-8">
        <h2 className="font-bold text-2xl">Podcast Link</h2>
        <div className="flex items-center">

        </div>
      </div>
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
                      <p className="text-blue-500">
                        <Link href={`/podcast/${giving.id}`}>View Details</Link>
                      </p>
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

export default PodcastListing;
