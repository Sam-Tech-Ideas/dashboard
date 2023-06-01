import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";
import {AiOutlineExport} from "react-icons/ai";
import { FaCalendar, FaLongArrowAltRight, FaMicrophone, FaMicrophoneAlt, FaPodcast } from "react-icons/fa";
import { Tooltip, Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
 
const Sidebar = ({ children }) => {
   const router = useRouter();
   const excludeSidebar = router.pathname === "/Login";

    if (excludeSidebar) {
      return <main className="w-full">{children}</main>;
    }
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <Tooltip content="Dashboard" placement="right-end">
              <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                <RxSketchLogo size={20} />
              </div>
            </Tooltip>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/">
            <Tooltip content="Dashboard" placement="right-end">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <RxDashboard size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/customers">
            <Tooltip content="Users" placement="right-end">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <RxPerson size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/orders">
            <Tooltip content="Givings" placement="right-end">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <BsCashCoin size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/events">
            <Tooltip content="Events" placement="right-end">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <FaCalendar size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/podcast">
            <Tooltip content="Podcasts" placement="right-end">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <FaPodcast size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/">
            {/* <Tooltip content="Settings" placement="right-end">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <FiSettings size={20} />
              </div>
            </Tooltip> */}
          </Link>
          <Link href="/Login">
            <Tooltip content="Log out" placement="right-end">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                <AiOutlineExport size={20} color="red" />
              </div>
            </Tooltip>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
