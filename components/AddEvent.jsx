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
            <form action="">
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



