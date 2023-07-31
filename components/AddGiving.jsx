import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";
import { FaFileDownload } from "react-icons/fa";

const AddGiving = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [giving, setGiving] = useState({
    id: nanoid(),
    full_name: "",
    date_paid: "",
    amount: "",
    giving_type: "",
    contact: "",
  });
  const [users, setUsers] = useState([]);
  // State to hold the filtered users based on input
  const [filteredUsers, setFilteredUsers] = useState([]);
  // State to hold the value of the selected user
  const [selectedUser, setSelectedUser] = useState("");
  const handleOpen = () => setOpen(!open);

  const handleAddGiving = async (e) => {
    e.preventDefault();

    try {
      const givingData = {
        id: giving.id,
        full_name: giving.full_name,
        date_paid: serverTimestamp(),
        amount: Number(giving.amount),
        giving_type: giving.giving_type,
        contact: giving.contact,
      };

      await addDoc(collection(db, "givings"), givingData);

      toast.success("Giving created successfully");
      handleOpen();
    } catch (error) {
      toast.error(error.message);
    }
  };

   const [subcategories, setSubcategories] = useState([]);

   // Function to fetch subcategories based on selected giving type
   const fetchSubcategories = async (giving_type) => {
     try {
       const subcategoriesSnapshot = await getDocs(
         collection(db, "subcategory")
       );
       const subcategoriesData = subcategoriesSnapshot.docs
         .map((doc) => doc.data())
         .filter(
           (subcategory) => subcategory.type ===giving_type
         );
       setSubcategories(subcategoriesData);
     } catch (error) {
       console.error("Error fetching subcategories:", error);
     }
   };

   useEffect(() => {
     // Fetch subcategories when the selected giving type changes
     fetchSubcategories(giving.giving_type);
   }, [giving.giving_type]);
 const fetchUsers = async () => {
   try {
     const usersSnapshot = await getDocs(collection(db, "users"));
     const usersData = usersSnapshot.docs.map((doc) => doc.data());
     setUsers(usersData);
   } catch (error) {
     console.error("Error fetching users:", error);
   }
 };

 // Function to filter users based on input
 const filterUsers = (input) => {
   if (typeof input !== "undefined") {
     const filtered = users.filter((user) =>
       user.fullName.toLowerCase().includes(input.toLowerCase())
     );
     setFilteredUsers(filtered);
   } else {
     // Handle the case when input is undefined (e.g., clear filtered users)
     setFilteredUsers([]);
   }
 };


 useEffect(() => {
   // Fetch all users when the component mounts
   fetchUsers();
 }, []);

 // Handle user input change and filter users
 const handleInputChange = (e) => {
   const inputValue = e.target.value;
   setSelectedUser(inputValue);
   filterUsers(inputValue);
 };

 // Handle user selection from suggestions
 const handleUserSelect = (user) => {
   setGiving({ ...giving, full_name: user.fullName });
   setSelectedUser(user.fullName);
   setFilteredUsers([]);
 };

  return (
    <div>
      <Fragment>
        <div className="flex justify-between px-4 pt-8">
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-800 flex items-center"
              onClick={handleOpen}
            >
              Record a giving
            </button>
          </div>
        </div>

        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Add Giving</DialogHeader>
          <DialogBody divider>
            <form onSubmit={handleAddGiving}>
              <div className="m-2">
                <label htmlFor="">Giver's name</label>
                <input
                  type="text"
                  placeholder="Giver's name"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  value={selectedUser} // Display the selected user's name
                  onChange={handleInputChange} // Handle user input change
                />
                {filteredUsers.length > 0 && (
                  <ul className="border border-gray-300 bg-white absolute w-full z-10">
                    {filteredUsers.map((user) => (
                      <li
                        key={user.id}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                        onClick={() => handleUserSelect(user)}
                      >
                        {user.fullName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="m-2">
                <label htmlFor="">Giver's contact</label>
                <input
                  type="text"
                  placeholder="Giver's contact"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) =>
                    setGiving({ ...giving, contact: e.target.value })
                  }
                  value={giving.contact}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">
                  Giving type <span className="text-gray-400">(Ghc)</span>
                </label>
                <select
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  value={giving.giving_type}
                  onChange={(e) =>
                    setGiving({ ...giving, giving_type: e.target.value })
                  }
                >
                  <option value="Tithes">Tithe</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Offering">Offering</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="m-2">
                <label htmlFor="">
                  Subcategory <span className="text-gray-400">(Ghc)</span>
                </label>
                <select
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  value={giving.sub_category}
                  onChange={(e) =>
                    setGiving({ ...giving, sub_category: e.target.value })
                  }
                >
                  {/* Display the fetched and filtered subcategories as options */}
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.name}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="m-2">
                <label htmlFor="">
                  Amount <span className="text-gray-400">(Ghc)</span>
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) =>
                    setGiving({ ...giving, amount: e.target.value })
                  }
                  value={giving.amount}
                />
              </div>

              <div className="m-2">
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  required
                  onChange={(e) =>
                    setGiving({ ...giving, date_paid: e.target.value })
                  }
                  value={giving.date_paid}
                />
              </div>

              <div className="flex justify-between m-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-1 rounded-md hover:bg-green-800 flex items-center"
                  onClick={handleOpen}
                >
                  Create giving
                </button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default AddGiving;
