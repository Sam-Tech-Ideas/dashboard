import { db } from "@/firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaBell, FaCalendar, FaUser, FaUsers } from "react-icons/fa";

const Cards = () => {
  const [totalGivings, setTotalGivings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);

   useEffect(() => {
     const givingsColRef = collection(db, "givings");

     const unsubscribe = onSnapshot(givingsColRef, (querySnapshot) => {
       const givingsData = querySnapshot.docs.map((doc) => doc.data());
       const totalGivings = givingsData.reduce(
         (acc, curr) => acc + curr.amount,
         0
       );
       setTotalGivings(totalGivings);

       console.log("Givings", givingsData);
     });

     return () => {
       // Unsubscribe from the listener when the component unmounts
       unsubscribe();
     };
   }, []);


  useEffect(() => {
    const usersColRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersColRef, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => doc.data());
      const totalUsers = usersData.length;
      setTotalUsers(totalUsers);

      console.log("Users", usersData);
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

   //fetch total users
   useEffect(() => {
     const eventsColRef = collection(db, "events");

      const unsubscribe = onSnapshot(eventsColRef, (querySnapshot) => {
        const eventsData = querySnapshot.docs.map((doc) => doc.data());
        const totalEvents = eventsData.length;
        setTotalEvents(totalEvents);

        console.log("Events", eventsData);
      });

      return () => {
        // Unsubscribe from the listener when the component unmounts
        unsubscribe();
      };
    }, []);


    
   
    //fetch total events
    useEffect(() => {
      const notificationsColRef = collection(db, "notifications");

      const unsubscribe = onSnapshot(notificationsColRef, (querySnapshot) => {
        const notificationsData = querySnapshot.docs.map((doc) => doc.data());
        const totalNotifications = notificationsData.length;
        setTotalNotifications(totalNotifications);

        console.log("Notifications", notificationsData);
      });

      return () => {
        // Unsubscribe from the listener when the component unmounts
        unsubscribe();
      };
    }, []);

       
    
    //fetch total notifications


    


  return (
    <div>
    
      <div className="grid lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          
          <div className="flex items-center">
            <div className=" flex items-center m-2 rounded-lg">
              <BsCashCoin size={60} className="p-4   text-gray-600" />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">
                Ghc{" "}
                {totalGivings.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-gray-600">Total Givings</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaCalendar size={60} className="p-4 text-gray-600 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">
                {totalEvents.toLocaleString()}
              </p>
              <p className="text-gray-600">Total Events</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">
                {totalUsers.toLocaleString()}
              </p>
              <p className="text-gray-600">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaBell size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">
                {totalNotifications.toLocaleString()}
              </p>
              <p className="text-gray-600">Total Notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
