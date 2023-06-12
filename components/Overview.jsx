import React from "react";
import DoughnutChart from "./Doghnout";
import GivingsList from "./GivingsList";
import { FaFileDownload } from "react-icons/fa";
import { Card } from "@material-tailwind/react";
//import TotalAmountLoadingAnimation from './LoadingNUmbers';

const Overview = () => {
  return (
    <div className="">
      {/**chart and amounts */}
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <DoughnutChart />

        <div className="w-full md:w-2/3 p-4 flex flex-col ">
          <div className="flex flex-col md:flex-row justify-around">
            <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 10,000
                </h1>
                <p className="text-black  text-lg ">Total Partnership</p>
              </div>
            </Card>
            <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 40,000
                </h1>
                <p className="text-black  text-lg ">Total Tithes</p>
              </div>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row justify-around">
            <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 50,000
                </h1>
                <p className="text-black  text-lg ">Total Offering</p>
              </div>
            </Card>
            <Card className="m -1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 10,000
                </h1>
                <p className="text-black  text-lg ">Total Partnership</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

    
      <Card className="border-gray-500">
        <GivingsList />
      </Card>
    </div>
  );
};

export default Overview;
