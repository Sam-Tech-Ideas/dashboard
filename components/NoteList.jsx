import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Loader from "./Loader";
import AddEvent from "./AddEvent";
import { FaEdit, FaFileDownload, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const NoteList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "notifications"),
      (snapshot) => {
        const notificationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full table-auto border-2 border-black">
          <thead className="border-2 border-black">
            <tr className="bg-gray-400 text-center">
              <th className="px-4 py-2 border border-r-gray-500">Title</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : (
              notifications.map((notification) => (
                <tr key={notification.id} className="text-center">
                  <td className="border px-4 py-2">{notification.title}</td>
                  <td>
                    <Card className="mt-6 w-full">
                      <CardBody>
                        <Typography>{notification.message}</Typography>
                      </CardBody>
                    </Card>
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

export default NoteList;
