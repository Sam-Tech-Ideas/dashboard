import React, { use, useEffect, useState } from "react";

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

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import Link from "next/link";

const SubGroupDetail = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [open, setOpen] = useState(false);
  const [subopen, setSubOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleSubOpen = () => setSubOpen(!subopen);
  const router = useRouter();
  const { id } = router.query;
  const [groupLeader, setGroupLeader] = useState(null);

  //const [subgroup, setSubgroup] = useState(null);
  const [subgroup, setSubgroup] = useState({
    id: nanoid(),
    name: "",
    description: "",
    groupImage: "",

    groupLeader: "",
    meetingDays: [""],
    members: [""],
  });

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
          console.log("File available at", downloadURL);
          setGroup({ ...group, groupImage: downloadURL });
        });
      }
    );
  };

  {
    /**fetch subgroups */
  }
  const [subgroups, setSubgroups] = useState([]);

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

  // ... (existing code)

  // Fetch subgroups related to this group
useEffect(() => {
  if (group && group.id) {
    const fetchSubgroups = async () => {
      try {
        // Create a query to get subgroups where the "id" field matches the current group's ID
        const q = query(
          collection(db, "subgroups"),
          where("id", "==", group.id)
        );

        // Get the documents that match the query
        const querySnapshot = await getDocs(q);

        // Process the documents and store them in the state variable "subgroups"
        const subgroupsData = querySnapshot.docs.map((doc) => doc.data());
        setSubgroups(subgroupsData);
        console.log(subgroupsData);

        console.log("subgroups", subgroupsData);
      } catch (error) {
        console.log("Error fetching subgroups:", error);
      }
    };

    fetchSubgroups();
  }
}, [group]);
  // ... (existing code)

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
    const unsubscribe = onSnapshot(doc(db, "subgroups", id), (doc) => {
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
      const docRef = doc(db, "subgroups", group.id);
      const groupData = {
        id: group.id,
        name: group.name,
        description: group.description,
        groupImage: group.groupImage,
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
      const docRef = doc(db, "subgroups", group.id);
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

  {
    /**fetch group leader */
  }

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
  const handleSubGroupCreate = async (e) => {
    e.preventDefault();
    console.log("Subgroup");
    try {
      const docRef = doc(db, "subgroups", group.id);

      // Create a new object representing the subgroup data
      const subgroupData = {
        id: group.id,
        name: subgroup.name,
        description: subgroup.description,
        groupImage: group.groupImage,
      };

      await setDoc(docRef, subgroupData);

      toast.success("Subgroup created successfully");
      handleSubOpen();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

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
                      onChange={(e) =>
                        setGroup({ ...group, groupImage: e.target.value })
                      }
                    />
                  </span>
                  <input
                    type="file"
                    name="subgroupImage"
                    id="groupImage"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="groupImage"
                    className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
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
      <Dialog open={subopen} handler={handleSubOpen}>
        <DialogHeader>Create Subgroup</DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleSubGroupCreate}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">Sub-Group Name</span>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={subgroup ? subgroup.name : ""}
                  onChange={(e) =>
                    setSubgroup({ ...subgroup, name: e.target.value })
                  }
                  className="block w-full mt-1 form-input py-3 border-2 rounded "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Group Description</span>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={subgroup ? subgroup.description : ""}
                  onChange={(e) =>
                    setSubgroup({ ...subgroup, description: e.target.value })
                  }
                  required
                  className="block w-full mt-1 form-input"
                />
              </label>

              {/* <div>
                <label
                  htmlFor="groupImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group Image
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={subgroup ? subgroup.groupImage : ""}
                      alt="Group Image"
                      className="w-full h-full"
                    />
                  </span>
                  <input
                    type="file"
                    name="groupImage"
                    id="groupImage"
                    onChange={handleSubImageChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="groupImage"
                    className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
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
              </div> */}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleSubOpen}
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

      <div className="p-8">
        {/* <button
          className="bg-blue-500 px-6 py-2 text-white rounded"
          onClick={handleSubOpen}
        >
          Create Sub Group
        </button> */}

        <div className="mt-4">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Sub Groups List
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                {/* <ul>
                  {subgroups.map((subgroup) => (
                    <Link href={`/subgroups/${subgroup.id}`}>
                      <li key={subgroup.id} className="flex justify-between">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={subgroup.groupImage}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {subgroup.name}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubGroupDetail;
