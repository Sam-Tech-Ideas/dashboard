import React from "react";
import { data } from "../data/data.js";
import { FaShoppingBag } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { Progress } from "@material-tailwind/react";

const Recordings = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[40vh] h-[50vh] m-auto p-4 border rounded-lg bg-white ">
      <h1 className="font-bold"> Givings Progress</h1>

      <div className="flex w-full flex-col gap-4 ">
        <div>
          <div className="flex justify-between">
            <p>Offering</p>
            <p>
              <span className="text-gray-500">Ghc 50,000</span>
            </p>
          </div>
          <Progress value={70} color="blue" />
        </div>
        <div>
          <div className="flex justify-between">
            <p>Tithe</p>
            <p>
              <span className="text-gray-500">Ghc 100,000</span>
            </p>
          </div>

          <Progress value={40} color="red" />
        </div>
        <div>
          <div className="flex justify-between">
            <p>Donations</p>
            <p>
              <span className="text-gray-500">Ghc 50,000</span>
            </p>
          </div>

          <Progress value={30} color="green" />
        </div>
        <div>
          <div className="flex justify-between">
            <p>Partnership</p>
            <p>
              <span className="text-gray-500">Ghc 10,000</span>
            </p>
          </div>
          <Progress value={10} color="indigo" />
        </div>

        <div>
          <div className="flex justify-between">
            <p>Others</p>
            <p>
              <span className="text-gray-500">Ghc 80,000</span>
            </p>
          </div>
          <Progress value={30} color="yellow" />
        </div>
      </div>

      {/* <ul>
        {data.map((order, id) => (
          <li
            key={id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-yellow-100 rounded-lg p-3">
              <BsCashCoin className="text-yellow-800" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">Ghc{order.total}</p>
              <p className="text-gray-400 text-sm">{order.name.first}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm">
              {order.date}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Recordings;

