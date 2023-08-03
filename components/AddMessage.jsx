import React, { useEffect } from "react";
//import { Button } from "@/components/ui/button";
import { onSnapshot } from "firebase/firestore";

import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import { db } from "@/firebase/config";

const AddMessage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleOpen = () => setOpen(!open);

  const [notification, setNotification] = useState({
    title: "",
    message: "",
    recipients: [""],//this is an array of strings which will contain tokens

    read: [],
  });
  {/**fetch tokenss from fcmToken which is a field of a user document in a users collection*/}
   useEffect(
     () => {
       const fetchTokens = async () => {
         const querySnapshot = await getDocs(collection(db, "users"));
         const tokens = querySnapshot.docs.map((doc) => doc.data().fcmToken);
         // Update recipient field of notification document with tokens
         setNotification({ ...notification, recipients: tokens });
       };

       fetchTokens();

       // Set up a Firestore listener for "users" collection to update tokens in real-time
       const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
         const tokens = snapshot.docs.map((doc) => doc.data().fcmToken);
         // Update recipient field of notification document with updated tokens
         setNotification({ ...notification, recipients: tokens });
       });

       // Clean up the listener when the component is unmounted
       return () => unsubscribe();
     },
     [
       /* Add any dependencies if needed */
     ]
   );


  console.log('working',notification.recipients);
const handleAddNotification = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
  //create a notification document in notifications collection
  const docRef = doc(collection(db, "notifications"), nanoid());
  await setDoc(docRef, {
    id: docRef.id,
    title: notification.title,
    message: notification.message,
    recipients: notification.recipients,
    read: notification.read,
    date: new Date()
  });
  toast.success("Message sent successfully");
  setNotification({ title: "", message: "", recipient: [""], read: [""] });
  setLoading(false);
  setOpen(false);
} catch (error) {
  toast.error(error.message);
  setLoading(false);
  console.log(error.message);

}


}







   

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <h2 className="font-bold text-2xl">Notifications</h2>
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
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
                  <span>Send</span>
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
