import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
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
  Option,
  Input,
  Card,
  Textarea,
} from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";

const NotificationDetail = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);

    try {
      const docRef = doc(db, "notifications", id);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setEvent(docSnap.data());
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");

          setLoading(false);
          toast.error(
            "Unable to provide data check your internet connection and try again"
          );
        }
      });
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  const editHandler = async (e) => {
    e.preventDefault();
    console.log("Edit");
    try {
      const docRef = doc(db, "notifications", event.id);
      const eventData = {
        id: event.id,

        title: event.title,
        message: event.message,
        
      };
      await setDoc(docRef, eventData);
      toast.success("User updated successfully");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-8 ">{/* O*/}</div>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Notification details
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
        {error && (
          <div className="p-8">
            <p className="text-red-500">Error: Unable to fetch user data</p>
          </div>
        )}
        {event && (
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Title</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {event.title}
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Message
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {event.message}
              </dd>
            </div>
          </dl>
        )}
      </div>

      {/* Render the modal component */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Event</DialogHeader>
        <DialogBody divider>
          <form onSubmit={editHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">Podcast Link</span>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={event ? event.title : ""}
                  onChange={(e) =>
                    setEvent({ ...event, title: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Event mesage</span>
                <Textarea
                  type="text"
                  name="message"
                  id="message"
                  value={event ? event.message : ""}
                  onChange={(e) =>
                    setEvent({ ...event, message: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
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

export default NotificationDetail;
