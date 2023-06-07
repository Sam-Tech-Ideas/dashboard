import React from "react";
//import { Button } from "@/components/ui/button";

import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import { db } from "@/firebase/config";

const AddMessage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [notification, setNotification] = useState({
    id: nanoid(),
    title: "",
    message: "",
    recipient: [], //this is an array of users
    read: [],
    date: new Date().toLocaleString(),
  });

  const handleAddNotification = async (e) => {
    e.preventDefault();
    console.log(notification);

    
    try {
      const docRef = doc(db, "notifications", notification.id); // Replace `event.id` with the actual document ID

      const notificationData = {
        id: notification.id,
        title: notification.title,
        message: notification.message,

        recipient: notification.recipient,
        read: notification.read,
        date: notification.date,
      };

      setDoc(docRef, notificationData);
      toast.success("Notification created successfully");
      handleOpen();

      {
        /**refetch documents after deleting */
      }
      console.log(notification);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <h2 className="font-bold text-2xl">Notifications</h2>
          <div className="flex items-center">
            <button
              className="bg-purple-800 text-white px-4 py-2 rounded-lg m-2"
              onClick={handleOpen}
            >
              <span>Send a message</span>
            </button>
          </div>
        </div>

        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>
            <h5 className="text-gray-900 text-xl font-bold">Send a message</h5>
          </DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddNotification}>
              <div className="m-2">
                <label htmlFor="">Message title</label>
                <input
                  type="text"
                  placeholder="Message title"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={(e) =>
                    setNotification({ ...notification, title: e.target.value })
                  }
                  value={notification.title}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Message</label>
                <textarea
                  type="text"
                  placeholder="Message"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      message: e.target.value,
                    })
                  }
                  value={notification.message}
                />
              </div>

              <div className="flex justify-between m-4">
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded-xl"
                  type="submit"
                >
                  <span>Upload</span>
                </button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default AddMessage;
