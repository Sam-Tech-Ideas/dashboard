import React, { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import BarChart from "@/components/BarChart";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { Fragment } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Input,
  Card,
} from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import { Group } from "lucide-react";

const GroupDetail = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "groups", id), (doc) => {
      if (doc.exists()) {
        setGroup(doc.data());
      } else {
        setError(true);
      }
    });

    // Cleanup function to unsubscribe from the Firestore listener
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">Error: Unable to fetch user data</p>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="p-8">
        <p className="text-red-500">Error: Group not found</p>
      </div>
    );
  }



 
  const editHandler = async (e) => {
    e.preventDefault();
    console.log("Edit");
    try {
      const docRef = doc(db, "groups", group.id);
      const groupData = {
        id: group.id,
        name: group.name,
        description: group.description,
        date: group.date,
        meetingDays: group.meetingDays,
        members: group.members,
        groupLeader: group.groupLeader,


      };
      await setDoc(docRef, userData);
      toast.success("User updated successfully");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };


 
  return (
    <div>
      <div className="p-8 ">{/* Other code... */}</div>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Group Details
          </h1>
          <button
            onClick={handleOpen}
            className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPencilAlt className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="mt-4">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            {/* Other code... */}
          </div>
        </div>
      </div>
      {/**user data */}
      <div class="mt-6 border-t border-gray-100 p-8">
        {loading && <Loader />}
        {error && (
          <div className="p-8">
            <p className="text-red-500">Error: Unable to fetch user data</p>
          </div>
        )}
      </div>

      {group && (
        <dl class="divide-y divide-gray-100">
          {/**profile photo */}
          <div class="px-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900"></dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <img src={group.groupImage} className="w-40 h-40" />
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Group Name
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {group.name}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Group Description
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {group.description}
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Group Leader
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Group Members
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            
             
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">''</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              ''
            </dd>
          </div>
          {/*
         
          
         
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
               
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {''}
            </dd>
          </div> */}

          {/* 
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              User's role
            </dt>
            <dd class="mt-1 text-sm flex items-center  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.profileType}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Date of birth
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.dateOfBirth &&
                new Date(user.dateOfBirth.seconds * 1000).toLocaleDateString()}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Contact</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.phoneNumber}
            </dd>
          </div> */}
          {/* <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Group</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                No Group available
              </dd>
            </div> */}
        </dl>
      )}

      {/* Render the modal component */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Group</DialogHeader>
        <DialogBody divider>
          <form onSubmit={editHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">Group Name</span>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={group ? group.name : ""}
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                  className="block w-full mt-1 form-input py-3 border-2 rounded "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Group Description</span>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={group ? group.description : ""}
                  onChange={(e) =>
                    setGroup({ ...group, description: e.target.value })
                  }
                  required
                  className="block w-full mt-1 form-input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Meeting Days</span>
                <Input
                  type="text"
                  required
                  name="meetingDays"
                  id="meetingDays"
                  value={group ? group.meetingDays : ""}
                  onChange={(e) =>
                    setGroup({ ...group, meetingDays: e.target.value })
                  }
                  className="block w-full mt-1 form-input"
                />
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleOpen}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 ml-4 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default GroupDetail;
