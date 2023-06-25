import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Progress } from "@material-tailwind/react";

const Recordings = () => {
  const [givingsData, setGivingsData] = useState([]);
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    const fetchGivingsData = async () => {
      try {
        const givingsColRef = collection(db, "givings");
        const querySnapshot = await getDocs(givingsColRef);
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivingsData(givingsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGivingsData();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const totalsMap = new Map();

      givingsData.forEach((giving) => {
        const givingType = giving.giving_type;
        if (givingType !== "Donation") {
          // Exclude "Donation" giving type
          if (totalsMap.has(givingType)) {
            totalsMap.set(
              givingType,
              totalsMap.get(givingType) + giving.amount
            );
          } else {
            totalsMap.set(givingType, giving.amount);
          }
        }
      });

      const totalsArray = Array.from(totalsMap.entries());
      setTotals(totalsArray);
    };

    calculateTotals();
  }, [givingsData]);

  const calculateOverallTotal = () => {
    let overallTotal = 0;

    totals.forEach(([givingType, totalAmount]) => {
      overallTotal += totalAmount;
    });

    return overallTotal;
  };

  const overallTotal = calculateOverallTotal();

  const getColorForGivingType = (givingType) => {
    switch (givingType) {
      case "Offering":
        return "blue";
      case "Tithes":
        return "red";
      case "Partnership":
        return "indigo";
      case "Others":
        return "yellow";
      default:
        return "gray";
    }
  };

  return (
    <div className="w-full col-span-1 relative lg:h-[40vh] h-[50vh] m-auto p-4 border rounded-lg bg-white ">
      <h1 className="font-bold"> Givings Progress</h1>

      <div className="flex w-full flex-col gap-4 ">
        {totals.map(([givingType, totalAmount]) => (
          <div key={givingType}>
            <div className="flex justify-between">
              <p>{givingType}</p>
              <p>
                <span className="text-gray-500">{`Ghc ${totalAmount}`}</span>
              </p>
            </div>
            <Progress
              value={(totalAmount / overallTotal) * 100}
              color={getColorForGivingType(givingType)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recordings;
