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
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      datasets: [
        {
          label: "Givings Ghc",
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            "rgb(53, 162, 235)",
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(45, 205, 86)"
          ],
        },
      ],
    });

    setChartOptions(
        
        {
     
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
        <p>
            Total givings
        </p>
        <h1 className="text-4xl">
            <span className="text-blue-500">
                 {/**Cedi sign */}
                Ghc 200,000
                </span> 
        </h1>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Progressings;
