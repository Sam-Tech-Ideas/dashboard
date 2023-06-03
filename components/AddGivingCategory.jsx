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
import { collection, addDoc } from "firebase/firestore";

import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { doc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { FaFileDownload } from "react-icons/fa";

const AddGivingCategory = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "category"), {
        id: nanoid(),
        name: name,
        type: type,
      });
      toast.success("Category created successfully");
      handleOpen();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add a new document with a generated id.

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <h2 className="font-bold text-2xl">Givings</h2>
          <div className="flex items-center">
            <button
              className="bg-purple-800 text-white px-4 py-2 rounded-lg m-2"
              onClick={handleOpen}
            >
              Create category
            </button>
            <button className="hover:text-blue-500">
              <FaFileDownload size={30} />
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
          <DialogHeader>Add Category</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleCreateCategory}>
              <div className="m-2">
                <label htmlFor="">Category name</label>
                <input
                  type="text"
                  placeholder="Category name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Category type</label>
                <select
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) => setType(e.target.value)}
                >
                  {" "}
                  <option value="">Select category type</option>
                  <option value="donation" className="">Donation</option>
                  <option value="pledges" className="">Pledges</option>
                  <option value="tithe">Tithe</option>
                  <option value="seeds">Seeds</option>
                  <option value="partnership">Partnership</option>
                  <option value="offering">Offering</option>
                  <option value="others">Others</option>
                </select>
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

export default AddGivingCategory;
