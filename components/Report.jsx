import React, { useState, useEffect } from "react";
import { BsCashCoin } from "react-icons/bs";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const RecentGivings = () => {
  const [givings, setGivings] = useState([]);

  useEffect(() => {
    const fetchGivings = async () => {
      try {
        const givingsColRef = collection(db, "givings");
        const past24HoursTimestamp = getPast24HoursTimestamp();
        const q = query(
          givingsColRef,
          where("date_paid", ">", past24HoursTimestamp)
        );
        const querySnapshot = await getDocs(q);
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivings(givingsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGivings();
  }, []);

  const getPast24HoursTimestamp = () => {
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() - 1);
    return currentTime;
  };
const getTimeAgo = (timestamp) => {
  if (!timestamp) {
    return "Invalid timestamp";
  }

  const currentTime = new Date();
  const timeDifference = Math.floor((currentTime - timestamp) / 1000); // Convert to seconds

  if (timeDifference < 3600) {
    // Less than an hour
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minutes ago`;
  } else {
    // An hour or more
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hours ago`;
  }
};




  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Givings</h1>
      <ul>
        {givings.map((giving, id) => {
          const timestamp = giving.date_paid?.toDate();
          const timeAgo = getTimeAgo(timestamp);

          return (
            <li
              key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
            >
              <div className="bg-yellow-100 rounded-lg p-3">
                <BsCashCoin className="text-yellow-800" />
              </div>
              <div className="pl-4">
                <p className="text-gray-800 font-bold">Ghc {giving.amount}</p>
                <p className="text-gray-400 text-sm">{giving.name}</p>
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                {timeAgo}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentGivings;
