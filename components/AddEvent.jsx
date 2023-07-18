import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Progress,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { Timestamp, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";

const AddEvent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [event, setEvent] = useState({
    id: nanoid(),
    title: "",
    description: "",
    imageUrl: "",
    link: "",
    startDate: "",
    endDate: "",
    venue: "",
    //an array of strings of user IDs
    allowed_members: [""],
    attendees: [""],
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const storageRef = ref(storage, `Eimages/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setEvent({ ...event, imageUrl: downloadURL });
          alert("Image uploaded successfully");
        });
      }
    );
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    console.log(event);

    try {
      const docRef = doc(db, "events", event.id); // Replace `event.id` with the actual document ID

      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      const eventData = {
        id: event.id,
        title: event.title,
        startDate: serverTimestamp(startDate),
        endDate: serverTimestamp(endDate),
        venue: event.venue,
        description: event.description,
        imageUrl: event.imageUrl,
        link: event.link,
        //an array of strings of user IDs
        allowed_members: event.allowed_members,
      };

      await setDoc(docRef, eventData);
      toast.success("Event created successfully");

      handleOpen();

      //console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <div className="flex items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg "
              onClick={handleOpen}
            >
              Add Event
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
          <DialogHeader>Create Event</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddEvent}>
              <div className="m-2">
                <label htmlFor="">Event title</label>
                <input
                  type="text"
                  placeholder="Event title"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={event.title}
                  name="title"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event description</label>
                <input
                  type="text"
                  placeholder="Event description"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={event.description}
                  name="description"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Event date</label>
                <input
                  type="date"
                  placeholder="Starting Event date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={event.startDate}
                  name="startDate"
                />
              </div>
              {/* <div className="m-2">
                <label htmlFor="">Event date(end date)</label>
                <input
                  type="date"
                  placeholder="End date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full "
                  onChange={handleInputChange}
                  value={event.endDate}
                  name="endDate"
                />
              </div> */}

              {uploadProgress === 0 ? null : (
                <Progress value={uploadProgress} color="blue" />
              )}

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

              {/* <div className="m-2">
                <label htmlFor="">Event link</label>
                <input
                  type="url"
                  placeholder="Event link"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="link"
                  onChange={handleInputChange}
                  value={event.link}
                />
              </div> */}
              <div className="m-2">
                <label htmlFor="">Event venue</label>
                <input
                  type="text"
                  placeholder="Event venue"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  name="venue"
                  onChange={handleInputChange}
                  value={event.venue}
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

export default AddEvent;
