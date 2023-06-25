import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "@/firebase/config";

ChartJS.register(ArcElement, Tooltip, Legend);

const OverviewDoughnut = () => {
  const [givingData, setGivingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const givingCollection = collection(db, "givings");
      const snapshot = await getDocs(givingCollection);

      // Calculate the total amount for each giving type
      const totals = {
        Tithes: 0,
        Offering: 0,
        Partnership: 0,
        Others: 0,
      };

      snapshot.forEach((doc) => {
        const givingType = doc.data().giving_type;
        const amount = doc.data().amount;
        totals[givingType] += amount;
      });

      // Create the dataset for the doughnut chart
      const dataset = Object.values(totals);

      setGivingData(dataset);
    };

    fetchData();
  }, []);

  const data = {
    labels: ["Tithes", "Offering", "Partnership", "Others"],
    datasets: [
      {
        label: "Givings Ghc",
        data: givingData,
        backgroundColor: [
          "rgb(53, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Givings chart",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const config = {
    type: "doughnut",
    data: data,
    options: options,
  };

  return (
    <div className="w-full sm:w-1/3 lg:h-[70vh] h-[50vh] m-auto p-4 rounded-lg bg-white">
      <Doughnut {...config} />
    </div>
  );
};

export default OverviewDoughnut;
