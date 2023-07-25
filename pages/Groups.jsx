import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Link from "next/link";
import AddGroup from "@/components/groups/AddGroup";
import { toast } from "react-hot-toast";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      const groupsData = snapshot.docs.map((doc) => doc.data());
      setGroups(groupsData);
    });

    // Cleanup function to unsubscribe from the Firestore listener
    return () => unsubscribe();
  }, []);


  const handleDeleteGroup = async (id) => {
    try {
      await deleteDoc(doc(db, "groups", id));
      toast.success("Group deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-around ">
            <div>
              <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
                All Groups
              </h1>
            </div>
            <div>
              {/* <button className="bg-blue-500 px-6 py-2 text-white rounded">
                Create Group
              </button> */}
              <div className="pb-8">
                <AddGroup />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {groups.map((group) => (
              <div key={group.id} className="xl:w-1/2 md:w-1/2 p-4">
                <Link href={`/groups/${group.id}`}>
                  <Card
                    shadow={false}
                    className="relative grid h-[20rem] w-full max-w-[48rem] items-end justify-center overflow-hidden text-center"
                  >
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="absolute inset-0 m-0 h-full w-full rounded-none"
                      style={{
                        backgroundImage: `url(${group.groupImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-14 px-6 md:px-12">
                      <Typography
                        variant="h2"
                        color="white"
                        className="mb-6 font-medium leading-[1.5]"
                      >
                        {group.name}
                      </Typography>
                      <Typography variant="h5" className="mb-4 text-gray-400">
                        {group.members.length} Members
                      </Typography>

                    </CardBody>
                    
                  </Card>
                  </Link>
                  <div>
                    <div className="flex justify-center">
                      <div className="flex items-center">
<p className="text-red-500 px-4 py-2 rounded-lg cursor-pointer" onClick={
  () => handleDeleteGroup(group.id)
}>

  Delete Group
</p>
                        </div>
                        </div>
                  </div>
          
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Groups;
