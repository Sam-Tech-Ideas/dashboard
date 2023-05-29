import React from 'react'
import { BsCashCoin } from 'react-icons/bs';
import { FaCalendar, FaUser } from 'react-icons/fa'

const TopCards = () => {
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        {/* <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">$7,846</p>
          <p className="text-gray-600">Givings</p>
        </div> */}
        {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+18%</span>
            </p> */}
        <div className="flex items-center">
          <div className="bg-yellow-100 flex items-center m-2 rounded-lg">
            <BsCashCoin size={60} className="p-4 text-yellow-400  " />
          </div>
          <div className="flex flex-col w-full ">
            <p className="text-2xl font-bold">Ghc16</p>
            <p className="text-gray-600">Givings</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex items-center rounded">
          <div className="bg-blue-100 flex items-center m-2 rounded-lg">
            <FaCalendar size={60} className="p-4 text-blue-400 rounded-md " />
          </div>
          <div className="flex flex-col w-full ">
            <p className="text-2xl font-bold">16</p>
            <p className="text-gray-600">Events</p>
          </div>
        </div>
    
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex items-center rounded">
          <div className="bg-red-100 flex items-center m-2 rounded-lg">
            <FaUser size={60} className="p-4 text-red-400 rounded-md " />
          </div>
          <div className="flex flex-col w-full ">
            <p className="text-2xl font-bold">168</p>
            <p className="text-gray-600">Users</p>
          </div>
        </div>
        {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+17%</span>
            </p> */}
      </div>
    </div>
  );
}

export default TopCards