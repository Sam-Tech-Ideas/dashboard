import React from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Cards from '@/components/Cards';
import Progrssings from '@/components/Progrssings';
import Recordings from '@/components/Recordings';
import Progressings from '@/components/Progrssings';
import Report from '@/components/Report';
 
const NewDash = () => {
  return (
    <div className="">
      <Cards />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <Progrssings />
        <Recordings />
      </div>
      <Report />
    </div>
  );
}

export default NewDash




  
  