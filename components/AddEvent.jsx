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
 
const AddEvent = () => {
  

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  handleAddEvent = () => {
    console.log("Add Event");
  };


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
            <form onSubmit={''}>
              <div className="m-2">
                <label htmlFor="">Event title</label>
                <input
                  type="text"
                  placeholder="Event title"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event description</label>
                <input
                  type="text"
                  placeholder="Event description"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event date</label>
                <input
                  type="date"
                  placeholder="Event date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event image</label>
                <input
                  type="file"
                  placeholder="Event image"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event video link</label>
                <input
                  type="text"
                  placeholder="Event video link"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
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


//  <form onSubmit={addEvent}>
//    <div className="flex flex-col">
//      <label htmlFor="title">Title</label>
//      <input
//        className="p-2 border-2"
//        type="text"
//        name="title"
//        id="title"
//        placeholder="Enter title"
//        value={event.title}
//        onChange={handleInputChange}
//        required
//      />
//    </div>
//    <div className="flex flex-col">
//      <label htmlFor="description">Description</label>

//      <textarea
//        className="h-24 border-2 p-2"
//        name="description"
//        id="description"
//        placeholder="Enter description"
//        value={event.description}
//        onChange={handleInputChange}
//        required
//      />
//    </div>
//    <div className="flex flex-col">
//      <label htmlFor="link">Link</label>
//      <input
//        type="text"
//        name="link"
//        id="link"
//        placeholder="Enter link"
//        value={event.link}
//        onChange={handleInputChange}
//        required
//        className="border-2 p-2"
//      />
//    </div>
//    <div className="flex flex-col">
//      <label htmlFor="date">Date</label>
//      <input
//        className="p-2 border-2"
//        type="date"
//        name="date"
//        id="date"
//        placeholder="Enter date"
//        value={event.date}
//        onChange={handleInputChange}
//        required
//      />
//    </div>
//    {/**sermon image*/}
//    {uploadProgress === 0 ? null : (
//      <Progress value={uploadProgress} color="blue" />
//    )}
//    {/* <Progress value={50} label="Completed" /> */}
//    <div className="flex flex-col mt-2">
//      <label htmlFor="imageUrl">Upload Image</label>
//      <input
//        type="file"
//        accept="image/*"
//        name="imageUrl"
//        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
//        onChange={(e) => handleImageChange(e)}
//      />
//      {event.imageUrl === "" ? null : (
//        <input
//          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
//          type="text"
//          name="imageUrl"
//          placeholder="Image URL"
//          value={event.imageUrl}
//          disabled
//        />
//      )}
//    </div>

//    <div className="flex justify-end mt-4">
//      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
//        Create Event
//      </button>
//    </div>
//  </form>;


// import { db, storage } from "../firebase/config";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// import { Progress } from "@material-tailwind/react";
// import { Timestamp, addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";



// const EventContent = () => {
  
//   const [event, setEvent] = useState({
//     // use the seconds from the date object for the id
//     id: new Date().getTime(),
//     title: "",
//     description: "",
//     imageUrl: "",
//     link: "",

//     date: "",
//   });

//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEvent({ ...event, [e.target.name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file);

//     const storageRef = ref(storage, `Eimages/${Date.now()}${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         alert(error.message);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setEvent({ ...event, imageUrl: downloadURL });
//           alert("Image uploaded successfully");
//           // console.log("File available at", downloadURL);
//         });
//       }
//     );
//   };


  
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


