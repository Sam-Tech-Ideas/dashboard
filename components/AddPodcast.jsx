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

const AddPodcast = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [podcast, setPodcast] = useState({
    id: nanoid(),
    link: "",
  });

  const handleAddPodcast = async (e) => {
    e.preventDefault();
    console.log(podcast);

    try {
     const docRef = doc(db, "podcasts", podcast.id); // Replace `event.id` with the actual document ID

     const podcastData = {
       id: podcast.id,
        link: podcast.link,
      
     }; 
     setDoc(docRef, podcastData);
      toast.success("Podcast created successfully");
      handleOpen();
      {/**refetch documents after deleting */}
      console.log(podcast)

    } catch (error) {
      toast.error(error.message);
    }
  };
 // "https://feeds.fireside.fm/bibleinayear/rss";
  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <h2 className="font-bold text-2xl">Podcast Link</h2>
          <div className="flex items-center">
            <button
              className="bg-purple-800 text-white px-4 py-2 rounded-lg m-2"
              onClick={handleOpen}
            >
              Add Podcast Link
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
          <DialogHeader>Add Podcast Link</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddPodcast}>
              <div className="m-2">
                <label htmlFor="">Podcast link</label>
                <input
                  type="url"
                  placeholder="Podcast link"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  onChange={(e) => setPodcast({ ...podcast, link: e.target.value })}
                  value={podcast.link}
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

export default AddPodcast;
