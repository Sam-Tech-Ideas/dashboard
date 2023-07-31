import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

export function AddUser() {
  const [open, setOpen] = useState(false);
  const [user,setUser] = useState("")
  const [email,setEmail] = useState("")
  const [fullName,setFullName] = useState("")

  const password = "cosmic1234"

  const handleOpen = () => setOpen(!open);


  const handleAddUser = async (e)=>{
    e.preventDefault();
    {/**authenticate user info */}

     try {
      // Step 1: Create user account using Firebase Authentication
      const authUser = await createUserWithEmailAndPassword(auth, email, password);

      // Step 2: If the user account creation is successful, add the user info to the Firestore database
      if (authUser) {
        const newUser = {
          id: authUser.user.uid,
          
          fullName: fullName,
          email: email,
          profileType: "user",
        };

        // Add the new user document to the Firestore collection
        await setDoc(doc(db, "users", authUser.user.uid), newUser);

        // Clear the form inputs after successful user creation
        setFullName("");
        setEmail("");

        // Close the dialog
        handleOpen();

        // Show a success toast message
        toast.success("User created successfully!");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("Error creating user. Please try again.");
    }
  };


  

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add user
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Creating a new user</DialogHeader>
        <DialogBody>
          <form onSubmit={handleAddUser}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name{" "}
              </label>{" "}
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email address
              </label>{" "}
              <input
                type="email"
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" type="submit">
                <span>Create</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
