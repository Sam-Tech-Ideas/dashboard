import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";
import { FaFileDownload } from "react-icons/fa";

const AddGiving = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [giving, setGiving] = useState({
    id: nanoid(),
    full_name: "",
    date_paid: "",
    amount: "",
    giving_type: "",
    contact: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleAddGiving = async (e) => {
    e.preventDefault();

    try {
      const givingData = {
        id: giving.id,
        full_name: giving.full_name,
        date_paid: serverTimestamp(),
        amount: Number(giving.amount),
        giving_type: giving.giving_type,
        contact: giving.contact,
      };

      await addDoc(collection(db, "givings"), givingData);

      toast.success("Giving created successfully");
      handleOpen();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-800 flex items-center"
              onClick={handleOpen}
            >
              Record a giving
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
          <DialogHeader>Add Giving</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddGiving}>
              <div className="m-2">
                <label htmlFor="">Giver's name</label>
                <input
                  type="text"
                  placeholder="Giver's name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) =>
                    setGiving({ ...giving, full_name: e.target.value })
                  }
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Giver's contact</label>
                <input
                  type="text"
                  placeholder="Giver's contact"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) =>
                    setGiving({ ...giving, contact: e.target.value })
                  }
                  value={giving.contact}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">
                  Giving type <span className="text-gray-400">(Ghc)</span>
                </label>
                <select
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  value={giving.giving_type}
                  onChange={(e) =>
                    setGiving({ ...giving, giving_type: e.target.value })
                  }
                >
                  <option value="Tithes">Tithe</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Offering">Offering</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="m-2">
                <label htmlFor="">
                  Amount <span className="text-gray-400">(Ghc)</span>
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) =>
                    setGiving({ ...giving, amount: e.target.value })
                  }
                  value={giving.amount}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) =>
                    setGiving({ ...giving, date_paid: e.target.value })
                  }
                  value={giving.date_paid}
                />
              </div>

              <div className="flex justify-between m-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-1 rounded-md hover:bg-green-800 flex items-center"
                  onClick={handleOpen}
                >
                  Create giving
                </button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default AddGiving;
