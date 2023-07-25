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
import { db, storage } from "@/firebase/config";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const GroupDetail = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);


  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { id } = router.query;
       const [groupLeader, setGroupLeader] = useState(null);


       {/**editing groupImage */}
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          console.log(file);




          const storageRef = ref(

            storage,
            `Grimages/${Date.now()}${file.name}`
          );
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
                console.log("File available at", downloadURL);
                setGroup({ ...group, groupImage: downloadURL });
              });
            }
          );
        };


 useEffect(() => {
   if (group && group.groupLeader) {
     const fetchGroupLeader = async () => {
       try {
         const groupLeaderDoc = await getDoc(
           doc(db, "users", group.groupLeader)
         );
         if (groupLeaderDoc.exists()) {
           setGroupLeader(groupLeaderDoc.data());
         }
       } catch (error) {
         console.log("Error fetching group leader:", error);
       }
     };

     fetchGroupLeader();
   }
 }, [group]);




useEffect(() => {
  if (group && group.members) {
    const fetchGroupMembers = async () => {
      try {
        const membersData = [];
        for (const memberId of group.members) {
          const memberDoc = await getDoc(doc(db, "users", memberId));
          if (memberDoc.exists()) {
            membersData.push(memberDoc.data());
          }
        }
        setGroupMembers(membersData);
      } catch (error) {
        console.log("Error fetching group members:", error);
      }
    };

    fetchGroupMembers();
    fetchGroupLeader();
  }
}, [group]);

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
       await setDoc(docRef, groupData); // Fixed the variable name here
       toast.success("Group updated successfully"); // Display toast after successful update
       handleOpen(); // Close the dialog after successful update
     } catch (error) {
       console.log(error);
     }
   };


   const handleRemoveFromGroup = async (memberId) => {

    try {
      const docRef = doc(db, "groups", group.id);
      const groupData = {
        id: group.id,
        name: group.name,
        description: group.description,
        date: group.date,
        meetingDays: group.meetingDays,
        members: group.members.filter((member) => member !== memberId),
        groupLeader: group.groupLeader,
      };
      await setDoc(docRef, groupData); // Fixed the variable name here
      toast.success("Member removed successfully"); // Display toast after successful update
    } catch (error) {
      console.log(error);
    }
  };

  {/**fetch group leader */}
  
    const fetchGroupLeader = async () => {
      try {
         const groupLeaderDoc = await getDoc(doc(db, "users", group.groupLeader));
          if (groupLeaderDoc.exists()) {
            setGroupLeader(groupLeaderDoc.data());
          }
      } catch (error) {
        console.log("Error fetching group leader:", error);
      }
    };


     // ... (existing code)

     // Fetch group leader data
    

 
  return (
    <div>
      <div className="">{/* Other code... */}</div>
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
        <dl class="divide-y divide-gray-100 p-4">
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

          {group && (
            <dl class="divide-y divide-gray-100 p-4">
              {/* Other code... */}
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Group Leader
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {groupLeader ? (
                    <Fragment>
                      {/* <div className="flex items-center">
                        <img
                          src={groupLeader.profilePhoto}
                          alt="Group Leader"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      </div> */}
                      <p>{groupLeader.fullName}</p>

                      <p>Email: {groupLeader.email}</p>
                      {/* Add more properties of groupLeader as needed */}
                    </Fragment>
                  ) : (
                    <p>Loading group leader information...</p>
                  )}
                </dd>
              </div>

              {/* Other code... */}
            </dl>
          )}

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Group Members
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul>
                  {groupMembers.map((member) => (
                    <li
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="">
                        <p>{member.fullName}</p>
                      </div>
                      <div>
                        <p
                          className="text-red-500  cursor-pointer"
                          onClick={() => handleRemoveFromGroup(member.id)}
                        >
                          remove
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </dd>
          </div>
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

<div>
                <label
                htmlFor="groupImage"
                className="block text-sm font-medium text-gray-700"
              >
                Group Image
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={group ? group.groupImage : ""}
                    alt="Group Image"
                    className="w-full h-full"
                  />
                </span>
                <input
                  type="file"
                  name="groupImage"
                  id="groupImage"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <label
                  htmlFor="groupImage"
                  className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
                      clipRule="evenodd"
                    />
                  </svg>  */}
                  <span className="ml-2">Change</span> 
                </label>

                {uploadProgress > 0 && (
                  <div className="ml-5">
                    <span className="text-sm font-medium text-gray-900">
                      Uploading...
                    </span>
                  
                        
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            {uploadProgress}%
                          </span>

                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: `${uploadProgress}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            >
                             <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                {uploadProgress}%
                              </span> 
                            </div>
                          </div>
                          </div>
                )}
              </div>
            </div>
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
