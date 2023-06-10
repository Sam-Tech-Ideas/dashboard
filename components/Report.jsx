import { data } from '@/data/data';
import React from 'react'
import { BsCashCoin } from 'react-icons/bs';

const Report = () => {
  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h2>Recent Givings</h2>
      <ul>
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
      </ul>
    </div>
  );
}

export default Report