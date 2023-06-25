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
import Link from "next/link";

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
    <div>
      {notifications.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <Typography color="gray" className="text-2xl">
            No notifications available
          </Typography>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading ? (
          <Loader />
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id}>
              <CardBody>
                <Typography color="gray" className="font-bold text-lg">
                  {notification.title}
                </Typography>
                <Typography>{notification.message}</Typography>
              </CardBody>
              <CardFooter>
                <Link href={`/notification/${notification.id}`}>
                  <Button
                    color="blue"
                    size="sm"
                    ripple="light"
                    className="mx-4"
                  >
                    <FaEdit className="mr-1" />
                  </Button>
                </Link>
                <Button
                  color="red"
                  size="sm"
                  ripple="light"
                  onClick={() => {
                    deleteDoc(doc(db, "notifications", notification.id));
                    toast.success("Notification deleted successfully");
                  }}
                >
                  <FaTrashAlt className="mr-1" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;
