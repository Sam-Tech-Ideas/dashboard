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

      <div className="flex md:mt-8 justify-between items-center">
        <div className="flex">
          <div className="flex flex-col items-center m-4">
            <label htmlFor="category" className="py-1 ">
              Date from
            </label>

            <input type="date" className="border-2 px-4 rounded-full " />
          </div>
          <div className="flex flex-col items-center m-4">
            <label htmlFor="category" className="py-1 ">
              Date to
            </label>

            <input type="date" className="border-2 px-4 rounded-full " />
          </div>
        </div>
        <div className="flex flex-row items-center m-4 pt-8">
          <label htmlFor="" placeholder="" className="mx-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search a giver"
            className="border-2 px-4 rounded-lg"
          />
        </div>
        <div className=" flex  items-center  pt-8">
          <button className="bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-800 flex items-center">
            Download report
            <FaFileDownload className="ml-2" size={18} />
          </button>
        </div>
      </div>
      <Card className="border-gray-500">
        <GivingsList />
      </Card>
    </div>
  );
};

export default Overview;
