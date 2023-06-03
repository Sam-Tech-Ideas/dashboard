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
import { toast } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";

const AddEvent = () => {
  const [open, setOpen] = useState(false);



  const handleOpen = () => setOpen(!open);
 const [event, setEvent] = useState({
  //     // use the seconds from the date object for the id
       id: nanoid(),

      title: "",
      description: "",
      imageUrl: "",
     link: "",

       date: "",
       videoLink: "",
       
      });

    const [uploadProgress, setUploadProgress] = useState(0);

    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEvent({ ...event, [e.target.name]: value });
    };

    // const handleImageChange = (e) => {
    //   const file = e.target.files[0];
    //   console.log(file);

    //   const storageRef = ref(storage, `Eventimages/${Date.now()}${file.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, file);

    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       setUploadProgress(progress);
    //     },
    //     (error) => {
    //       alert(error.message);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setEvent({ ...event, imageUrl: downloadURL });
    //         alert("Image uploaded successfully");

    //         // console.log("File available at", downloadURL);
    //       });
    //     }
    //   );
    // };

  //   const addEvent = (e) => {
  //     e.preventDefault();
  //     console.log(event);

  //     try {
  //       const docRef = doc(db, "events", event.id); // Replace `event.id` with the actual document ID

  //       const eventData = {
  //         id: event.id,
  //         title: event.title,
  //         description: event.description,
  //         imageUrl: event.imageUrl,
  //         link: event.link,
  //         date: event.date,
  //       };
  //       setDoc(docRef, eventData);
  //       alert("Event added successfully");
  //       //console.log("Document written with ID: ", docRef.id);
  //     } catch (error) {
  //       console.log(error);
  //       alert(error.message);
  //     }
  //   };

  // const handleAddUser = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Add a new document with a generated id.
  //     const docRef = await addDoc(collection(db, "events"), {});
  //     toast.success("User created successfully");
  //     handleOpen();
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <h2 className="font-bold text-2xl">Events</h2>
          <div className="flex items-center">
            <button
              className="bg-purple-800 text-white px-4 py-2 rounded-lg m-2"
              onClick={handleOpen}
            >
              Add Event
            </button>
            {/* <button className="hover:text-blue-500">
            <FaFileDownload size={30} />
          </button> */}
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
          <DialogHeader>Create Event</DialogHeader>
          <DialogBody divider>
            <form onSubmit={""}>
              <div className="m-2">
                <label htmlFor="">Event title</label>
                <input
                  type="text"
                  placeholder="Event title"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event description</label>
                <input
                  type="text"
                  placeholder="Event description"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event date</label>
                <input
                  type="date"
                  placeholder="Event date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                />
              </div>
              {/**sermon image*/}
              {uploadProgress === 0 ? null : (
                <Progress value={uploadProgress} color="blue" />
              )}
              {/* <Progress value={50} label="Completed" /> */}
              <div className="flex flex-col mt-2">
                <label htmlFor="imageUrl">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                  onChange={(e) => handleImageChange(e)}
                />
                {event.imageUrl === "" ? null : (
                  <input
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={event.imageUrl}
                    disabled
                  />
                )}
              </div>

              
              <div className="m-2">
                <label htmlFor="">Event link</label>
                <input
                  type="text"
                  placeholder="Event video link"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="link"
                  onChange={handleInputChange}
                  value={event.link}
                />
              </div>

              <div className="flex justify-between m-4">
                <button
                  className="bg-blue-400 text-white px-6 py-2 rounded-xl"
                  onClick={""}
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

export default AddEvent;
