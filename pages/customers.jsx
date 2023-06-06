import React from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { data } from '../data/data.js';
import UserList from '@/components/UsersList.jsx';
import EditUser from '@/components/EditUser.jsx';


const customers = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
     
        
    
  
      <UserList />
   
    </div>
  );
};

export default customers;
