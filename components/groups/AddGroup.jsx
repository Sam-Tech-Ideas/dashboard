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
import {
  Timestamp,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
//import { db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import { db, storage } from "@/firebase/config";

const AddGroup = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [group, setGroup] = useState({
    id: nanoid(),
    name: "",
    description: "",
    groupImage: "",

    groupLeader: "",
    meetingDays: [""],
    members: [""],
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const storageRef = ref(storage, `Grimages/${Date.now()}${file.name}`);
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
          setGroup({ ...group, groupImage: downloadURL });
          alert("Image uploaded successfully");
        });
      }
    );
  };

  const handleAddGroup = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "groups", group.id); // Replace `group.id` with the actual document ID

      const groupData = {
        id: group.id,
        name: group.name,

        description: group.description,
        groupImage: group.groupImage,
        groupLeader: group.groupLeader,
        meetingDays: group.meetingDays,
        members: group.members,
      };

      await setDoc(docRef, groupData);
      toast.success("Group created successfully");

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
              Create Group
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
          <DialogHeader>Create Group</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddGroup}>
              <div className="m-2">
                <label htmlFor="">Group name</label>
                <input
                  type="text"
                  placeholder="Group name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={group.name}
                  name="name"
                />
              </div>
              <div className="m-2">
                <label htmlFor="">group description</label>
                <input
                  type="text"
                  placeholder="group description"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={handleInputChange}
                  value={group.description}
                  name="description"
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
                {group.groupImage === "" ? null : (
                  <input
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
                    type="text"
                    name="imageUrl"
                    placeholder="Group image"
                    value={group.groupImage}
                    disabled
                  />
                )}
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

export default AddGroup;
