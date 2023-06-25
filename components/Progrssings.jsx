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

const Progressings = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [totalGivings, setTotalGivings] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const givingsColRef = collection(db, "givings");
        const querySnapshot = await getDocs(givingsColRef);
        const givingsData = querySnapshot.docs.map((doc) => doc.data());

        const dayOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const totalsByDay = Array(7).fill(0);
        let totalAmount = 0;

        givingsData.forEach((giving) => {
          const date = giving.date_paid.toDate();
          const dayIndex = date.getDay();
          totalsByDay[dayIndex] += giving.amount;
          totalAmount += giving.amount;
        });

        const labels = dayOfWeek;
        const data = totalsByDay;

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
                "rgb(45, 205, 86)",
                "rgb(0, 0, 255)",
                "rgb(255, 0, 0)",
              ],
            },
          ],
        });

        setTotalGivings(totalAmount);
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
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white md:py-16">
        <p>Total givings</p>
        <h1 className="text-4xl">
          <span className="text-blue-500">
            {/* Cedi sign */}Ghc {totalGivings}
          </span>
        </h1>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Progressings;
