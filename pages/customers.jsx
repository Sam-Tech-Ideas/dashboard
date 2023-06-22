import React, { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link.js";
import { db } from "@/firebase/config.js";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

       



   useEffect(() => {
     const fetchUsers = async () => {
       setLoading(true);
       try {
         const querySnapshot = await getDocs(collection(db, "users"));
         const usersData = querySnapshot.docs.map((doc) => doc.data());
         setUsers(usersData);
         setLoading(false);
         console.log(usersData);
       } catch (error) {
         console.log(error);
         setLoading(false);
       }
     };

     fetchUsers();
   }, []);

   const filteredUsers = users.filter((user) =>
     user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
   );

   
    
 
  return (
    <div className="">
      <div className="m-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl">All users</h2>
        </div>

        <div className="flex justify-end  items-center">
          <span className="px-2">Search</span>

          <input
            type="text"
            placeholder="Search a user"
            className="rounded-md border-gray-500 py-2 px-8 border-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Email
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Role
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-300">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.fullName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.profileType}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <h2 className="text-blue-500">
                      <Link href="/users/[id]" as={`/users/${user.id}`}>
                        View Details
                      </Link>
                    </h2>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Customers;



  {/* <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-300">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.job}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.date}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <h2 className="text-blue-500">
                      <Link href="/customers/[id]" as={`/customers/${index}`}>
                        View
                      </Link>
                    </h2>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="4" className="p-4 ">
                  No users found.
                </td>
              </tr>
            )}
          </tbody> */}
