import React from "react";

import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const EditUser = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const editHandler = async (e) => {
    console.log("Edit");
    try {
      const docRef = await doc(db, "users", user.id);
      const userData = {
        id: user.id,
        fullName: user.name,
        photo: user.photo,
        username: user.username,

        email: user.email,
        phoneNumber: user.contact,

        profileType: user.profileType,
      };
      setDoc(docRef, userData);
      toast.success("User updated successfully");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
    </Fragment>
  );
};

export default EditUser;
