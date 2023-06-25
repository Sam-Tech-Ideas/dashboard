import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const givingsColRef = collection(db, "givings");
        const querySnapshot = await getDocs(givingsColRef);
        const givingsData = querySnapshot.docs.map((doc) => doc.data());

        const labels = givingsData.map((giving) => giving.day);
        const data = givingsData.map((giving) => giving.amount);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Givings Ghc",
              data: data,
              backgroundColor: [
                "rgb(53, 162, 235)",
                "rgb(255, 99, 132)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
              ],
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    setChartOptions({
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
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
