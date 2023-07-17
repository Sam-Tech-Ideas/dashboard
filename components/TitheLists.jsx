import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { CSVLink } from "react-csv";
import { FaFileDownload } from "react-icons/fa";
import { Button, Tooltip } from "@material-tailwind/react";
import { MenuIcon } from "lucide-react";
import { AiOutlineMore } from "react-icons/ai";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@material-tailwind/react";
import AddGivingCategory from "./AddGivingCategory";

const TitheList = () => {
  const [givings, setGivings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("amount");
  const [sortOrder, setSortOrder] = useState("desc");
  

  useEffect(() => {
    const fetchGivings = async () => {
      setLoading(true);

      try {
        const q = query(
          collection(db, "givings"),
          where("giving_type", "==", "Tithes")
        );
        const querySnapshot = await getDocs(q);
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivings(givingsData);
        setLoading(false);
        console.log(givingsData);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchGivings();
  }, []);

  useEffect(() => {
   const fetchSubcategories = async () => {
     try {
       const q = query(
         collection(db, "subcategory"),
         where("type", "==", "Tithes")
       );
       const querySnapshot = await getDocs(q);
       const subcategoriesData = querySnapshot.docs.map((doc) => doc.data());
       setSubcategories(subcategoriesData);
     } catch (error) {
       console.log(error);
     }
   };


    fetchSubcategories();
  }, []);

  useEffect(() => {
    // Sorting logic
    const sortedGivings = [...givings].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });

    setGivings(sortedGivings);
  }, [sortBy, sortOrder]);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const headers = [
    { label: "Name", key: "name" },
    { label: "Contact", key: "contact" },
    { label: "Amount", key: "amount" },
    { label: "Payment Type", key: "giving_type" },
    { label: "Payment Method", key: "paymentMethod" },
    { label: "Date", key: "date_paid" },
  ];

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const filteredGivings = givings.filter((giving) => {
    const givingDate = giving.date_paid.toDate();
    const selectedDateFrom = dateFrom ? new Date(dateFrom) : null;
    const selectedDateTo = dateTo ? new Date(dateTo) : null;

    return (
      (searchTerm === "" ||
        giving.full_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDateFrom === null || givingDate >= selectedDateFrom) &&
      (selectedDateTo === null || givingDate <= selectedDateTo) &&
      (selectedSubcategory === "" || giving.sub_category === selectedSubcategory)
    );
  });
  const csvData = [
    ["Name", "Contact", "Amount", "Payment Type", "Payment Method", "Date"],
    ...filteredGivings.map((giving) => [
      giving.full_name,
      giving.contact,
      giving.amount,
      giving.giving_type,
      formatDate(giving.date_paid),
    ]),
  ];

 const displaySubcategory = (subcategoryId) => {
   const subcategory = subcategories.find(
     (subcategory) => subcategory.id === subcategoryId
   );

   return subcategory ? subcategory.name : "N/A";
 };

  return (
    <>
      <div className="shadow-sm bg-white">
        <div className="flex md:mt-8 justify-between items-center">
          <div className="flex">
            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Date from
              </label>
              <input
                type="date"
                className="border-2 px-4 rounded-full "
                value={dateFrom}
                onChange={handleDateFromChange}
              />
            </div>
            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Date to
              </label>
              <input
                type="date"
                className="border-2 px-4 rounded-full "
                value={dateTo}
                onChange={handleDateToChange}
              />
            </div>

            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Sort by
              </label>

              <select
                className="border-2 px-4 rounded-full py-2"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row items-center m-4 pt-8">
            <label htmlFor="" placeholder="" className="mx-1">
              Search
            </label>
            <input
              type="text"
              id="category"
              placeholder="Search a giver"
              className="border-2 px-4 rounded-lg"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className=" flex  items-center  pt-8">
            <CSVLink
              filename={"givings_report.csv"}
              data={csvData}
              headers={headers}
            >
              <button className="bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-800 flex items-center">
                Download report
                <FaFileDownload className="ml-2" size={18} />
              </button>
            </CSVLink>
          </div>
        </div>
        <div className=" flex  items-center  m-4">
          <select
            className="border-2 px-4 rounded-full py-2"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
          >
            <option value="">All</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>{" "}
        </div>

        <div className="overflow-x-auto">
          {filteredGivings.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No matching records found.
            </p>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-gray-300">
                <tr className="text-black">
                  <th className="px-4 py-4">No.</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Amount (Ghc)</th>
                  <th className="px-4 py-4">Payment Type</th>
                  <th className="px-4 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredGivings.map((giving) => (
                    <tr
                      key={giving.id}
                      className="bg-gray-200 text-center hover:bg-gray-100/50"
                    >
                      <td className="border px-4 py-2">
                        {filteredGivings.indexOf(giving) + 1}
                      </td>

                      <td className="border px-4 py-2">{giving.full_name}</td>
                      <td className="border px-4 py-2">{giving.amount}</td>
                      <td className="border px-4 py-2">
                        {displaySubcategory(giving.sub_category)}
                      </td>
                      <td className="border px-4 py-2">
                        {formatDate(giving.date_paid)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default TitheList;
