import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";

const GivingsList = () => {
  const [givings, setGivings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGivings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "givings"));
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivings(givingsData);
        console.log(givingsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGivings();
  }, []);
const formatDate = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleString(); // Adjust the formatting as per your requirements
};
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Amount (Ghc)</th>
            <th className="px-4 py-2">Payment Type</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {givings.map((giving) => (
            <tr key={giving.id} className="text-center">
              <td className="border-2 px-4 py-2">{giving.name}</td>
              <td className="border-2 px-4 py-2">{giving.contact}</td>
              <td className="border-2 px-4 py-2">{giving.amount}</td>
              <td className="border-2 px-4 py-2">{giving.giving_type}</td>
              <td className="border-2 px-4 py-2">{giving.paymentMethod}</td>
              <td className="border-2 px-4 py-2">{formatDate(giving.date_paid)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GivingsList;
