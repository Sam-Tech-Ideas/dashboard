import React from "react";
import DoughnutChart from "./Doghnout";
import GivingsList from "./GivingsList";
import { FaFileDownload } from "react-icons/fa";
import { Card } from "@material-tailwind/react";
import TitheDoughnut from "./TitheDoughnut";
import OfferingList from "./OfferingList";
//import TitheLists from "./TitheLists";
//import TotalAmountLoadingAnimation from './LoadingNUmbers';

const Offering = () => {
  return (
    <div className="">
      {/**chart and amounts */}
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <TitheDoughnut />

        <div className="w-full md:w-2/3 p-4 flex flex-col ">
          <div className="flex flex-col md:flex-row justify-around">
            <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 18,400
                </h1>
                <p className="text-black  text-lg ">Total Offering</p>
              </div>
            </Card>
            <Card className="m-1">
              {/* <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 4,000
                </h1>
                <p className="text-black  text-lg "></p>
              </div> */}
              <h1 className="text-lg  font-bold text-center">
                Available Sub Categories
              </h1>
              <ul>
                <li className="flex flex-row justify-between">
                  <div className="flex flex-col m-8">
                    <h1 className="text-lg sm:text-5xl font-bold ">Ghc 400</h1>
                    <p className=" text-md ">Kumasi Crusade Offerings</p>
                  </div>
                  <div className="flex flex-col m-8">
                    <h1 className="text-lg sm:text-5xl font-bold ">
                      Ghc 4,000
                    </h1>
                    <p className="  text-md"> Easter Crusade Offering</p>
                  </div>
                </li>

                <li className="flex flex-row justify-between">
                  <div className="flex flex-col m-8">
                    <h1 className="text-lg sm:text-5xl font-bold ">
                      Ghc 14,000
                    </h1>

                    <p className="  text-md"> Daily offerings</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row justify-around">
            {/* <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 50,000
                </h1>
                <p className="text-black  text-lg ">Total Offering</p>
              </div>
            </Card> */}
            {/* <Card className="m -1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc 10,000
                </h1>
                <p className="text-black  text-lg ">Total Partnership</p>
              </div>
            </Card> */}
          </div>
        </div>
      </div>

      <Card className="border-gray-500">
        <OfferingList />
      </Card>
    </div>
  );
};

export default Offering;
