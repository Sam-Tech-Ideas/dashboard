import React from 'react'
import { BsCashCoin } from 'react-icons/bs';
import { FaBell, FaCalendar, FaUser, FaUsers } from 'react-icons/fa';

const Cards = () => {
  return (
    <div>
      {" "}
      <div className="grid lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          {/* <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">$7,846</p>
          <p className="text-gray-600">Givings</p>
        </div> */}
          {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+18%</span>
            </p> */}
          <div className="flex items-center">
            <div className=" flex items-center m-2 rounded-lg">
              <BsCashCoin size={60} className="p-4   text-gray-600" />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">Ghc16</p>
              <p className="text-gray-600">Total Givings</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaCalendar size={60} className="p-4 text-gray-600 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">16</p>
              <p className="text-gray-600">Total Events</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaUsers size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">16</p>
              <p className="text-gray-600">Total Events</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex items-center rounded">
            <div className=" flex items-center m-2 rounded-lg">
              <FaBell size={60} className="p-4 text-gray-400 rounded-md " />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-2xl font-bold">168</p>
              <p className="text-gray-600">Total Notifications</p>
            </div>
          </div>
      
        </div>
      </div>
    </div>
  );
}

export default Cards