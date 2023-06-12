import React from "react";
    import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = () => {
  const data = {
    labels: ["Tithes", "Offering", "Partnership", "Others"],
    datasets: [
      {
        label: "Givings Ghc",
        data: [12, 19, 3, 5],
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
    <>
      <div className="w-full sm:w-1/3  lg:h-[70vh] h-[50vh] m-auto p-4  rounded-lg bg-white">
        <Doughnut {...config} />


        </div>

    </>
  );
};

export default DoughnutChart;
