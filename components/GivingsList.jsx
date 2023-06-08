import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { CSVLink } from "react-csv";
import { FaFileDownload } from "react-icons/fa";
import { Tooltip } from "@material-tailwind/react";

const GivingsList = () => {
  const [givings, setGivings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");


  useEffect(() => {
    const fetchGivings = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "givings"));
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivings(givingsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchGivings();
  }, []);

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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
   const handleDateFromChange = (event) => {
     setDateFrom(event.target.value);
   };

   const handleDateToChange = (event) => {
     setDateTo(event.target.value);
   };


  const filteredGivings = givings.filter((giving) => {
    const givingDate = giving.date_paid.toDate();
    const selectedDateFrom = dateFrom ? new Date(dateFrom) : null;
    const selectedDateTo = dateTo ? new Date(dateTo) : null;

    return (
      (category === "" || giving.giving_type === category) &&
      (searchTerm === "" ||
        giving.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        giving.contact.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDateFrom === null || givingDate >= selectedDateFrom) &&
      (selectedDateTo === null || givingDate <= selectedDateTo)
    );
  });
  const csvData = [
    ["Name", "Contact", "Amount", "Payment Type", "Payment Method", "Date"],
    ...filteredGivings.map((giving) => [
      giving.name,
      giving.contact,
      giving.amount,
      giving.giving_type,
      giving.paymentMethod,
      formatDate(giving.date_paid),
    ]),
  ];

  return (
    <>
      <div className="shadow-sm bg-white">
        {/**date sort */}
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded px-6 py-2"
              >
                <option value="" className="text-gray-300 p-4">
                  Choose
                </option>
                <option value="Donation">Donation</option>

                <option value="tithe">Tithe</option>
                <option value="Offering">Offering</option>
                <option value="Partnership">Partnership</option>

                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Date from
              </label>
              <input
                type="date"
                id="category"
                value={dateFrom}
              
                onChange={handleDateFromChange}
                className="border border-gray-300 rounded px-6 py-2"
              />
            </div>
            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Date to
              </label>
              <input
                type="date"
                id="category"
                value={dateTo}
                onChange={handleDateToChange}
                className="border border-gray-300 rounded px-6 py-2"
              />
            </div>
          </div>
          <div className="flex items-center ">
            <div className="flex flex-col items-center m-4">
              <label htmlFor="search" className="py-1 ">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name"
                id="search"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="border border-gray-300 rounded px-6 py-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-4 ">
        <div className="flex justify-end items-center ">
          <p className=" text-black px-4 py-2 bg-gray-400 shadow-sm rounded mx-2">
            Add new
          </p>
          <CSVLink
            filename={"givings_report.csv"}
            data={csvData}
            headers={headers}
          >
            <p className=" text-white px-4 py-2 bg-purple-800  rounded">
              Download report
            </p>
          </CSVLink>
        </div>

        <table className="min-w-full table-auto my-4">
          <thead className="bg-gray-300  w-full">
            <tr className="text-black">
              <th className="px-4 ">Name</th>
              <th className="px-4 py-8">Contact</th>
              <th className="px-4 py-4">Amount (Ghc)</th>
              <th className="px-4 py-4">Payment Type</th>

              <th className="px-4 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <div className="flex justify-center  items-center space-x-2">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : (
              filteredGivings.map((giving) => (
                <tr key={giving.id} className="bg-gray-200 text-center">
                  <td className="border px-4 py-2">{giving.name}</td>
                  <td className="border px-4 py-2">{giving.contact}</td>
                  <td className="border px-4 py-2">{giving.amount}</td>
                  <td className="border px-4 py-2">{giving.giving_type}</td>

                  <td className="border px-4 py-2">
                    {formatDate(giving.date_paid)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GivingsList;
